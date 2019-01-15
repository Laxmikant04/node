var ValidationError = require('./ValidationError.js');

class FieldMissMatch extends ValidationError
{
    constructor(field) {
        super("Field miss match.");
        this.field=field;
      }
}

module.exports=FieldMissMatch;