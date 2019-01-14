class MyError extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
    }
  }

class ValidationError extends MyError {
    constructor(message,field) {
      super(message); 
      this.field=field;
    }
  }

  module.exports = ValidationError