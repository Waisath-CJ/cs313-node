'use strict'
const http = require('http')
const fs = require('fs')

let handleRequest = (req, res) => {
    if (req.url == '/home' || req.url == '/') {
        res.writeHead(200, {'Content-Type':'text/html'})
        fs.createReadStream('week08/index.html').pipe(res)
    } else if (req.url == '/getData') {
        res.writeHead(200, {'Content-Type':'text/html'})
        fs.createReadStream('week08/getData.html').pipe(res)
    } else {
        res.writeHead(404, {'Content-Type':'text/plain'})
        res.write('Page Not Found')
        res.end()
    }
}

http.createServer(handleRequest).listen(process.env.PORT || 8080)