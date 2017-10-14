var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    username: {type: String ,required:true,unique: true}, 
    password:{type: String , required : true} , 
    email: {type: String , required : true , unique: true} 
   
});

userSchema.pre('save', function (next) {
    var user1 = this;
    bcrypt.hash(user1.password, null, null, function (err, hash) {
        if (err) {
            return next(err);
        }
        else {
            user1.password = hash;
            next();
        }
    });
});

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password , this.password);
}
    
    module.exports = mongoose.model('user' , userSchema);