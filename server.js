// server.js
/*
 |--------------------------------------
 | Dependencies
 |--------------------------------------
 */

// Modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cors = require('cors');
const http = require('http');



// Config
const config = require('./server/config');

/*
 |--------------------------------------
 | MongoDB
 |--------------------------------------
 */

mongoose.connect(config.MONGO_URI);
const monDb = mongoose.connection;

monDb.on('error', function() {
  console.error('MongoDB Connection Error. Please make sure that', config.MONGO_URI, 'is running.');
});

monDb.once('open', function callback() {
  console.info('Connected to MongoDB:', config.MONGO_URI);
});

/*
 |--------------------------------------
 | App
 |--------------------------------------
 */

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());



// Set port
const port = process.env.PORT || '8083';
app.set('port', port);
console.log(port);

// Set static path to Angular app in dist
// Don't run in dev
if (process.env.NODE_ENV !== 'dev') {
  app.use('/', express.static(path.join(__dirname, './dist')));
}


/*
 |--------------------------------------
 | Routes
 |--------------------------------------
 */

require('./server/api')(app, config);

// Pass routing to Angular app
// Don't run in dev
if (process.env.NODE_ENV !== 'dev') {
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
  });
}

// SocketIO
const server = http.Server(app);
const socketIO = require('socket.io');

const io = socketIO(server);

io.on('connection', (socket)=> {
  console.log("User connected")
  socket.on('new-message', (message) => {
    io.emit(message);
});
})


/*
 |--------------------------------------
 | Server
 |--------------------------------------
 */
if (process.env.NODE_ENV == 'dev'){
server.listen(port, () => console.log(`Server running on localhost:${port}`));
} else { //LOCAL
server.listen(process.env.PORT || 8080);
console.log(`server running on port 8080`)
}
