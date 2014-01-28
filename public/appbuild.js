'use strict';

var angularApp = angular.module('angularjsFormBuilderApp', ['ngCookies','templates-main', 'cordova', 'ngRoute', 'ui.router',  'jmdobry.angular-cache']);




angularApp.config(function ($stateProvider, $urlRouterProvider) {
//    angularApp.config(function ($stateProvider, $routeProvider) {

    //$httpProvider.defaults.useXDomain = true;
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
/*
    $routeProvider
        .when('/', {
            templateUrl: 'views/forms-list.html',
            controller: 'FormsCtrl'
        })
        .when('/forms/:id/view', {
            templateUrl: 'views/form-view.html',
            controller: 'FormCtrl'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
*/

 
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/formslist");
  //
  // Now set up the states
  $stateProvider
    .state('formsList', {
      url: '/formslist',
      templateUrl: 'views/forms-list.html',
      controller: 'FormsCtrl'
    })
    .state('formDetail', {
      url: '/forms/:id/view',
      templateUrl: 'views/form-view.html',
      controller: 'FormCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
   

}).run(function ($rootScope, $state, $stateParams, $http, $angularCacheFactory) {
   // }).run(function ($rootScope,  $http, $angularCacheFactory) {

//Here is a config for a default cache and http replacement.

//    $angularCacheFactory('defaultCache', {
  //      maxAge: 900000, // Items added to this cache expire after 15 minutes.
   //     cacheFlushInterval: 6000000, // This cache will clear itself every hour.
    //    deleteOnExpire: 'aggressive', // Items will be deleted from this cache right when they expire.
     //   storageMode: 'localStorage'
    //});

    //$http.defaults.cache = $angularCacheFactory.get('defaultCache');

 //Set rootscope state so we have access to current state everywhere.
  //$rootScope.$state = $state;
  //$rootScope.$stateParams = $stateParams;



});
;'use strict';

/* Services */

// Simple value service.
angular.module('arvak', []).
  value('version', '0.1');

angular.module('cordova', []);

 angular.module('cordova').factory('cordovaReady', function() {
  return function (fn) {

    var queue = [];

    var impl = function () {
      queue.push(Array.prototype.slice.call(arguments));
    };

    document.addEventListener('deviceready', function () {
      queue.forEach(function (args) {
        fn.apply(this, args);
      });
      impl = fn;
    }, false);

    return function () {
      return impl.apply(this, arguments);
    };
  };
});

angular.module('cordova').factory('geolocation', function ($rootScope, cordovaReady) {
  return {
    getCurrentPosition: cordovaReady(function (onSuccess, onError, options) {
        navigator.geolocation.getCurrentPosition(function () {
               var that = this,
               args = arguments;

               if (onSuccess) {
                   $rootScope.$apply(function () {
                        onSuccess.apply(that, args);
                   });
                   }
               }, function () {
                    var that = this,
                    args = arguments;

                   if (onError) {
                        $rootScope.$apply(function () {
                            onError.apply(that, args);
                        });
                   }
               },
            options);
        })
    };
});

angular.module('cordova').factory('camera', function ($rootScope, cordovaReady) {
  return {
    getPicture: cordovaReady(function (onSuccess, onError, options) {
        navigator.camera.getPicture(function () {
               var that = this,
               args = arguments;

               if (onSuccess) {
                   $rootScope.$apply(function () {
                        onSuccess.apply(that, args);
                   });
                   }
               }, function () {
                    var that = this,
                    args = arguments;

                   if (onError) {
                        $rootScope.$apply(function () {
                            onError.apply(that, args);
                        });
                   }
               },
            options);
        })
    };
});

angular.module('cordova').factory('networkConnection', function (cordovaReady) {
  return {
    getConnectionType: cordovaReady(function () {
          var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';

            return states[networkState];
        }),
    isOnline: cordovaReady(function () {
        if(navigator.connection.type == Connection.NONE){
            return false;

        }
        return true;        
    })
    };
});

angular.module('cordova').service('device', function (cordovaReady) {
  return cordovaReady(window.device);
        
        
  
 
});

angular.module('cordova').factory('accelerometer', function ($rootScope, cordovaReady) {
    return {
        getCurrentAcceleration: cordovaReady(function (onSuccess, onError) {
            navigator.accelerometer.getCurrentAcceleration(function () {
                var that = this,
                    args = arguments;

                if (onSuccess) {
                    $rootScope.$apply(function () {
                        onSuccess.apply(that, args);
                    });
                }
            }, function () {
                var that = this,
                args = arguments;

                if (onError) {
                    $rootScope.$apply(function () {
                        onError.apply(that, args);
                    });
                }
            });
        })
    };
});

angular.module('cordova').factory('notification', function ($rootScope, cordovaReady) {
    return {
        alert: cordovaReady(function (message, alertCallback, title, buttonName) {
            navigator.notification.alert(message, function () {
                var that = this,
                    args = arguments;

                $rootScope.$apply(function () {
                    alertCallback.apply(that, args);
                });
            }, title, buttonName);
        }),
        confirm: cordovaReady(function (message, confirmCallback, title, buttonLabels) {
            navigator.notification.confirm(message, function () {
                var that = this,
                    args = arguments;

                $rootScope.$apply(function () {
                    confirmCallback.apply(that, args);
                });
            }, title, buttonLabels);
        }),
        beep: cordovaReady(function (times) {
            navigator.notification.beep(times);
        }),
        vibrate: cordovaReady(function (milliseconds) {
            navigator.notification.vibrate(milliseconds);
        })
    };
});



angular.module('cordova').factory('compass', function ($rootScope, cordovaReady) {
    return {
        getCurrentHeading: cordovaReady(function (onSuccess, onError, options) {
        navigator.compass.getCurrentHeading(function () {
               var that = this,
               args = arguments;

               if (onSuccess) {
                   $rootScope.$apply(function () {
                        onSuccess.apply(that, args);
                   });
                   }
               }, function () {
                    var that = this,
                    args = arguments;

                   if (onError) {
                        $rootScope.$apply(function () {
                            onError.apply(that, args);
                        });
                   }
               },
            options);
        })
    };
});

angular.module('cordova').factory('contactsSvc', function ($rootScope, cordovaReady) {
    return {
        findContacts: cordovaReady(function (fields, onSuccess, onError, options) {
        navigator.contacts.find(fields, function () {
               var that = this,
               args = arguments;

               if (onSuccess) {
                   $rootScope.$apply(function () {
                        onSuccess.apply(that, args);
                   });
                   }
               }, function () {
                    var that = this,
                    args = arguments;

                   if (onError) {
                        $rootScope.$apply(function () {
                            onError.apply(that, args);
                        });
                   }
               },
            options);
        })



    }
});




angular.module('arvak').service('formsCache', function ($http, $q, $angularCacheFactory) {

    $angularCacheFactory('formsCache', {
        maxAge: 900000, // Items added to this cache expire after 15 minutes.
        cacheFlushInterval: 3600000, // This cache will clear itself every hour.
        deleteOnExpire: 'aggressive', // Items will be deleted from this cache right when they expire.
        storageMode: 'localStorage'
    });
 
    return {
        getDataById: function (id) {
            var deferred = $q.defer(),
                
                dataCache = $angularCacheFactory.get('formsCache');

            // Now that control of inserting/removing from the cache is in our hands,
            // we can interact with the data in "dataCache" outside of this context,
            // e.g. Modify the data after it has been returned from the server and
            // save those modifications to the cache.
            if (dataCache.get(id)) {
                alert('loaded from localstorage');
                deferred.resolve(dataCache.get(id));
            } else {
                $http.get('/forms').success(function (data) {
              
                        console.log('time taken for request: ' + (new Date().getTime() - start) + 'ms');
                     

                        deferred.resolve(data);
                        console.log('bla');
                    });
            }
            return deferred.promise;
        }
    };
});






;angularApp.factory('Auth', ['Base64', '$cookieStore', '$http', function (Base64, $cookieStore, $http) {
    // initialize to whatever is in the cookie, if anything
    $http.defaults.headers.common['Authorization'] = 'Basic ' + $cookieStore.get('authdata');
 
    return {
        setCredentials: function (username, password) {
            var encoded = Base64.encode(username + ':' + password);
            //var encoded = 'Y2FzdGlsbG9yOmRlbW8xMjM=';
            
            $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
            //$cookieStore.put('authdata', encoded);
        },
        clearCredentials: function () {
            document.execCommand("ClearAuthenticationCache");
            $cookieStore.remove('authdata');
            $http.defaults.headers.common.Authorization = 'Basic ';
        },
        getCredientials: function(){
            
        }
    };
}]);

angularApp.factory('Base64', function() {
    var keyStr = 'ABCDEFGHIJKLMNOP' +
        'QRSTUVWXYZabcdef' +
        'ghijklmnopqrstuv' +
        'wxyz0123456789+/' +
        '=';
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
 
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
 
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
 
                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
 
            return output;
        },
 
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));
 
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
 
                output = output + String.fromCharCode(chr1);
 
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
 
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
 
            } while (i < input.length);
 
            return output;
        }
    };
});;'use strict';

