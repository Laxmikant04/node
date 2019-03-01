
var express = require("express");
var bodyParser = require("body-parser");
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { fork } = require('child_process');

app.get('/endpoint', (request, response) => {

   console.log("request received.....") ;
   // fork another process
   const process0 = fork('./send_mail.js');
   var mails = request.body.emails;
   mails =['process0']
   // send list of e-mails to forked process
   process0.send({ mails });
   // listen for messages from forked process
   process0.on('message', (message) => {
    console.log(`Number of mails sent ${message.counter}`);
   });



   const process1 = fork('./send_mail.js');
   var mails = request.body.emails;
   mails =['process1','process1']
   // send list of e-mails to forked process
   process1.send({ mails });
   // listen for messages from forked process
   process1.on('message', (message) => {
    console.log(`Number of mails sent ${message.counter}`);
   });


    // fork another process
    const process2 = fork('./send_mail.js');
    var mails = request.body.emails;
    mails =['process2','process2','process2']
    // send list of e-mails to forked process
    process2.send({ mails });
    // listen for messages from forked process
    process2.on('message', (message) => {
     console.log(`Number of mails sent ${message.counter}`);
    });
 


   console.log("request Completed.....") ;
   return response.json({ status: true, sent: true });
});

var server = app.listen(3001, function () {
    console.log("app running on port.", server.address().port);
});