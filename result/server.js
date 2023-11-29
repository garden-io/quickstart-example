const express = require('express')
const async = require('async')
const pg = require("pg")
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const port = process.env.PORT || 8080

const pgPool = new pg.Pool({
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: "postgres"
})

let cachedVotes = JSON.stringify({ a: 0, b: 0 });

io.sockets.on('connection', function (socket) {
  console.log("Got new connection")

  socket.emit('message', { text: 'Welcome!' });

  socket.on('subscribe', function (data) {
    socket.join(data.channel);
    socket.emit("scores", cachedVotes)
  });
});

async.retry(
  { times: 1000, interval: 1000 },
  function (callback) {

    pgPool.connect(function (err, client, done) {
      if (err) {
        console.error("Waiting for db", err);
      }
      callback(err, client);
    });
  },
  function (err, client) {
    if (err) {
      return console.err("Giving up");
    }
    console.log("Connected to db");
    getVotes(client);
  }
);

function getVotes(client) {
  client.query('SELECT vote, COUNT(id) AS count FROM votes GROUP BY vote', [], function (err, result) {
    if (err) {
      console.error("Error performing query: " + err);
    } else {
      const votes = JSON.stringify(collectVotesFromResult(result));
      if (votes !== cachedVotes) {
        console.log("Got updated votes", votes);
        cachedVotes = votes
      }
      io.sockets.emit("scores", votes);
    }

    setTimeout(function () { getVotes(client) }, 1000);
  });
}

function collectVotesFromResult(result) {
  const votes = { a: 0, b: 0 };

  result.rows.forEach(function (row) {
    votes[row.vote] = parseInt(row.count);
  });

  return votes;
}

app.use(cookieParser());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

app.get('/health', function (_req, res) {
  res.sendStatus(200);
});

server.listen(port, function () {
  console.log('App running on port ' + port);
});
