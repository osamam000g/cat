var express = require('express');
var jwt = require('jsonwebtoken');

var createBlog = require('./../model/view/mobile');
var createUser = require('./../model/view/user');
var createInbox = require('./../model/view/inbox');
var createEmailsNews = require('./../model/view/emailsNews');

var secret = 'mohamedOsamaFatouhAbdElaty5lifaAhmedelSh7at';
var router = express.Router();







//BLOGS REQUESTS
//=======================================================================
//=======================================       
//             add Blog 
//=======================================

router.post('/addBlog', function(req, res, next) {
    if( 
        req.body.title == null || req.body.title == "" ||
        req.body.content == null || req.body.content == "" ||
        req.body.category == null || req.body.category == "" ||
        req.body.url == null || req.body.url == "" 
      ){
        
        
        res.json({success:false , message:"Empty Filed "})
        
    }else{
        var blog = new createBlog();
        
            blog.title =   req.body.title;
            blog.content =   req.body.content ;
            blog.category =   req.body.category ;
            blog.url =   req.body.url ;
        
        blog.save(function(err , data){
            if(err){
                res.json({success:false , message:'Empty Filed Required'});
            }else{
                
                res.json({success:true , message:'Blog Created Successfully'});
            }
        });
   
        
    }
   
    
 
});

//=======================================       
//             GET ALL blogs
//=======================================

router.post('/getBlogs', function(req, res, next) {
   createBlog.find({}).exec(function(err , blogs){
       if(err){
           res.json({success:false , message:err});
           
       }else{
           res.send(blogs);
       }
   });
});

//=======================================       
//             update blog
//=======================================

router.post('/updateBlog', function(req, res, next) {
    if(
        req.body.id == null || req.body.id == "" ||
        req.body.title == null || req.body.title == "" ||
        req.body.content == null || req.body.content == "" ||
        req.body.category == null || req.body.category == "" ||
        req.body.url == null || req.body.url == "" 
      ){
        
        res.json({success:false , message : 'empty filed is required'})
    }else{
        
    createBlog.findById(req.body.id).exec(function(err , blog){
       if(err){
        res.json({success:false , message : 'wrong Blog id '})
           
       }else{
       
            blog.title =   req.body.title;
            blog.content =   req.body.content ;
            blog.category =   req.body.category ;
            blog.url =   req.body.url ;
            blog.date =   Date.now() ;
           
           blog.save(function(err , data){
               if(err){
                   res.json({success:false , message : err})

               }else{
                    res.json({success:true , message : 'mobile updated successfully' , data:data})
                     
               }
           });
           
       }
   });
        
        
    }
 
   
    
 
});

//==========================================================    
//             Delet blog 
//==========================================================

router.post('/deleteBlog', function(req, res, next) {
    if(req.body.id == '' || req.body.id == null ){
        
        res.json({success:false , message : 'empty filed is required'})
    }else{
        
    createBlog.findByIdAndRemove(req.body.id).exec(function(err , blog){
       if(err){
        res.json({success:false , message : 'wrong blog id '})
           
       }else{
           
           res.json({success:true , message : 'blog deleted successfully' , data:blog});
           
       }
   });
        
        
    }
 
   
    
 
});
//=======================================       
//             GET Blog by ID
//=======================================

router.post('/getBlogById', function(req, res, next) {
   createBlog.find({_id:req.body.id}).exec(function(err , blog){
       if(err){
           res.json({success:false , message:'blog not found'});
           
       }else{
           res.json({success:true , message:blog});
       }
   });
   
    
 
});





//INBOX REQUESTS
//=======================================================================

//=======================================       
//             Make Inbox Email 
//=======================================

router.post('/inbox', function(req, res, next) {
    if( 
        req.body.name == null || req.body.name == "" ||
        req.body.email == null || req.body.email == "" ||
        req.body.subject == null || req.body.subject == "" ||
        req.body.open == null || req.body.open == "" 
      ){
        
        
        res.json({success:false , message:"Empty Filed "})
        
    }else{
        var inbox = new createInbox();
        
            inbox.name =   req.body.name;
            inbox.email =   req.body.email ;
            inbox.subject =   req.body.subject ;
            inbox.open =   req.body.open ;
        
        inbox.save(function(err , data){
            if(err){
                res.json({success:false , message:'Empty Filed Required'});
            }else{
                
                res.json({success:true , message:'email Created Successfully'});
            }
        });
   
        
    }
   
    
 
});
//=======================================       
//             open  Email 
//=======================================

