
var app = angular.module("catalog", ["ngRoute" , "ui.bootstrap"]);

//routes
//------------------------------------

app.config(function($routeProvider , $locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "/view/templates/home.html",
        controller:'CTRL',
         auth :true
    }).when("/seo", {
        templateUrl : "/view/templates/seo.html",
        controller : "seoCTRL"
        ,
         auth :true

    }).when("/emailMarketing", {
        templateUrl : "/view/templates/emailMarketing.html",
        controller : "emailMarketingCTRL",
         auth :true
    }).when("/socialMedia", {
        templateUrl : "/view/templates/socialMedia.html",
        controller : "socialMediaCTRL",
         auth :true
    }).when("/payPerClick", {
        templateUrl : "/view/templates/payPerClick.html",
        controller : "payPerClickCTRL",
         auth :true
    }).when("/webDesign", {
        templateUrl : "/view/templates/webDesign.html",
        controller : "webDesignCTRL",
         auth :true
    }).when("/webDevelop", {
        templateUrl : "/view/templates/webDevelop.html",
        controller : "webDevelopCTRL",
         auth :true
    }).when("/mobileApp", {
        templateUrl : "/view/templates/mobileApp.html",
        controller : "mobileAppCTRL",
         auth :true
    }).when("/graphic", {
        templateUrl : "/view/templates/graphic.html",
        controller : "graphicCTRL",
         auth :true
    }).when("/photography", {
        templateUrl : "/view/templates/photography.html",
        controller : "photographyCTRL",
         auth :true
    }).when("/motion", {
        templateUrl : "/view/templates/motion.html",
        controller : "motionCTRL",
         auth :true
    }).when("/art", {
        templateUrl : "/view/templates/art.html",
        controller : "artCTRL",
         auth :true
    }).when("/print", {
        templateUrl : "/view/templates/print.html",
        controller : "printCTRL",
         auth :true
    }).when("/blogs/:param", {
        templateUrl : "/view/templates/blogs.html",
        controller : "blogsCTRL",
         auth :true
    }).when("/singleBlog/:id", {
        templateUrl : "/view/templates/singleBlog.html",
        controller : "singleBlogCTRL",
         auth :true
    }).when("/contact", {
        templateUrl : "/view/templates/contact.html",
        controller : "contactCTRL",
         auth :true
    }).when("/os-admin", {
        templateUrl : "/admin/signin.html",
        controller : "signCTRL",
         auth :true
    }).when("/addBlog", {
        templateUrl : "/admin/addBlog.html",
        controller : "addBlogCTRL",
         auth :false
    }).when("/inboxs", {
        templateUrl : "/admin/inboxs.html",
        controller : "inboxCTRL",
         auth :false
    }).when("/inboxDetails", {
        templateUrl : "/admin/inboxDetails.html",
        controller : "inboxDetailsCTRL",
         auth :false     
    });
 $routeProvider.otherwise({
        redirectTo:'/'
    });
    $locationProvider.html5Mode({
        enabled:true,
        requireBase:false
    });
});


//===============================================
//  config app send token in every req 
//================================================
app.config(function($httpProvider) {
         $httpProvider.interceptors.push(function($rootScope , $window) {
        return {
            request: function(config) {
                config.headers.pass =$window.localStorage.getItem('tokenAdCat') ; 
                return config;
            }
        };
    });
 
});
//--------------------------------------
//upload file directive
//--------------------------------------
app.directive('fileModel', ['$parse', function ($parse) {
return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
            scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
            });
        });
    }
};
}]);

//----------------------------------------------
//                  IndexCTRL
//----------------------------------------------
app.controller('homeCTRL'  , function($rootScope , $location , $window , $scope , $http){
    
    
    $rootScope.redirectReloadContact = function(){
        $location.path('/contact');
        $window.location.reload();
    }
//----------------------------------
//    check token in every route 
//-----------------------------------
 if ($window.localStorage.getItem('tokenAdCat')) {
     
     $rootScope.$on('$routeChangeStart', function (next, current) {
         
         $http.post('/admin/me').then(function (response) {
             if (response.data) {
                 
                 if(response.data.success == true){
                     console.log('succes');
                 $rootScope.verifiedToken = true ;
                 }else{
                     console.log('asdasd');
                 console.log(response.data);
                 $rootScope.verifiedToken = false    ;
                     
                 }
             }
             else {
                 $rootScope.verifiedToken = false ;
               
             }
         });
     });
  
     
 } else {
                 $rootScope.verifiedToken = false ;
 }  
    
//========================================
//              logout  admin 
//=========================================
    $scope.logoutAdmin = function(){
        
    if ($window.localStorage.getItem('tokenAdCat')) {
         $window.localStorage.removeItem('tokenAdCat');
         $window.location.reload();
     }
    }
//-------------------------------------------
//              search blog
//-------------------------------------------
    $scope.search = function(searchText){
        if(searchText == undefined){
            searchText = '' ;
        $location.path('/blogs/:'+searchText);
        }else{
            
        console.log(searchText);
        $location.path('/blogs/:'+searchText);
        }
        
        
    }
 

    
});



