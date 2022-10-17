var express = require('express'),
  async = require('async'),
  path = require("path")
  pg = require("pg"),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  app = express(),
  server = require('http').Server(app),
  io = require('socket.io')(server);

var port = process.env.PORT || 4000;

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
    const database = process.env.PGDATABASE
    const username = process.env.PGUSER
    const password = process.env.PGPASSWORD

    const url = `postgres://${username}:${password}@postgres/${database}`

    pg.connect(url, function (err, client, done) {
      if (err) {
        console.error("Waiting for db");
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
  var votes = { a: 0, b: 0 };

  result.rows.forEach(function (row) {
    votes[row.vote] = parseInt(row.count);
  });

  return votes;
}

app.use(cookieParser());
app.use(bodyParser());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

app.use(express.static('views'));
// app.use(express.static(__dirname + '/result/views'));

// app.use('/result', express.static(__dirname + '/views'));

// app.get('/result', function (req, res) {
app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/views/index.html'));
});

server.listen(port, function () {
  var port = server.address().port;
  console.log('App running on port ' + port);
});
