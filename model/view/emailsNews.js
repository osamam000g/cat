var mongoose = require('mongoose');
var titlize = require('mongoose-title-case');

 var emailsNews = new mongoose.Schema({
     email:{type : String , required :true},
     date:{type : Date , default:Date.now}
 });




module.exports = mongoose.model('emailsNews', emailsNews);