//==================================================================
//      check user auth and javascrpt reload  scripts for slider
//===============================================================

app.run(function($rootScope , $window , $location){
        var count = 0 ;
        var count1 = 0 ;
    $rootScope.$on('$routeChangeStart', function (event ,  next, current) {
        console.log($location.path());
        
//for user auth pages
//-------------------------------
            console.log(next.$$route.auth);
         if(next.$$route.auth == false){
            if(!$window.localStorage.getItem('tokenAdCat') ){
                
                console.log(next.$$route.auth);
                event.preventDefault(); 
                $location.path('/');
            }
             
            
            
        }
        
        
        
//for slider
//---------------------
        if($location.path() == '/'){
           if(count == 0){
               console.log(count);
               count++
           }else{
               console.log(count);
               $window.location.reload();
           }
            
        }

        
        
       
    });
});


//==================================
//              CTRL
//==================================
app.controller('CTRL'  , function($rootScope , $location , $scope , $http){
        $rootScope.showSlider = true ;
     // get all blogs
//--------------------------------=-------------
    
    $scope.getAllBlogs = function(){
         $http.post('/view/getBlogs').then(function(response){
                 
                if(!response){ 
             }else{
                    $scope.blogs = response.data.reverse() ; 
                    $scope.totalItems = response.data.length ;
                    $scope.itemsPerPage = 6;
                    $scope.currentPage= 1 ; 
                 
                    console.log($scope.searchBlogtext);
                 
                    console.log($scope.blogs);
                    console.log($scope.totalItems);
                    console.log($scope.itemsPerPage);
                    console.log($scope.currentPage);
               
             }
          
              });
    }
    $scope.getAllBlogs();
});

//==================================
//              seoCTRL
//==================================
app.controller('seoCTRL'  , function($rootScope){
        $rootScope.showSlider = false ;

});
//==================================
//              emailMarketingCTRL
//==================================
app.controller('emailMarketingCTRL'  , function($rootScope){
        $rootScope.showSlider = false ;

});
//==================================
//              socialMediaCTRL
//==================================
app.controller('socialMediaCTRL'  , function($rootScope){
        $rootScope.showSlider = false ;

});
//==================================
//              payPerClickCTRL
//==================================
app.controller('payPerClickCTRL'  , function($rootScope){
        $rootScope.showSlider = false ;

});
//==================================
//              webDesignCTRL
//==================================
app.controller('webDesignCTRL'  , function($rootScope){
        $rootScope.showSlider = false ;

});
//==================================
//              webDevelopCTRL
//==================================
app.controller('webDevelopCTRL'  , function($rootScope){
        $rootScope.showSlider = false ;

});
//==================================
//              mobileAppCTRL
//==================================
app.controller('mobileAppCTRL'  , function($rootScope){
        $rootScope.showSlider = false ;

});
//==================================
//              graphicCTRL
//==================================
app.controller('graphicCTRL'  , function($rootScope){
        $rootScope.showSlider = false ;

});
//==================================
//             photographyCTRL
//==================================
app.controller('photographyCTRL'  , function($rootScope){
        $rootScope.showSlider = false ;

});
//==================================
//             motionCTRL
//==================================
app.controller('motionCTRL'  , function($rootScope){
        $rootScope.showSlider = false ;

});
//==================================
//              artCTRL
//==================================
app.controller('artCTRL'  , function($rootScope){
        $rootScope.showSlider = false ;
        console.log($rootScope.showSlider);

});
//==================================
//             printCTRL
//==================================
app.controller('printCTRL'  , function($rootScope){
        $rootScope.showSlider = false ;

});
//==================================
//              blogsCTRL view
//==================================
app.controller('blogsCTRL'  , function($rootScope , $scope , $http ,$routeParams){
        $rootScope.showSlider = false ;
         // get all blogs
//--------------------------------=-------------
    
    $scope.getAllBlogs = function(){
         $http.post('/view/getBlogs').then(function(response){
                 
                if(!response){ 
             }else{
                    $scope.blogs = response.data.reverse() ; 
                    $scope.totalItems = response.data.length ;
                    $scope.itemsPerPage = 6;
                    $scope.currentPage= 1 ; 
                 
                    $scope.searchBlogtext = $routeParams.param.slice(1) ;
                    console.log($scope.searchBlogtext);
                 
                    console.log($scope.blogs);
                    console.log($scope.totalItems);
                    console.log($scope.itemsPerPage);
                    console.log($scope.currentPage);
               
             }
          
              });
    }
    $scope.getAllBlogs();


});
//==================================
//              singleBlogCTRL
//==================================
app.controller('singleBlogCTRL'  , function($rootScope , $scope , $http , $routeParams){
        $rootScope.showSlider = false ;
        console.log($routeParams.id.slice(1));
        $scope.id = $routeParams.id.slice(1);
    $scope.getBlogById = function(){
        $http.post('/view/getBlogById' ,{id:$scope.id} ).then(function(response){
        console.log(response.data.message);
        $scope.blogData = response.data.message;
            
        });
    }
    $scope.getBlogById();
   
});
//==================================
//              contactCTRL
//==================================
app.controller('contactCTRL'  , function($rootScope , $route){
        $rootScope.showSlider = false ;
//    $route.reload();

});


