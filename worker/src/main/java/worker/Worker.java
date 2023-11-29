package worker;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.exceptions.JedisConnectionException;
import java.sql.*;
import org.json.JSONObject;
import java.util.Properties;

class Worker {
  public static void main(String[] args) {
    try {
      Jedis redis = connectToRedis("redis");
      Connection dbConn = connectToDB("postgres");

      System.err.println("Watching vote queue");

      while (true) {
        getVoteFromQueue(dbConn, redis);
      }
    } catch (SQLException e) {
      e.printStackTrace();
      System.exit(1);
    }
  }

  static void getVoteFromQueue(Connection dbConn, Jedis redis) throws SQLException {
    String voteJSON = redis.blpop(0, "votes").get(1);

    try {
      JSONObject voteData = new JSONObject(voteJSON);
      String voterID = voteData.getString("voter_id");
      String vote = voteData.getString("vote");

      System.err.printf("Processing vote with ID '%s' and pushing to DB\n", voterID);
      updateVote(dbConn, voterID, vote);
    } catch (Exception e) {
      System.err.printf("Error when processing vote from queue");
      return;
    }
  }

  static void updateVote(Connection dbConn, String voterID, String vote) throws SQLException {
    PreparedStatement insert = dbConn.prepareStatement(
      "INSERT INTO votes (id, vote, created_at) VALUES (?, ?, NOW())");
    insert.setString(1, voterID);
    insert.setString(2, vote);

    try {
      insert.executeUpdate();
    } catch (SQLException e) {
      PreparedStatement update = dbConn.prepareStatement(
        "UPDATE votes SET vote = ? WHERE id = ?");
      update.setString(1, vote);
      update.setString(2, voterID);
      update.executeUpdate();
    }
  }

  static Jedis connectToRedis(String host) {
    Jedis conn = new Jedis(host);

    while (true) {
      try {
        conn.keys("*");
        break;
      } catch (JedisConnectionException e) {
        System.err.println("Waiting for redis");
        sleep(1000);
      }
    }

    System.err.println("Connected to redis");
    return conn;
  }

  static Connection connectToDB(String host) throws SQLException {
    Connection conn = null;

    try {
      Class.forName("org.postgresql.Driver");
      String url = "jdbc:postgresql://" + host + "/" + System.getenv("PGDATABASE");
      Properties props = new Properties();
      props.setProperty("user", System.getenv("PGUSER"));
      props.setProperty("password", System.getenv("PGPASSWORD"));
      conn = DriverManager.getConnection(url, props);
    } catch (ClassNotFoundException e) {
      e.printStackTrace();
      System.exit(1);
    }

    System.err.println("Connected to db");
    return conn;
  }

  static void sleep(long duration) {
    try {
      Thread.sleep(duration);
    } catch (InterruptedException e) {
      System.exit(1);
    }
  }
}
