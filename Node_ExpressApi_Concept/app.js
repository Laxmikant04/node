var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var app = express();

var CustomErrorObject= require('./ErrorHandler/ErrorObject');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.use(function(err,req,res,next) {
    if(err instanceof Array){
        var CustomErrorObjectArray=new Array();
        err.forEach(element => {
            CustomErrorObjectArray.push(new CustomErrorObject(name=element.name,message=element.message,field=element.field))
        });
        res.status(200).send({"Error" : CustomErrorObjectArray});
    }else{
        res.status(200).send({"Error" : new CustomErrorObject(name=err.name,message=err.message,field=err.field)});
    }
  });

var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});

