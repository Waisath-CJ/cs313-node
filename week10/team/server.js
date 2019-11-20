process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
require('dotenv').config({path: 'variables.env'});
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL; 
const pool = new Pool({connectionString: connectionString});
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.set('port', PORT)
    .use(express.static(__dirname + "/public"))
    .get('/', (req,res)=>{
        res.sendFile('index.html', {root: __dirname + '/public'});
    })
    .get('/getPerson', (req, res) => {
        var sql = "SELECT * FROM People WHERE id = $1::int";
        var params = [req.query.id]
        pool.query(sql, params, (err, result) => {
            if (err) {
                console.log("Error in query: ");
                console.log(err);
            }

            console.log("Back from DB with result: ");
            console.log(result.rows);
            res.json(result.rows);
        });
    })
    .listen(app.get('port'), () => {
        console.log('Listening on port: ' + app.get('port'));
    });