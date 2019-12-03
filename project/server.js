process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
require('dotenv').config({path: 'variables.env'});
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL; 
const pool = new Pool({connectionString: connectionString});
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('port', PORT)
    .use(express.static(__dirname + "/public"))
    .get('/', (req,res)=>{
        res.sendFile('index.html', {root: __dirname + '/public'});
    })
    .get('/getHomework', (req, res) => {
        var sql = "SELECT * FROM Homework";
        pool.query(sql, (err, result) => {
            if (err) {
                console.log("Error in query: ");
                console.log(err);
            }

            console.log("Back from DB with result: ");
            console.log(result.rows);
            res.json(result.rows); 
        });
    })
    .post('/login', (req, res) => {
        var username = req.body.username;
        var password = req.body.pwd;
        console.log("Logging in user: " + username + " with password: " + password);
        res.end("Logged in!");
    })
    .listen(app.get('port'), () => {
        console.log('Listening on port: ' + app.get('port'));
    });