angularApp.factory('FormService', function FormService($http, $q, $angularCacheFactory, networkConnection) {

    var formsJsonPath = 'sample_forms.json';
    var formsAPIPath = 'http://ec2-54-227-190-245.compute-1.amazonaws.com:8888/yms/api/forms/web/?format=json';
    var formsLocalAPIPath = '/forms';
    
     $angularCacheFactory('formsCache', {
        maxAge: 900000, // Items added to this cache expire after 15 minutes.
        cacheFlushInterval: 3600000, // This cache will clear itself every hour.
        deleteOnExpire: 'aggressive', // Items will be deleted from this cache right when they expire.
        storageMode: 'localStorage'
    });
    return {
        
        
        forms:function(){
             var deferred = $q.defer(),
                
                formsCache = $angularCacheFactory.get('formsCache');

            
            if (formsCache.get(formsAPIPath)) {
                console.log('loaded from localstorage');
                deferred.resolve(formsCache.get(formsAPIPath));
            }else if (networkConnection.isOnline){
                $http.get(formsAPIPath).success(function (response) {
              
                        console.log('loaded from http' );
                        console.log(response);
                        formsCache.put(formsAPIPath, response.all_values_json);


                        deferred.resolve(response.all_values_json);
                        
                    }).error(function(){
                      $http.get(formsLocalAPIPath).success(function (response) {
              
                        console.log('loaded from http' );
                        console.log(response);
                        formsCache.put(formsAPIPath, response.all_values_json);


                        deferred.resolve(response.all_values_json);
                        
                    })  
                    });
            }else{
                deferred.resolve({error:'no offline data'});
            }
            return deferred.promise;
        },
        form:function(id){
             var deferred = $q.defer(),
                
                formsCache = $angularCacheFactory.get('formsCache');


            if (formsCache.get(formsAPIPath)) {
                console.log('loaded from localstorage');
                var requestedForm = {};
                        angular.forEach(formsCache.get(formsAPIPath), function (form) {
                            if (form.form.id == id) requestedForm = form.form;
                        });

                deferred.resolve(requestedForm);
            } else if (networkConnection.isOnline){

                $http.get(formsAPIPath).success(function (response) {
              
                        console.log(id + ' loaded from http' );
                        formsCache.put(formsAPIPath, response.all_values_json);

                        var requestedForm = {};
                        angular.forEach(response.all_values_json, function (form) {
                            if (form.form.id == id) requestedForm = form.form;
                        });

                        deferred.resolve(requestedForm);
                        
                    });
            } else{
                deferred.resolve({error:'no offline data'});
            }


            return deferred.promise;
        }
    };
});
;'use strict';
angular.module('arvak', []);
/* Controllers */
angular.module('arvak').controller('HomeCtrl', ['$scope','navSvc','$rootScope', function($scope,navSvc,$rootScope) {
    console.log('initialized');
    $rootScope.showSettings = false;
    $scope.slidePage = function (path,type) {
        navSvc.slidePage(path,type);
    };
    $scope.back = function () {
        navSvc.back();
    };
    $scope.changeSettings = function () {
        $rootScope.showSettings = true;
    };
    $scope.closeOverlay = function () {
        $rootScope.showSettings = false;
    };
}]);


