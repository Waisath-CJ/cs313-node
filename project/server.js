process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
require('dotenv').config({path: 'variables.env'});
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL; 
const pool = new Pool({connectionString: connectionString});
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(require('morgan')('dev'));
var session = require('express-session');
var FileStore = require('session-file-store')(session);
app.use(session({
  name: 'server-session-cookie-id',
  secret: 'my express secret',
  saveUninitialized: true,
  resave: true,
  store: new FileStore()
}));

app.set('port', PORT)
    .use(express.static(__dirname + "/public"))
    .get('/', (req,res)=>{
        res.sendFile('index.html', {root: __dirname + '/public'});
    })
    .get('/getHomework', handleGetHomework)
    .post('/login', handleLogin)
    .post('/logout', handleLogout)
    .post('/addHomework', handleAddHomework)
    .post('/deleteHomework', handleDeleteHomework)
    .post('/addAccount', handleAddAccount)
    .listen(app.get('port'), () => {
        console.log('Listening on port: ' + app.get('port'));
    });


/* Route Handler Functions */
function handleGetHomework(req, res) {
    if (req.session.userId) {
        var sql = "SELECT * FROM Homework WHERE userId=$1::int";
        var params = [req.session.userId];
        pool.query(sql, params, (err, result) => {
            if (err) {
                console.log("Error in query: ");
                console.log(err);
            }

            console.log("Back from DB with result: ");
            console.log(result.rows);
            res.json(result.rows); 
        });
    } else {
        res.end("No user is currently logged in... Please log in to access homework");
    }
}

function handleLogin(req, res) {
    var {username, pwd} = req.body;
    console.log("Username: " + username + "\nPassword: " + pwd);

    var sql = "SELECT * FROM Users WHERE username = $1::varchar";
    var params = [username];
    pool.query(sql, params, (err, result) => {
        if (err) {
            console.log("Error in query: ");
            console.log(err);
        }
        console.log("Back from DB with result: ");
        console.log(result.rows);
        var id = result.rows[0].id;
        
        if (result.rows[0]) {
            bcrypt.compare(pwd, result.rows[0].password, (err, result)=>{
                if (err) {
                    console.log("An error occured... \n" + err);
                }
                console.log("Comparing passwords...");
                if (result == true) {
                    req.session.userId = id;
                    console.log("Session user id: " + id);
                    res.end('true');
                } else {
                    res.end('false');
                }
            });
        } else {
            console.log("No result... login failed");
            res.end('false');
        }
    });
}

function handleLogout(req, res) {
    if (req.session.userId != null) {
        req.session.destroy();
        res.end("true");
    } else {
        res.end("false");
    }
}

function handleAddHomework(req, res) {
    var {hwName, hwType, dueDate} = req.body;
    console.log("Homework Name: "+ hwName + "\nHomework Type: " + hwType + "\nDue Date: " + dueDate);
    console.log("Session user id: " + req.session.userId);
    var sql = "INSERT INTO Homework (userId, hwName, hwType, dueDate) VALUES ($1::int, $2::varchar, $3::varchar, $4::date)";
    var params = [req.session.userId, hwName, hwType, dueDate];
    pool.query(sql, params, (err, result)=>{
        if (err) {
            console.log("Error in insert: ");
            console.log(err);
        }
        var sql2 = "SELECT * FROM Homework WHERE userid=$1::int";
        var params2 = [req.session.userId];
        pool.query(sql2, params2, (err, result)=>{
            if (err) {
                console.log("Error in query: ");
                console.log(err);
            }
            console.log("Back from DB with result:\n" + result.rows);

            res.json(result.rows);
        });
    });
}

function handleDeleteHomework(req, res) {
    var {hwName} = req.body;
    console.log("Requested to delete the following assignment: " + hwName);

    var sql = "DELETE FROM Homework WHERE userid=$1::int AND hwname=$2::varchar";
    var params = [req.session.userId, hwName];
    pool.query(sql, params, (err, result)=>{
        if (err) {
            console.log("Error with delete:\n" + err);
            res.end('false');
        }

        var sql2 = "SELECT * FROM Homework WHERE userid=$1::int";
        var params2 = [req.session.userId];
        pool.query(sql2, params2, (err, result)=>{
            if (err) {
                console.log("Error in query: ");
                console.log(err);
            }
            console.log("Back from DB with result:\n" + result.rows);
            res.json(result.rows);
        });
    });
}

function handleAddAccount(req, res) {
    var {firstName, lastName, email, username, password} = req.body;
    
    bcrypt.hash(password, saltRounds, (err, hash)=>{
        var sql = "INSERT INTO Users (firstName, lastName, email, username, password) VALUES ($1::varchar, $2::varchar, $3::varchar, $4::varchar, $5::varchar)";
        var params = [firstName, lastName, email, username, hash];
        pool.query(sql, params, (err, result)=>{
            if (err) {
                console.log("Error in insert: " + err);
                res.end('false');
            }

            res.end('true');
        });
    });
}