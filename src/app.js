var express = require('express');
var app = express();
var tweets = require('./mocks/tweets.json');
const pug = require('pug');

//Set the view engine and the template lookup
app.set('view engine', 'pug');
app.set('views', __dirname + '/templates');
//Set the places to look for the static files
app.use('/static', express.static(__dirname + '/public'));

//add the first page
app.get('/', function(req, res){
    var path = req.path;
    var screenName = tweets[0].user.screen_name;
    console.log(tweets[0].user.screen_name);
    res.locals.path = path;
    res.render('index', {screenName: screenName });

});

app.listen(3000, function () {
    console.log('You got an app listening on port 3000!')
})