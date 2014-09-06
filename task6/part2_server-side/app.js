
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , mongoose = require('mongoose')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override')
  , errorHandler = require('errorhandler');


mongoose.connect('mongodb://localhost/task6_part2');
var app = express();

// Configuration

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser());
app.use(cookieParser());
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
  app.set("port", 3000);
}
if ('production' == app.get('env')) {
  app.use(errorHandler());
  app.set("port", 3000);
}

// Routes


app.get('/', routes.index);

app.listen(app.get("port") || 3000, function(){
  console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});

// my part

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("Connected to mongodb://localhost/task6_part2");
});
var URLSchema = mongoose.Schema({
  long_url: String,
  short_url: String
});

var url = mongoose.model('url', URLSchema);
var silence = new url({ long_url: 'Silence',short_url: 'fdff' });
console.log(silence.name);