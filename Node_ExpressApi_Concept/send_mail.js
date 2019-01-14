async function sendMultipleMails(mails) {
    let sendMails = 0;
    console.log("Email Sent....."+mails)
    return mails.length;
 }
 // receive message from master process
 process.on('message', async (message) => {
    
    console.log("message ------"+message.mails);
   const numberOfMailsSend = await sendMultipleMails(message.mails); 
   
   // send response to master process
   console.log("numberOfMailsSend ------"+numberOfMailsSend);
   process.send({ counter: numberOfMailsSend });
 });