router.post('/openEmail', function(req, res, next) {
    if( 
        req.body.id == null || req.body.id == "" ||
        req.body.open == null || req.body.open == "" 
      ){
        
        
        res.json({success:false , message:"Empty Filed "})
        
    }else{
          createInbox.findById(req.body.id).exec(function(err , email){
       if(err){
        res.json({success:false , message : 'wrong email id '})
           
       }else{
       
            email.open =  req.body.open;
           
           email.save(function(err , data){
               if(err){
                   res.json({success:false , message : err})

               }else{
                    res.json({success:true , message : 'mobile updated successfully' , data:data})
                     
               }
           });
           
       }
   });
   
        
    }
   
    
 
});
//=======================================       
//             GET Email by ID
//=======================================

router.post('/getEmailById', function(req, res, next) {
   createInbox.find({_id:req.body.id}).exec(function(err , email){
       if(err){
           res.json({success:false , message:'email not found'});
           
       }else{
           res.json({success:true , message:email});
       }
   });
   
    
 
});

//=======================================       
//             GET All Emails 
//=======================================

router.post('/getAllEmails', function(req, res, next) {
   createInbox.find({}).exec(function(err , email){
       if(err){
           res.json({success:false , message:'email not found'});
           
       }else{
           res.json({success:true , message:email});
       }
   });
   
    
 
});


//EmailsNews 
//=======================================================================
//=======================================       
//             Save Email Adress for news 
//=======================================

router.post('/emailsNews', function(req, res, next) {
    if( 
        req.body.email == null || req.body.email == "" 
       
      ){
        
        
        res.json({success:false , message:"Empty Filed "})
        
    }else{
        var emailNews = new createEmailsNews();
        
            emailNews.email =   req.body.email ;
          
        emailNews.save(function(err , data){
            if(err){
                res.json({success:false , message:'Empty Filed Required'});
            }else{
                
                res.json({success:true , message:'email for News Created Successfully'});
            }
        });
   
        
    }
   
    
 
});



//=======================================       
//             REGISTER
//=======================================

//router.post('/signin', function(req, res, next) {
// 
//    if(req.body.username == null || req.body.username == "" || req.body.email == null || req.body.email == "" || req.body.password == null || req.body.password == "" || req.body.rePassword == null || req.body.rePassword == "" || req.body.phone == null || req.body.phone == "" ){
//        
//         res.json({success:false , message:"username or email or password don't exist1"});
//    }else  {
//        if(req.body.password != req.body.rePassword ){
//             res.json({success:false , message:"password dosen't match"});
//        }else{
//            
//            var CreateUser = new createUser();
//    
//            CreateUser.email =  req.body.email;
//            CreateUser.password =  req.body.password;
//            CreateUser.phone =  req.body.phone;
//            CreateUser.username =  req.body.username;
//            if(!req.body.point){
//                
//            CreateUser.point =  '0'  ;
//            }else{
//            CreateUser.point =  req.body.point  ;
//                
//            }
//            
//            CreateUser.save(function(err,data){
//                  if(err){
////                       res.json({success:false , message: err });
//                      if(!err.errors){
//                           res.json({success:false , message: 'username or email or phone already exist2' , data:req.body });
//                      }else{
//                          if(err.errors.email ){
//                             res.json({success:false , message: err.errors.email.message });
//                          }else if(err.errors.username){
//                             res.json({success:false , message: err.errors.username.message });
//                          }else if(err.errors.password){
//                             res.json({success:false , message: err.errors.password.message });
//                          }else if(err.errors.phone){
//                             res.json({success:false , message: 'please enter a valid phone number' });
//                          }else{
//
//                             res.json({success:false , message: 'username or email or phone already exist' });
//                          }
//                      }
//                     
//                      
//
//            }else{
//             
//               res.json({success:true , message: 'user created successfully' , data : data });
//
//            }
//            });
//        }
//    }
//    
// 
//});

