'use strict';
const http = require ('http');
http
    .createServer((req, res) =>{
        res.writeHead(200, {'content-type': 'text/html'});
        res.end('<h1>Hello node js</h1>');

    }) .listen(3000, ()=> console.log('Server running at port 3000'));