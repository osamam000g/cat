var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var titlize = require('mongoose-title-case');

var validate = require('mongoose-validator');

var EmailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Please Enter Valid Email Address'
  }),
validate({
        validator: 'isLength',
        arguments: [3, 20],
        message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];
var userValidator = [
         validate({
          validator: 'isAlphanumeric',
          message: 'username should be numbers and characters'

        }),
        validate({
                validator: 'isLength',
                arguments: [3, 22],
                message: 'User Name should be between {ARGS[0]} and {ARGS[1]} characters'
         })
];
var passValidator = [
         validate({
          validator: 'matches',
         argements:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
          message: 'passowrd should be at least eight characters, one number and one special character'

        }),
        validate({
                validator: 'isLength',
                arguments: [3, 25],
                message: 'password should be between {ARGS[0]} and {ARGS[1]} characters'
         })
];
var phoneValidator = [
         validate({
          validator: 'matches',
         argements:/^\d$/,
          message: 'Please enter a Valid Phone Number'

        }),
        validate({
                validator: 'isLength',
                arguments: [8, 25],
                message: 'password should be between {ARGS[0]} and {ARGS[1]} characters'
         })
];

var user =  new mongoose.Schema({
            point: {type: String  },

        email: {type: String ,required:true,unique: true , validate:EmailValidator}, 
        username: {type: String ,required:true,unique: true , validate:userValidator}, 
        password:{type: String , required : true , validate : passValidator} , 
        phone: {type: String , required : true , unique: true , validate:phoneValidator}
    
});

user.plugin(titlize, {
  paths: [ 'username']
});

user.pre('save', function(next){
    var that = this ;
    bcrypt.hash(that.password , null , null , function(err , hash ){
        if(err){
            return next(err);
        }else{
            that.password = hash ; 
            next();
        }
    });
});

user.methods.comparePassword = function(password){
    return bcrypt.compareSync(password , this.password);
}

module.exports = mongoose.model('userView' , user);