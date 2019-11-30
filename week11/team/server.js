require('dotenv').config({path: '/variables.env'});
const apikey = process.env.OMDB_APIKEY;
const express = require('express');

var app = express();

app.set('port', process.env.PORT || 5000)
   .use(express.static(__dirname + '/public'))
   .get('/', (req, res) => {
      res.sendFile('home.html', { root: __dirname + '/public'});
    })
   .get('/apikey', (req, res) => {
      res.end(apikey);
    })
   .listen(app.get('port'), function(){
    console.log('Listening on port: ' + app.get('port'));
    });