var mongoose = require('mongoose');
var titlize = require('mongoose-title-case');


var blogSchema = new mongoose.Schema({
    
    date:{type: Date , default: Date.now  } , 
    title:{type: String , required: true } , 
    content: {type: String , required: true },
    category: {type: String , required: true },
    url: {type: String , required: true } 
});

blogSchema.plugin(titlize, {
  paths: [ 'title']
});




module.exports = mongoose.model('blog' , blogSchema);
