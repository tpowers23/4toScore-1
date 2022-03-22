const express = require('express');
const mysql = require('mysql');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const dotenv = require('dotenv');
dotenv.config({path: './.env'});
let players = [];

//Create db connection
const db = mysql.createConnection({
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'ba9e9a435785aa',
    password: '3baf3826',
    database: 'heroku_14a186278551e7b'
});

//Connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql connected..');
})

// EJS
app.set('view engine', 'ejs');

//middleware to read req.body.<params>
app.use(express.json())

//Bodyparser
app.use(express.urlencoded({ extended: false }));

//static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))

app.get('/unranked', (req, res) => {
    res.render('unranked.ejs')
})

app.get('/howtoplay', (req, res) => {
    res.render('howtoplay.ejs')
})

app.get('/eloranking', (req, res) => {
    res.render('eloranking.ejs')
})

app.get('/aboutus', (req, res) => {
    res.render('aboutus.ejs')
})

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

//socket io setup 
io.on('connection', function (socket)  {
	console.log('A user connected:' + socket.id);
    players.push(socket.id);
    let coinFlip = Math.floor(Math.random() * 2);
    if (players.length === 1) {
        io.emit('isPlayerA');
    }
    if (players.length === 2){
        io.emit('whoseTurn', coinFlip);
    }
    socket.on('diskDropped', function(moveCol, isPlayerA){
        io.emit('moveMade', moveCol, isPlayerA);
    });
    socket.on('gameOver', (winner) => {
        io.emit('gameOver', winner);
    });
    socket.on('disconnect', () => {
          console.log('A user disconnected:' + socket.id);
          players = players.filter(player => player !== socket.id);
    });
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

/*
server.listen(5001, () => {
    console.log(`Listening on ${server.address().port}`);
});
*/
