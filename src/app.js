var express = require('express'),
    app = express(),
    tweets = require('./mocks/tweets.json'),
    twit = require('twit'),
    config = require('./config'),
    moment = require('moment');

const pug = require('pug');

//Set the view engine and the template lookup
app.set('view engine', 'pug');
app.set('views', __dirname + '/templates');
//Set the places to look for the static files
app.use('/static', express.static(__dirname + '/public'));

var twitty = new twit({
    consumer_key:         config.consumer_key,
    consumer_secret:      config.consumer_secret,
    access_token:         config.access_token,
    access_token_secret:  config.access_token_secret,
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});
//add the first page
app.get('/', function(req, res){
    //twitty.get('followers/list', { screen_name: 'bevinhernandez' },  function (err, data, response) {
        //console.log(data);
    //});
    var tweets = '';
    var path = req.path;
    var screenName = 'bevinhernandez';
    res.locals.path = path;

        twitty.get('statuses/home_timeline', {count: 5}, function(err, data, response){
            tweets = data;
            res.render('index', {screenName: screenName, tweets: tweets });
    });



});

app.listen(3000, function () {
    console.log('You got an app listening on port 3000!')
});
