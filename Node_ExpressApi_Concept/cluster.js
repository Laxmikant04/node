var cluster = require('cluster');  
var express = require('express');  
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {  
    for (var i = 0; i < numCPUs; i++) {
        // Create a worker
        cluster.fork();
    }
} else {
    // Workers share the TCP connection in this server
    var app = express();

    app.get('/',async function (req, res) {
        // Simulate route processing delay
       
        res.send("response");
    });

    // All workers use this port
    app.listen(8080);
}