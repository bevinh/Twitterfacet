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
var tweets = '';
var followers = '';
var messages = '';
var messagesReceived = '';
var screenName = config.screen_name;

//add the first page
app.get('/', function(req, res){
        twitty.get('statuses/user_timeline', {count: 5}, function(err, data, response){
            tweets = data;
            twitty.get('friends/list', { screen_name: screenName },  function (err, data, response) {
                followers = data;
                twitty.get('direct_messages', { screen_name: screenName },  function (err, data, response) {
                    messagesReceived = data;
                        res.render('index', {screenName: screenName, tweets: tweets, followers: followers, messages: messagesReceived});
                    }).catch( function() {
                        errorMsg = 'you have encountered the fail whale';
                    });
                }).catch( function() {
                    errorMsg = 'you have encountered the fail whale';
                });
            }).catch( function() {
                errorMsg = 'you have encountered the fail whale';
            });
        });
app.listen(3000, function () {
    console.log('You got an app listening on port 3000!')
});
