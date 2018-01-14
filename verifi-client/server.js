var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')


const app = express();

var cors = require('cors')

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/*', function (req, res) {
 res.sendFile(path.join(__dirname,'./dist/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
var err = new Error('Not Found');
err.status = 404;
next(err);
});
if (app.get('env') === 'development')
{
app.listen(8080, function () {
console.log('Example app listening on port 8080!');
});
}
else{
app.listen(3000, function () {
console.log('Example app listening on port 3000!');
});
}
module.exports = app;