angular.module('arvak').controller('LoginCtrl', ['$scope', 'templateCache','networkConnection', function($scope, templateCache, networkConnection) {
    $scope.hasConnection = networkConnection.hasConnection();
    templateCache.getDataById(1)
        .then(function (data) {
          $scope.template = data;
            
        });


}]);


angular.module('arvak').controller('NotificationCtrl', ['$scope', 'notification', function($scope, notification) {
    $scope.alertNotify = function() {
        notification.alert("Sample Alert",function() {console.log("Alert success")},"My Alert","Close");
    };
    
    $scope.beepNotify = function() {
        notification.beep(1);
    };
    
    $scope.vibrateNotify = function() {
        notification.vibrate(1000);
    };
    
    $scope.confirmNotify = function() {
        notification.confirm("My Confirmation",function(){console.log("Confirm Success")},"Are you sure?",["Ok","Cancel"]);
    };
}]);

angular.module('arvak').controller('GeolocationCtrl', ['$scope', 'navSvc','geolocation', function($scope,navSvc, geolocation) {

    geolocation.getCurrentPosition(function(position) {
       
        $scope.position=position;
        $scope.$apply();
        },function(e) { alert("Error retrieving position " + e.code + " " + e.message) });

    $scope.back = function () {
        navSvc.back();
    };
}]);

