var mongoose = require('mongoose');

var personSchema = new mongoose.Schema({
    name: String,
    age: Number
  });

module.exports =  mongoose.model('Person', personSchema);