//Admin routes 
//===================================================

//==================================
//              signCTRL
//==================================
app.controller('signCTRL'  , function($rootScope , $route , $window , $location ,$scope , $http){
//slider
//---------
    
        $rootScope.showSlider = false ;
    
//login function 
//--------------------------------------------------
    
        $scope.login = function(data){
                $scope.email = data.email;
                $scope.password = data.password;
                var reqData = {
                  email : $scope.email , 
                  password : $scope.password
                };

                console.log($scope.email);
                console.log($scope.password);

                $http.post('/admin/login', reqData  ).then(function(response){

                    if(response.data.success){
                        $window.localStorage.setItem('tokenAdCat' , response.data.token );
                        $location.path('/addBlog');

                    }else{

                        console.log(response);

                    }
                });
            }
        
        
        

});
//==================================
//              contactCTRL
//==================================
app.controller('addBlogCTRL'  , function($rootScope , $route , $location , $scope , $http , $timeout , $window){
        $rootScope.showSlider = false ;
//    verify auth add blog page 
//-----------------------------------
 if( $rootScope.verifiedToken == false){
                console.log("$rootScope.verifiedToken" +  $rootScope.verifiedToken);
                $location.path('/');
             }else{
                 
             }
    //upload image
//=----------------------------------------
    $scope.show = {
            spin:false ,
            errMessage:false,
            errText : '',
            check:false
            
    };
    
   $scope.uploadFile = function(){
       
       $scope.show.spin = true;
       $scope.show.errMessage = false;
       $scope.show.errText = '';
       $scope.show.check = false;
      
       
        var file = $scope.myFile;
        var uploadUrl = "/multer";
        var fd = new FormData();
        fd.append('file', file);
       
       if(!file){
            $scope.show.spin = false;
            $scope.show.errMessage = true;
           $scope.show.errText = 'please select image';
           console.log('please upload image');
       }else{
           
           $http.post(uploadUrl,fd, {transformRequest: angular.identity,headers: {'Content-Type': undefined}}).then(function(res){
               
            if(!res.data.success){
                $scope.show.spin = false;
                $scope.show.errMessage = true;
                $scope.show.errText = res.data.message;
                  console.log(res.data.message);  
            }else{
           console.log($scope.show);
                
                    $scope.show.spin = false;
                    $scope.show.check = true;
                
                  console.log(res.data.req.path);  
                $scope.data.url = res.data.req.path;
            }
        
        })   
       }

     
      
    };
    
// addBlog 
//--------------------------------------------------------
    $scope.addMobile = function(data){
         console.log(data); 
       
          $scope.show ={
            successMessageShow: false,
            errMessageShow:false,
            loading:false
        };
  
        if (
            data.title == undefined || data.title == "" ||
            data.content == undefined || data.content == "" ||
            data.category == undefined || data.category == "" ||
            data.url == undefined || data.url == "" 
           
        ) {
                $scope.show.successMessageShow = false ; 
                $scope.errMessage = 'please select image' ; 
                $scope.show.errMessageShow = true ; 
             console.log("error");
        }
        else {
             $scope.show.loading = true ; 
              $http.post('/view/addBlog' , data ).then(function(response){
                
                    $scope.show.loading = false ; 

                 if(response.data.success == true){
                     
                     $scope.successMessage = response.data.message; 
                     $scope.show.successMessageShow = true ; 
                     $scope.show.errMessageShow = false ; 
                     $timeout(function(){
                         $scope.show.successMessageShow = false ; 
                         $scope.getAllMobile();
                     },5000);
                     console.log(response);
                 }else{
                     $scope.show.successMessageShow = false ; 

                       $scope.errMessage = response.data.message ; 
                       $scope.show.errMessageShow = true ; 

                 }
              });
        }
    }
    
        // get all blogs
//--------------------------------=-------------
    
    $scope.getAllMobile = function(){
         $http.post('/view/getBlogs').then(function(response){
                 
                if(!response){ 
             }else{
                    $scope.blogs = response.data.reverse() ; 
                    $scope.totalItems = response.data.length ;
                    $scope.itemsPerPage = 5;
                    $scope.currentPage= 1 ; 
             
                    console.log($scope.blogs);
                    console.log($scope.totalItems);
                    console.log($scope.itemsPerPage);
                    console.log($scope.currentPage);
               
             }
          
              });
    }
    $scope.getAllMobile();
    
//    delete mobile
//--------------------------------------------------------

    $scope.getId = function(id){
//        $scope.thisProductId = id ;
    console.log(id);
        $window.localStorage.setItem('idBlog', id);
        
    }
    
    
    
         var that = this ;
    $scope.deletBlog = function(){
        console.log('de');
         $scope.show1 ={
            successMessageShow1: false,
            errMessageShow1:false,
            loading1:false
        };
    
//        if($scope.thisProductId){
            $scope.thisBlogId = $window.localStorage.getItem('idBlog');
        console.log($scope.thisProductId);
             $http.post('/view/deleteBlog' , {id:$scope.thisBlogId} ).then(function(response){
                
                    $scope.show1.loading1 = false ; 

                 if(response.data.success == true){
                     
                     $scope.successMessage1 = response.data.message; 
                     $scope.show1.successMessageShow1 = true ; 
                     $scope.show1.errMessageShow1 = false ; 
                     
                     
                     $timeout(function(){
                         $scope.show1.successMessageShow1 = false ; 
                   
                     $scope.getAllMobile();
                     },4000);
                     console.log(response);
                 }else{
                     $scope.show1.successMessageShow1 = false ; 

                       $scope.errMessage1 = response.data.message ; 
                       $scope.show1.errMessageShow1 = true ; 

                 }
              });

    }
    
    
    

});


