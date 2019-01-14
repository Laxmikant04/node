var express = require('express');
var app = express();
var options = {
    key: "key",
    cert: "cert",
    ca: "ca"
    };

var https = require('https');
https.createServer(options, app).listen(443);