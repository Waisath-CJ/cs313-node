const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end('<h1 style="color: red; font-size: 50px;">Hello World!</h1>');
});

server.listen(8000 || process.env.PORT);
console.log("Server up and running! Listening on port 8000...");