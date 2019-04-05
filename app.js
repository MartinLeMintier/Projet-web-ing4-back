var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var ArtistRouter = require('./routes/Artist');
var AlbumRouter = require('./routes/Album');
var TrackRouter = require('./routes/Track');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var cors = require('cors');

app.use(cors());
app.use('/', indexRouter);
app.use('/Artist', ArtistRouter);
app.use('/Album', AlbumRouter);
app.use('/Track', TrackRouter);

//Import the mongoose module
var mongoose = require('mongoose');


//Set up default mongoose connection
var mongoDB = 'mongodb://localhost/projet';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function(callback){
	console.log('connected to my base de donnée');
});

module.exports = app;