angular.module('arvak').controller('NetworkConnectionCtrl',['$scope', 'navSvc','networkConnection', function($scope,navSvc, networkConnection) {

    $scope.connectionType = networkConnection.getConnectionType(); 
       
    $scope.hasConnection = networkConnection.hasConnection();
        
    $scope.back = function () {
        navSvc.back();
    };
}]);

angular.module('arvak').controller('AccelerCtrl',['$scope', 'accelerometer', function($scope, accelerometer) {
    accelerometer.getCurrentAcceleration(function (acceleration) {
        $scope.acceleration  = acceleration;
        },function(e) { console.log("Error finding acceleration " + e) });
}]);

angular.module('arvak').controller('DeviceCtrl', ['$scope', 'device', function($scope, device) {
    //Not properly integrated with service
    $scope.device = window.device;
}]);

//This is broken for some reason.
angular.module('arvak').controller('CompassCtrl', ['$scope', 'compass', function($scope, compass) {
    compass.getCurrentHeading(function (heading) {
        $scope.heading  = heading;
        alert(heading);
    },function(e) { console.log("Error finding compass " + e.code) });
}]);

angular.module('arvak').controller('HackerNewsCtrl', ['$scope', '$rootscope', 'notification', function($scope, $rootScope, notification) {

    // load in data from hacker news unless we already have
    if (!$rootScope.items) {     

        jx.load('http://api.ihackernews.com/page',function(data){
            console.log(JSON.stringify(data));
            $rootScope.items = data.items;
            $scope.$apply();
        },'json');

    } else {
        console.log('data already loaded');
    }

    $scope.loadItem = function(item) {
        notification.alert(item.url,function() {console.log("Alert success")},"My Alert","Close");
    };
}]);


angular.module('arvak').controller('ContactsCtrl',['$scope', 'contactsSvc', function($scope, contactsSvc) {
    //Not properly integrated with service

    $scope.find = function() {
        $scope.contacts = [];
        var options = new ContactFindOptions();
        //options.filter=""; //returns all results
        options.filter=$scope.searchTxt;
        options.multiple=true;
        var fields = ["displayName", "name", "phoneNumbers"];
        contactsSvc.findContacts(fields,function(contacts) {
            $scope.contacts=contacts;
           
        },function(e){console.log("Error finding contacts " + e.code)},options);
    }
}]);

