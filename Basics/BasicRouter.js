'use strict';
const http = require('http');
const url = require('url');
const qs = require('querystring');

let routes = {
    'GET':{
        '/': (req, res) =>{
            res.writeHead(200, {'content-type': 'text/html'});
            res.end('<h1>Hello router</h1>');
        },

        '/about': (req,res)=>{
            res.writeHead(200, {'content-type': 'text/html'});
            res.end('<h1>This is an about page</h1>');
        },

        '/api/getinfor': (req,res)=>{
            //fetch data from db and respond as JSON type
            res.writeHead(200, {'content-type': 'application/json'});
            res.end(JSON.stringify(req.queryParams));
        }

    },
    'POST':{
        '/api/login': (req, res)=>{
            let body ='';
            req.on('data', data => {
                body+=data;
                //to find size of data send
                if(body.length > 2097152){
                    res.writeHead(413, {'content-type': 'text/html'});
                    res.end('<h3>Error: The file being send is more that 2MB limit', () => req.connection.destroy());
                }
            });

            req.on('end', () =>{
                let params = qs.parse(body);
                console.log('Username: ', params['username']);
                console.log('Password: ', params['password']);
                //This is where you query a db to see if a user exist
                //If so , send a json response the SPA/ authenticated section in your app.
                res.end();
            });
        }

    },
    'NA': (req, res)=>{
        res.writeHead(404);
        res.end('Content not found');
    }
}

function router(req, res){
    let baseURI = url.parse(req.url, true);
    //to access the route handler user is trying to use
    let resolveRoute = routes[req.method][baseURI.pathname];
    if(resolveRoute != undefined){ //because route is a function so we need to activate it to work
        req.queryParams = baseURI.query;
        resolveRoute(req, res);
    } else{
        routes['NA'](req, res);
    }
}

http.createServer(router).listen(3000, () => {console.log('Server running at port 3000');

});