var express = require('express');
var app = express();
const pug = require('pug');

//Set the view engine and the template lookup
app.set('view engine', 'pug');
app.set('views', __dirname + '/src/templates');
//Set the places to look for the static files
app.use('/static', express.static(__dirname + '/src/public'));

//add the first page
app.get('/', function(req, res){
    var path = req.path;
    res.locals.path = path;
    res.render('index');

});

app.listen(3000, function () {
    console.log('You got an app listening on port 3000!')
})