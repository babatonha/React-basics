'use strict';
const http = require('http');
const url = require('url');
const fs = require('fs'); //checks if file is available or not
const path = require('path');
let mimes = {
    '.htm': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.gif': 'image/gif',
    'jpg': 'image/jpeg',
    '.png': 'image/png'
}

function webserver(req, res) {
    //if the route requested is '/' then load 'index.ht,l' or else
    //load the requested file(s)

    let baseURI =url.parse(req.url);
    let filepath =__dirname +  (baseURI.pathname === '/' ? '/index.htm' : baseURI.pathname);
    
    //check if the requested file is accessible or not
    fs.access(filepath, fs.F_OK, error =>{
        if(!error){
            //Read and serve the file over response
            fs.readFile(filepath, (error, content) => {
                if(!error){
                    console.log('Serving: ', filepath);
                    //Resolve content type
                    let contentType = mimes[path.extname(filepath)]; //mimes['.css']==='text/css'
                    //Serve the file from the buffer
                    res.writeHead(200, {'Content-type': contentType});
                    res.end(content, 'utf-8');           
                }else{
                    //Serve a 500
                    res.writeHead(500);
                    res.end('The server could not read the file requested.');

                }
            });
        } else{
            //serve a 404
            res.writeHead(404);
            res.end('Content not found');
        }

    });

}

http.createServer(webserver).listen(3000, () => {
    console.log('Webserver running at port 3000');
});