//=======================================       
//             get number of users
//=======================================

//router.post('/userno', function(req, res, next) {
//    createUser.find().exec(function(err , users){
//        var count = users.length;
//        if(err){
//            throw res.json({success:false , message:err});
//        }else{
//            
//        res.json({success:true , message : count});
//        }
//    });
//});

//=======================================       
//            update user
//=======================================

//router.post('/updateUser', function(req, res, next) {
//    createUser.findOne({email: req.body.email}).select('username email password phone').exec(function(err , user){
//        if(err){
//            throw res.json({success:false , message:err});
//        }else{
//            if(user){
//                if(req.body.password == null || req.body.password == "" || req.body.rePassword == null || req.body.rePassword == ""){
//                    res.json({success:false , message:'empty filed'});
//                    
//                }else{
//                    if(req.body.newPassword != req.body.rePassword){
//                        res.json({success:false , message:'password donot match'});
//                    }else{
//                        var passwordResualt1 = user.comparePassword(req.body.password);
//                        if(!passwordResualt1){
//                                res.json({success:false , message:'wrong password'});
//                        }else{
//                            user.password =  req.body.rePassword ;
//                        user.save(function(err , data){
//
//                            if(err){
//
//                                res.json({success:false , message : err.errors.password.message})
//
//                            }else{
//
//                                res.json({success:true , message : 'user updated successfully' ,    data:user})
//
//                            }
//
//                        });
//                        }
//                    }
//                
//           
//                
//                  }
//                
//            }
//            
//        }
//    });
//});

//=======================================       
//             get number of users
//=======================================

//router.post('/getallusers', function(req, res, next) {
//    createUser.find().select('username email phone').exec(function(err , users){
//      
//        if(err){
//            throw res.json({success:false , message:err});
//        }else{
//            
//        res.send(users);
//        }
//    });
//});

//=======================================       
//             LogIn
//=======================================

//router.post('/login', function(req, res, next) {
//    createUser.findOne({email: req.body.email}).select('username password email phone point').exec(function(err , user){
//        if(err) throw err ;
//        if(user){
//             if(req.body.email == null || req.body.email == "" || req.body.password == null || req.body.password == "" ){
//                 res.json({success:false , message:"email or password don't exist"});
//              }else{
//
//              var passwordResualt = user.comparePassword(req.body.password);
//                if(passwordResualt){
//                   var token =  jwt.sign({
//                        email: user.email  ,
//                        username: user.username  ,
//                        phone: user.phone ,
//                       point:user.point
//                       
//                    } ,secret , {expiresIn : '24h'} );
//
//                         res.json({success:true , message:"Login success" , token: token});
//                }else{
//                         res.json({success:false , message:"wrong password or email"});
//                }
//
//
//
//            }
//               
//        }else{
//           res.json({success:false , message:"wrong password or email"});
//
//        }
//    });
// 
//   
//    
// 
//});


 

//=======================================       
//             GET mobiles by ID
//=======================================

//router.post('/getProductById', function(req, res, next) {
//   createMobile.find({_id:req.body.id}).exec(function(err , mobiles){
//       if(err){
//           res.json({success:false , message:err});
//           
//       }else{
//           res.json({success:true , message:mobiles});
//       }
//   });
//   
//    
// 
//});

//=======================================       
//             verify token
//=======================================

//router.use(function(req, res, next) {
//  var token =  req.body.token || req.body.query || req.headers['xtoken'];
//    
//    if(token){
//        jwt.verify(token , secret , function(err , decoded){
//            if(err){
//                res.json({success:false , message:'incorrect token '});
//            }else{
//                req.decoded = decoded ;
//
//                next();
//            }
//        });
//        
//        
//        
//    }else{
//       res.json({success:false , message:'no token provided'}) 
//    }
//});
            
//=======================================       
//             getUser with token 
//=======================================

//router.post('/me', function(req, res, next) {
//    res.send(req.decoded);
//    
//});
//

module.exports = router;

            
            
            
            
            
            
            
            
            
            
            
            
            
            
            