var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var multer  = require('multer');


//var index = require('./routes/index');
var admin = require('./routes/admin');
var view = require('./routes/view');

var app = express();
//var social = require('./model/view/passport')(app , passport);

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



mongoose.connect('mongodb://localhost:27017/catalog',function(err){
    if(err){
        console.log('connection failed '+err);
    }else{
        console.log('connection success' );
    }
});


//
//
//app.get('/os-admin', function(req,res){
//    res.sendFile(path.join(__dirname + '/public/admin/index.html'));
//});

app.get('*', function(req,res){
    res.sendFile(path.join(__dirname + '/public/view/index.html'));
});



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/upload/')
    },
    filename: function (req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg|jpeg|gif)$/)){
            var err = new Error();
            err.code = "fileType";
            return cb(err);
        }else{
            cb(null ,  '_' + Date.now() + file.originalname );
        }

    }
});
var upload = multer({ storage: storage ,limits:{fileSize: 1024 * 1024} } ).single('file');



app.post('/multer',function(req , res ){
    upload(req, res , function(err){
      if(err){
          return  res.json({success:false , message:"this is not image or the image is too large"}) ; 
      }else{
          res.json({success:true , message:'file uploaded successfully' , req:req.file});
      }
    })
});
    


//---------------------------------------------------




//app.use('/', index);
app.use('/admin', admin);
app.use('/view', view);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
