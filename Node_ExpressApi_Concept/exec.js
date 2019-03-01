const {exec} = require ('child_process');
let command = 'dir',
options = {encoding:'utf8'},

dir = exec(command,options);
//dir = exec(command);

dir.stdout.on('data', (data) => {
 console.log(data);
})
dir.stderr.on('data', (data) => {
 console.log('Error: '+data);
})
dir.on('close', (code) => {
 console.log('Process exit code: '+code);
})