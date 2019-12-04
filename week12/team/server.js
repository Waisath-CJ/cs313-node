require('dotenv').config({path: 'variables.env'});
const express = require("express");
const app = express();
const {Pool} = require('pg');
const connectionString = process.env.DATABASE_URL; 
const pool = new Pool({connectionString: connectionString});
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
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

app.set("port", process.env.PORT || 5000)
    .use(express.static(__dirname + "/public"))
    .use(logRequest)
    .get("/", (req, res)=>{
        res.sendFile("index.html", {root: __dirname + "/public"});
    })
    .post("/login", handleLogin)
    .post("/logout", handleLogout)
    .get("/getServerTime", verifyLogin, handleServerTime)
    .listen(app.get('port'), () => {
        console.log('Listening on port: ' + app.get('port'));
    });

/* Route Functions */
function handleLogin(req, res) {
    var {username, password} = req.body;
    console.log("Username: " + username + "\nPassword: " + password);
    var success = false;

    var sql = "SELECT * FROM Test WHERE username = $1::varchar";
    var params = [username];
    pool.query(sql, params, (err, result) => {
        if (err) {
            console.log("Error in query: ");
            console.log(err);
        }

        console.log("Back from DB with result: ");
        console.log(result.rows);

        bcrypt.compare(password, result.rows[0].password, (err, result)=>{
            if (err) {
                console.log("An error occured... \n" + err);
            }

            if (result == true) {
                success = true;
            }
            req.session.username = username;
            var json = {success: success};
            res.json(json);
        });
    });
}

function handleLogout(req, res) {
    var success = false;
        
    if (req.session.username != null) {
        req.session.destroy();
        success = true;
    }

    res.json({success: success});
}

function handleServerTime(req, res) {
    var success = true;
    var serverTime = new Date();

    res.json({success: success, time: serverTime});
}

/* Middleware Functions */
function logRequest(req, res, next) {
    console.log("Received a request for: " + req.url);
    next();
}

function verifyLogin(req, res, next) {
    if (req.session.username) {
        next();
    } else {
        var result = {success: false, message: "Access Denied"};
        res.status(401).json(result);
    }
}