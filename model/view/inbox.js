var mongoose = require('mongoose');
var titlize = require('mongoose-title-case');

 var customerCreateEmail = new mongoose.Schema({
     name:{type : String , required :true},
     email:{type : String , required :true},
     subject:{type : String , required :true},
     open:{type : String , required :true},
     date:{type : Date , default:Date.now}
    
     
 });



customerCreateEmail.plugin(titlize, {
  paths: [ 'name']
});

module.exports = mongoose.model('inbox', customerCreateEmail);