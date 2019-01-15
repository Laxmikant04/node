var MyError = require('./MyError.js');

class ValidationError extends MyError
{
    constructor(message) {
        super(message);
      }
}

module.exports=ValidationError;