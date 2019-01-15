var ValidationError = require('./ValidationError.js');

class RequiredFieldMissing extends ValidationError
{
    constructor(field) {
        super("Required field missing.");
        this.field=field;
      }
}

module.exports=RequiredFieldMissing;