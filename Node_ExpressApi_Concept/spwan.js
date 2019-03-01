const {spawn} = require('child_process')
var {platform} = require('os')
var osType = platform();

let command = 'ls',
       args = [],
    options = {};

if (osType == 'win32') {
 command = 'dir';
 options.shell = true;
}

dir = spawn(command,args,options);

dir.stdout.on('data', (data) => {
 console.log(data.toString());
})
dir.stderr.on('data', (data) => {
 console.log('Error: '+data);
})
dir.on('close', (code) => {
 console.log('Process exit code: '+code);
})


//https://www.brainbell.com/javascript/child-process.html