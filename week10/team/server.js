process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
require('dotenv').config({path: 'variables.env'});
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL; 
const pool = new Pool({connectionString: connectionString});
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.set('port', PORT)
    .get('/', (req,res)=>{
        console.log('Received a request for the \'/\' directory / endpoint');
        res.write('This is the root directory');
        res.end();
    })
    .get('/getPerson', (req, res)=> {
        pool.query("SELECT * FROM People", function(err, result) {
            // If an error occurred...
            if (err) {
                console.log("Error in query: ")
                console.log(err);
            }
        
            // Log this to the console for debugging purposes.
            console.log("Back from DB with result:");
            console.log(result.rows);

            res.json(result.rows);
        });
    })
    .listen(app.get('port'), () => {
        console.log('Listening on port: ' + app.get('port'));
    });
