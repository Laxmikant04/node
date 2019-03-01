process.on('exit',function(){
    console.log("on exit of process");
})

process.on('beforeExit', function(err) {
    console.log('beforeExit');
  });

process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
  });
  
  setTimeout(function() {
    console.log('This will still run.');
  }, 500);
  
  // Intentionally cause an exception, but don't catch it.
  nonexistentFunc();
  console.log('This will not run.');
  //console.log('Current directory: ' + process.cwd());
  //console.log("process Evn details-"+JSON.stringify(process.env))