//==================================
//              Inboxs 
//==================================
app.controller('inboxCTRL'  , function($rootScope , $route , $window , $location ,$scope , $http){
//slider
//---------
    
        $rootScope.showSlider = false ;
    
    //    verify auth add blog page 
//-----------------------------------
 if( $rootScope.verifiedToken == false){
                console.log("$rootScope.verifiedToken" +  $rootScope.verifiedToken);
                $location.path('/');
             }else{
                 
             }
    // get all blogs
//--------------------------------=-------------
    
    $scope.getAllMobile = function(){
         $http.post('/view/getAllEmails').then(function(response){
                 
                if(!response){ 
             }else{
                    $scope.emails = response.data.message.reverse() ; 
                    $scope.totalItems = response.data.message.length ;
                    $scope.itemsPerPage = 5;
                    $scope.currentPage= 1 ; 
             
                    console.log($scope.emails);
                    console.log($scope.totalItems);
                    console.log($scope.itemsPerPage);
                    console.log($scope.currentPage);
               
             }
          
              });
    }
    $scope.getAllMobile();
});
//==================================
//              Inbox Detalis
//==================================
app.controller('inboxDetailsCTRL'  , function($rootScope , $route , $window , $location ,$scope , $http){
//slider
//---------
    
        $rootScope.showSlider = false ;
    
    //    verify auth add blog page 
//-----------------------------------
 if( $rootScope.verifiedToken == false){
                console.log("$rootScope.verifiedToken" +  $rootScope.verifiedToken);
                $location.path('/');
             }else{
                 
             }
        
});


//pagination admin
//-------------------------

app.filter('blogPagination', function(){
        return function(data , start ){
            return  data.slice(start);
        }
    });

//pagination view
//-------------------------

app.filter('blogsPagination', function(){
        return function(data , start ){
            return  data.slice(start);
        }
    });


