angular.module('arvak').controller('CameraCtrl', ['$scope', 'camera', function($scope, camera) {
    $scope.takePic = function() {
        var options =   {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
            encodingType: 0     // 0=JPG 1=PNG
        }
        // Take picture using device camera and retrieve image as base64-encoded string
        camera.getPicture(onSuccess,onFail,options);
    }
    var onSuccess = function(imageData) {
        console.log("On Success! ");
        $scope.picData = "data:image/jpeg;base64," +imageData;
        //$scope.$apply();
    };
    var onFail = function(e) {
        console.log("On fail " + e);
    };
}]);



                     ;'use strict';

angularApp.controller('FormCtrl', function ($scope, FormService, $stateParams, Auth) {
 

        Auth.setCredentials('castillor', 'demo123');

    // read form with given id
    FormService.form($stateParams.id).then(function(form) {
        $scope.form = form;

    });
});

 angularApp.controller('FormsCtrl', function ($scope, FormService, $stateParams, Auth) {
   $scope.form = {};
     
        Auth.setCredentials('castillor', 'demo123');

    // read form with given id
    FormService.forms().then(function(forms) {
        $scope.forms = forms;

    });
});;angularApp.controller('LoginCtrl', function ($scope, FormService, Auth) {
    $scope.user = {};
    $scope.submit = function(user) {
        Auth.setCredentials(user.name, user.password);
        console.log($scope.user.name);


    }

    
});;'use strict';

angularApp.directive('fieldDirective', function ($http, $compile,  $templateCache) {

        var getTemplateUrl = function(field) {
            var type = field.type;
            var templateUrl = '';

            switch(type) {
                case 'textbox':
                    templateUrl = 'templates/html/directive-templates/field/textbox.html';
                    break;
                case 'email':
                    templateUrl = '/templates/html/directive-templates/field/email.html';
                    break;
                case 'textarea':
                    templateUrl = '/templates/html/directive-templates/field/textarea.html';
                    break;
                case 'checkbox':
                    templateUrl = '/templates/html/directive-templates/field/checkbox.html';
                    break;
                case 'date':
                    templateUrl = '/templates/html/directive-templates/field/date.html';
                    break;
                case 'dropdown':
                    templateUrl = '/templates/html/directive-templates/field/dropdown.html';
                    break;
                case 'hidden':
                    templateUrl = '/templates/html/directive-templates/field/hidden.html';
                    break;
                case 'password':
                    templateUrl = '/templates/html/directive-templates/field/password.html';
                    break;
                case 'radio':
                    templateUrl = '/templates/html/directive-templates/field/radio.html';
                    break;
                default:
                    console.log('default');
                    templateUrl = 'templates/html/directive-templates/field/default.html';
                    break;
            }
            return templateUrl;
        }

        var linker = function(scope, element) {
            // GET template content from path
                                    element.hide();
            var templateUrl = getTemplateUrl(scope.field);

            $http.get(templateUrl, {cache:  $templateCache}).success(function(data) {
              
                element.html(data);
                $compile(element.contents())(scope);
                                        element.show();
            });
        }

        return {
            template: '<div class="ng-cloak">{{field}}</div>',
            restrict: 'E',
            scope: {
                field:'='
            },
            link: linker
        };
  });
;'use strict';

angularApp.directive('formDirective', function () {
    return {
        controller: function($scope){
            $scope.submit = function(){
                alert('Form submitted..');
                $scope.form.submitted = true;
            }

            $scope.cancel = function(){
                alert('Form canceled..');
            }
        },
        templateUrl: 'templates/html/directive-templates/form/form.html',
        restrict: 'E',
        scope: {
            form:'='
        }
    };
  });
