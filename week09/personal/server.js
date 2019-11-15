const express = require('express');
var port = process.env.PORT || 5000;
var calcRateEngine = require('./calcRateEngine.js');
var app = express();

app.set('port', port)
   .use(express.static(__dirname + "/public"))
   .set('views', __dirname + '/views')
   .set('view engine', 'ejs')
   .get('/', (req, res) => {
       res.sendFile('home.html', {root: __dirname + '/public'});
   })
   .get('/getRate', calcRateEngine.getRate)
   .listen(app.get('port'), () => {
       console.log('Listening on port: ' + app.get('port'));
   })
