'use strict';

//var angularApp = angular.module('angularjsFormBuilderApp', ['ngCookies','templates-main', 'cordova', 'ngRoute', 'ui.router', 'jmdobry.angular-cache']);
var angularApp = angular.module('angularjsFormBuilderApp', ['ngCookies', 'templates-main', 'cordova', 'ngRoute', 'ui.router', 'jmdobry.angular-cache']);




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
  $urlRouterProvider.otherwise("/mapgeo");
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
    .state('mapping', {
      url: '/mapping',
      templateUrl: 'mapping/views/map.html',
      controller: 'MapCtrl'
    })
    .state('mapgeo', {
      url: '/mapgeo',
      templateUrl: 'mapping/views/mapgeo.html',
      controller: 'GMapCtrl'
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
;angular.module('cordova').directive('compass', function () {
    return {
        restrict: 'E',
        
        link: function (scope, element, attrs) {
            attrs.$observe("direction", function(value) {
                element.css({"-webkit-transform": "rotate(" + value + "deg) "});
                

                
            });
        }
    }
});;"use strict";

angular.module('cordova').directive('gmap', function ($window,$parse, $rootScope, mapping2, compass, geomath,geotracking, cordovaReady) {
    var counter = 0,
    prefix = '__ep_gmap_';
    
    
    return {
        restrict: 'A',
        replace: false,
        templateUrl: 'mapping/views/gmap.html',
        controller: ['$scope', '$http', 'mapping2', function($scope, $http, mapping2) {

            $scope.trueBearing = 0;
            $scope.compassBearing = 0;
            $scope.compassActive = "false";
           
            

            $scope.addTask = function(){

                mapping2.addMarker("userMarker", "newTask", new google.maps.LatLng(40.875638,
                   -81.395184));
            } 



            function onSuccess(heading) {
                $scope.bearingDifference = 'Heading: ' + heading.compassBearing;
            }

    // onError: Failed to get the heading
    //
    function onError(compassError) {
        $scope.compassBearing = 'Compass Error: ' + compassError.code;
    }


    $scope.updateBearing = function(){

        compass.getCurrent(function(heading){
            $scope.compassActive = "true"  + heading.magneticHeading;
            $scope.compassBearing = heading.magneticHeading;
            //$scope.$apply();
        }) 

                /*
                var position1 = mapping2.getMarker('userMarker').position;
                var position2 = mapping2.getMarker('secondGuy').position;
                $scope.distance = geomath.calculateDistance(position1,position2);
                $scope.bearing = geomath.calculateBearing(position1,position2);
                $scope.bearingDifference =  $scope.bearing - $scope.myBearing ;
                $scope.bearingTo = $scope.bearing;
                */
            }


        }],
        link: function (scope, element, attrs, controller) {



            $rootScope.$on('test', function(event, msg) {

                var getter = $parse(attrs.gmap),
                setter = getter.assign;


                mapping2.model = scope.gmap;

            //model.options = ['Driving', 'Walking', 'Bicycling', 'Transit'];
            //model.selectedOption = 'Driving';
            //model.totalKm = 0;
            
            setter(scope, mapping2.model);
            //scope.model = model;



            if ($window.google && $window.google.maps) {
                console.log("loading map");
                gInit();
            } else {
                console.log("not loading map");
                injectGoogle();
            }

            
            cordovaReady(compass.subscribe(function(heading){
                scope.compassActive = "scanning "  + heading.magneticHeading;
                scope.compassBearing = heading.magneticHeading;
                console.log("compass update");
                scope.$apply();

            }));
            cordovaReady(compass.start());

            



        });



            scope.addMarker = function(){
                mapping2.addMarker("userMarker", "userMarker", mapping2.model.center);
            }

            scope.removeMarker = function(){
                mapping2.removeMarker("userMarker");
            }

            scope.addPolygon = function(){
                var thisType= {
                  "typeName": "Section",
                  "detailsTemplate": "templates/map/section.ejs",
                  "drawType": "polygon",
                  "drawArea": true,
                  "strokeColor": "#35586C",
                  "strokeOpacity": 0.8,
                  "strokeWeight": 1,
                  "fillColor": "#63D1F4",
                  "fillOpacity": 0.40
              }

              var item = {
                name:'test',
                coords:[[40.879780, -81.401142],[40.879780, -81.399481],[40.878153, -81.399481],[40.878153, -81.401142]]
            }

            mapping2.render_polygon(thisType, item);
        }

        scope.removePolygon = function(){


            mapping2.removePolygon('test');
        }


        function gInit() {

            mapping2.map = new google.maps.Map(document.getElementById("map-canvas"),
                mapping2.model);
            
            scope.userMarker = mapping2.addMarker("userMarker", "userMarker", mapping2.model.center);
            mapping2.addMarker("userMarker", "newTask", new google.maps.LatLng(40.875638,-81.395184));
            scope.addPolygon();

            if ("geolocation" in navigator) {

                 geotracking.subscribe(function(geo) {
          
            console.log("geo update");
            
            
            mapping2.moveMarkerTo(scope.userMarker, geo.coords);
            scope.$apply();
        });
        geotracking.start();
        }

        /*
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = new google.maps.LatLng(position.coords.latitude,
                       position.coords.longitude);
                        //map.setCenter(Location);
                        scope.$apply(function () {
                            model.fromAddress = pos;
                        });
                        model.setDirections();
                    });
            }
          */  


        }
        function injectGoogle() {

            var cbId = prefix + ++counter;

            $window[cbId] = gInit;

            var wf = document.createElement('script');
            wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
            '://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' + 'callback=' + cbId;
            wf.type = 'text/javascript';
            wf.async = 'true';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(wf, s);
        };
    }
}





});;angular.module('cordova').service('acceleration', function() {
    var self = this;

    this.config = {
        frequency: 1000
    };

    /** is accelerometer available ? */
    this.available = navigator.accelerometer ? true : false;

    /** orientation listeners */
    this.listeners = [];

    /** acceleration */
    this.acceleration = {};

    /**
     * c-tor
     */
    this.init = function() {
        document.addEventListener("deviceready", self.onDeviceReady, false)
    }

    /**
     * phonegap device ready listener
     */
    this.onDeviceReady = function() {
        self.available = navigator.accelerometer ? true : false;
    }

    /**
     * get one time orientation
     * @param callback
     */
    this.getCurrent = function(callback) {
        if (!self.available) { return false; }
        navigator.accelerometer.getCurrentAcceleration(callback, self.error);
    }

    /**
     * start tracking
     * @param callback for orientation update
     * @param optional config to override default
     *
     */
    this.start = function(config) {

        if (!self.available) { return false; }
        if (config) { self.config = config; }
        self.accelerationWatch = navigator.accelerometer.watchAcceleration(
            self.updated, function(ex) {
                console.log("accel fail (" + ex.name + ": " + ex.message + ")");
            }, {frequency: 250});
    };

    /**
     * stop watching orientation
     */
    this.stop = function() {
        if (!self.available) { return false; }
        navigator.accelerometer.clearWatch(self.accelerationWatch);
        self.accelerationWatch = null;
    }

    /**
     * subscribe to orientation service
     * @param callback
     */
    this.subscribe = function(callback) {
        self.listeners.push(callback);
    }

    /**
     * remove all the listeners
     */
    this.removeAllListeners = function() {
        self.listeners = [];
    }

    /**
     * update acceleration
     * @param acceleration
     */
    this.updated = function(a) {
        self.acceleration = a;
        self.listeners.forEach( function(l) {
            l.apply(this, [a]);
        });
    }

    /**
     * manual refresh for outside mechanisms updating the heading object
     */
    this.forceRefresh = function() {
        this.updated(self.heading);
    }

    /**
     * update orientation error handler
     * @param error
     */
    this.error = function(error) {
        console.log("error");
    }

    this.init();
});;angular.module('cordova').service('compass', function() {
    var self = this;

    this.config = {
        frequency: 100
    };

    /** is compass available ? */
    this.available = navigator.compass ? true : false;

    /** compass listeners */
    this.listeners = [];

    /** heading */
    this.heading = { magneticHeading: 0 };

    /**
     * c-tor
     */
    this.init = function() {
        document.addEventListener("deviceready", self.onDeviceReady, false)
    }

    /**
     * phonegap device ready listener
     */
    this.onDeviceReady = function() {
        self.available = navigator.compass ? true : false;
    }

    /**
     * get one time compass heading
     * @param callback
     */
    this.getCurrent = function(callback) {
        if (!self.available) { console.log('no compass avaialble');return false; }
        navigator.compass.getCurrentHeading(callback, self.error);
    }

    /**
     * start tracking
     * @param callback for compass update
     * @param optional config to override default
     *
     */
    this.start = function(config) {
        if (!self.available) { return false; }
        if (config) {
            self.config = config;
        }
        self.watchID = navigator.compass.watchHeading(self.updated, self.error, self.config);
    };

    /**
     * stop watching compass
     */
    this.stop = function() {
        if (self.watchID) {
            navigator.compass.clearWatch(self.watchID);
            self.watchID = null;
        }
    }

    /**
     * subscribe to compass service
     * @param callback
     */
    this.subscribe = function(callback) {
        self.listeners.push(callback);
    }

    /**
     * remove all the listeners
     */
    this.removeAllListeners = function() {
        self.listeners = [];
    }

    /**
     * update heading
     * @param heading
     */
    this.updated = function(heading) {
        self.heading = heading;
        self.listeners.forEach( function(l) {
            l.apply(this, [heading]);
        });
    }

    /**
     * manual refresh for outside mechanisms updating the heading object
     */
    this.forceRefresh = function() {
        this.updated(self.heading);
    }

    /**
     * update compass error handler
     * @param error
     */
    this.error = function(error) {
        console.log("error");
    }

    this.init();
});;angular.module('cordova').service('geomath', function() {
    var self = this;
    var R = 6371000; // earth's radius in meters

    /**
     * calculate distance
     * @param geo1
     * @param geo2
     * @returns {Number}
     */
    this.calculateDistance = function(geo1, geo2) {
        self.convertFromGoogle([geo1, geo2]);
        var dLat = self.toRad(geo1.latitude - geo2.latitude);
        var dLon = self.toRad(geo1.longitude - geo2.longitude);
        var lat1 = self.toRad(geo2.latitude);
        var lat2 = self.toRad(geo1.latitude);

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return parseInt(R * c);
    }

    /**
     * calculate bearing between two coordinates
     * @param geo1
     * @param geo2
     * @returns {*}
     */
    this.calculateBearing = function(geo1, geo2) {
        self.convertFromGoogle([geo1, geo2]);
        var dLat = self.toRad(geo1.latitude - geo2.latitude);
        var dLon = self.toRad(geo1.longitude - geo2.longitude);
        var lat1 = self.toRad(geo2.latitude);
        var lat2 = self.toRad(geo1.latitude);

        var y = Math.sin(dLon) * Math.cos(lat2);
        var x = Math.cos(lat1)*Math.sin(lat2) -
            Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
        var brng = self.toDeg(Math.atan2(y, x));
        return brng;
    }

    /**
     * get coords from projecting out from location at a certain distance and angle
     * @param geo
     * @param distance
     * @param bearing
     */
    this.projectOut = function(geo, d, brng) {
        self.convertFromGoogle([geo]);
        var lat1 = self.toRad(geo.latitude);
        var lon1 = self.toRad(geo.longitude);
        var brng = self.toRad(brng);
        var lat2 = Math.asin( Math.sin(lat1)*Math.cos(d/R) +
            Math.cos(lat1)*Math.sin(d/R)*Math.cos(brng) );
        var lon2 = lon1 + Math.atan2(Math.sin(brng)*Math.sin(d/R)*Math.cos(lat1),
            Math.cos(d/R)-Math.sin(lat1)*Math.sin(lat2));

        return { latitude: self.toDeg(lat2), longitude: self.toDeg(lon2) };
    }

    /**
     * convert from google lat/long object
     */
    this.convertFromGoogle = function(llobjs) {
       llobjs.forEach( function(llo) {
           if (typeof(llo.lat) != "undefined" && typeof(llo.lng) != "undefined") {
               llo.latitude = llo.lat();
               llo.longitude = llo.lng();
           }
       });
    }

    /**
     * math util to convert lat/long to radians
     * @param value
     * @returns {number}
     */
    this.toRad = function(value) {
        return value * Math.PI / 180;
    }

    /**
     * math util to convert radians to latlong/degrees
     * @param value
     * @returns {number}
     */
    this.toDeg = function(value) {
        return value * 180 / Math.PI;
    }

});;angular.module('cordova').service('geometry', function($http) {
	var self = this;
	var yardApi = "/mapping/maps/honda.plant.json";
	var root = {};
	self.getJson = function(){

		return $http.get(yardApi).then(function (response) {
			return response.data;
		})

	}

	self.getTypes = function(){

		return $http.get(yardApi).then(function (response) {
			return response.data.geomTypes;
		})

	}


	self.getGeoms = function(){

		return $http.get(yardApi).then(function (response) {
			return response.data.geoms;
		})
	}

	self.buildRoot = function() {
		return self.getJson().then(function(geometryJson) {
			self.root = geometryJson.geoms[0];
			self.geomTypes = geometryJson.geomTypes;
			self.linkGeomTypes(self.root);
			
			return self.root;
	})
	};

	self.linkGeomTypes = function(rootGeom) {
      /* Replace goem.geomType string key (like 'bay')
      with the actual geomType object. */
      self.each(function(geom) {
      	if (!_.isString(geom.geomType)) return;
      	geom.geomType = self.geomTypes[geom.geomType];
      }, rootGeom);
  };

  self.filterFlat = function(func) {
  	/* Return a flat list of matching geoms */
  	var list = [];
  	self.each(function(item) {
  		if (func(item)) list.push(item);
  	});
  	return list;
  };

  self.each = function(func, geom) {
  	/* Run func on the geom (or root) and all its children */
  	geom = geom || self.root;
  	func(geom);
  	_.each(geom.childGeoms, _.partial(self.each, func));
  };



    self.render = function(item, renderChildren) {
      if (renderChildren == null) renderChildren = true;

      var geomType = item.geomType;
      var renderFunc = self.getRenderer(geomType);
      var googObj = renderFunc(geomType, item);

      googObj.geom = item;
      self.googObjs[item.geomName] = googObj;

      if (renderChildren) {
        _.each(item.childGeoms, self.render);
      }

      return googObj;
    };

        self.render_polygon = function(geomType, item) {
      // console.log('GeometryRenderer: render_polygon');
      var latLngs = self.coordsToLatLngs(item.coords);

      var polygon = GoogleMapsWrapper.newPolygon({
        paths: latLngs,
        map: self.gMap,
        strokeColor: geomType.strokeColor,
        strokeOpacity: geomType.strokeOpacity,
        strokeWeight: geomType.strokeWeight,
        fillColor: geomType.fillColor,
        fillOpacity: geomType.fillOpacity,
        zIndex: geomType.zIndex
      });

      // Fulfill anchor interface for infoWindows
      polygon.set('position', GoogleMapsWrapper.newLatLng(item.coords[0]));

      // console.log('render_polygon:', polygon);
      return polygon;
    };

    self.getRenderer = function(geomType) {
      return self['render_' + geomType.drawType];
    };

   self.renderAll = function() {
      self.render(self.geometry.root);
      
    };


    self.init = function() {
      console.log('GoogleMapsWrapper: init');
      self.options = _.extend({
        // Default options
        onFullyLoaded: function() {}
      });

      var mapOptions = {
        zoom: 18,
        center: centerPoint,
        mapTypeId: google.maps.MapTypeId.SATELLITE
      };

      container = $(container)[0]; // Google needs a raw dom obj
      self.map = new google.maps.Map(container, mapOptions);

      // Note: there's also the 'tilesloaded' event which was giving
      // some trouble but could come in handy if we find any issues
      // with just using the first 'idle'.
      google.maps.event.addListenerOnce(self.map, 'idle', function() {
        console.log('GoogleMapsWrapper: Fully loaded');
        self.options.onFullyLoaded(self);
      });
    };

})
;angular.module('cordova').service('geotracking', function() {
    var self = this;

    this.config = {
        enableHighAccuracy: true,
        maximumAge: 5000
    };

    /** geo listeners */
    this.listeners = [];

    /**
     * get one time geolocation
     * @param callback
     */
    this.getCurrent = function(callback) {
        navigator.geolocation.getCurrentPosition(callback, self.error, self.config);
    }

    /**
     * start tracking
     * @param callback for geoservice update
     * @param optional config to override default
     *
     */
    this.start = function(config) {
        if (config) {
            self.config = config;
        }
        if (self.watchID) {
            navigator.geolocation.clearWatch(self.watchID);
        }
        self.watchID = navigator.geolocation.watchPosition(self.updated, self.error, self.config);
    };

    /**
     * stop tracking
     */
    this.stop = function() {
        if (self.watchID) {
            navigator.geolocation.clearWatch(self.watchID);
        }
    }

    /**
     * subscribe to geo service
     * @param callback
     */
    this.subscribe = function(callback) {
        self.listeners.push(callback);
    }

    /**
     * update geolocation
     * @param geo
     */
    this.updated = function(geo) {
        console.log('updated');
        self.accuracy = geo.coords.accuracy;
        self.geo = geo;
        self.listeners.forEach( function(l) {
            l.apply(this, [geo]);
        });
    }

    /**
     * update geolocation error handler
     * @param error
     */
    this.error = function(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                self.listeners.forEach( function(l) {
                    l.apply(this, [{error: true, message: "User denied the request for Geolocation."}]);
                });
                break;
            case error.POSITION_UNAVAILABLE:
                self.listeners.forEach( function(l) {
                    l.apply(this, [{error: true, message: "Location information is unavailable."}]);
                });
                break;
            case error.TIMEOUT:
                self.listeners.forEach( function(l) {
                    l.apply(this, [{error: true, message: "The request to get user location timed out."}]);
                });
                break;
            case error.UNKNOWN_ERROR:
                self.listeners.forEach( function(l) {
                    l.apply(this, [{error: true, message: "An unknown error occurred."}]);
                });
                break;
        }
    }
});;angular.module('cordova').service('mapping', function($http, geotracking) {
    var self = this;

    if (typeof google == "undefined" ) {
        self.available = false;
    } else {
        self.available = true;
    }

    /** markers by name */
    this.markers = {};

    /** configuration for maps */
   /*  this.mapOptions = {
        zoom: 18,
        center: centerPoint,
        mapTypeId: google.maps.MapTypeId.SATELLITE
      };*/
    this.config = {
        google: {
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.SATELLITE
            
        },
        animationSteps: 50,
        closeUpZoom: 20,
        cameraAnimationSteps: 100
    };

    /**
     * add a marker
     * @param type
     * @param name
     * @param coords
     */
    this.addMarker = function(type, name, coords) {
        if (!coords) {
            coords = geotracking.geo.coords;
        }
        self.markers[name] = self._markerFactory(type, coords);
        return { marker: self.markers[name], coords: coords};
    }

    /**
     * remove marker
     * @param ref
     */
    this.removeMarker = function(ref) {
        for (var c in self.markers) {
            if (self.markers[c] == ref) {
                self.markers.splice(c, 1);
            }
        }
        ref.marker.setMap(null);
    }

    /**
     * animate camera to geoposition
     * @param coords
     * @param config
     * @param callback
     */
    this.animateCameraTo = function(coords, config, callback) {
        var distance = geomath.calculateDistance(self.map.getCenter(), coords);
        var bearing = geomath.calculateBearing(self.map.getCenter(), coords);
        var distance_step = distance / self.config.cameraAnimationSteps;
        var frames = [];
        for (var c = 0; c < self.config.cameraAnimationSteps; c++) {
            var obj = {};
            obj.coords = geomath.projectOut(self.map.getCenter(), distance_step * c, bearing+180);
            frames.push(obj);
        }
        /* ditch the zooming for now - on the type of map I'm using it doesn't go further
            for (var c = 0; c < self.config.cameraAnimationSteps; c++) {
            var obj = {};
            if (config.animation = "arc") {
                obj.zoom = parseInt(self.map.getZoom() + (self.config.closeUpZoom - self.map.getZoom()) * Math.sin(c / self.config.cameraAnimationSteps * Math.PI/2));
            }
            frames.push(obj);
        }*/
        if (config && config.returnToOriginal == true) {
            frames.push({ pause: 20 });
            frames = frames.concat(frames.slice(0).reverse());
        }

       frames.reverse();
       animation.start({ targetref: self.map, target: "camera", frames: frames },
            self._onAnimationFrame, callback);
    }

    /**
     * animate marker to a position based on distance and angle
     * @param ref
     * @param distance
     * @param angle
     */
    this.animateMarkerBy = function(ref, distance, angle, config, callback) {
        var distance_step = distance / self.config.animationSteps;
        var frames = [];
        var animSteps = self.config.animationSteps;
        if (config.duration) {
            animSteps *= config.duration;
        }
        for (var c = 0; c < animSteps; c++) {
            var obj = {};
            obj.coords = geomath.projectOut(ref.coords, distance_step * c, angle-90);
            if (config.animation == "arc") {
                obj.size = ref.marker.icon.size.width * Math.sin(c / animSteps * Math.PI) + ref.marker.icon.size.width
            }
            frames.push(obj);
        }
        frames.reverse();
        animation.start({ targetref: ref, target: "marker", frames: frames },
            self._onAnimationFrame, callback);
    }

    /**
     * move marker to coordinates
     * @param ref
     * @param coords
     */
    this.moveMarkerTo = function(ref, coords) {
        ref.marker.setPosition(new google.maps.LatLng(coords.latitude, coords.longitude));
        ref.coords = coords;
    }

    /**
     * move marker by a specific distance at a specific angle
     * @param ref
     * @param distance
     * @param angle
     */
    this.moveMarkerBy = function(ref, distance, angle) {
        var moveto = geomath.projectOut(ref.coords, distance, angle);
        this.moveMarkerTo(ref, moveto);
    }

    /**
     * create the map
     * @param map ID (in DOM)
     * @param center
     * @returns {Function|map|*|exports.minify.map|optionTypes.map|SourceNode.toStringWithSourceMap.map}
     */
    this.create = function(mID, center) {
        var ll;
        if (center) {
            ll = new google.maps.LatLng(center.coords.latitude, center.coords.longitude);

        } else {
            ll = new google.maps.LatLng(geotracking.geo.coords.latitude, geotracking.geo.coords.longitude);
            
        }

        self.config.google.center = ll;
        
        self.map = self.config.google;

        
console.log("map built");
        return self.map;
    }

    this.subscribeGeoTracking = function(geo){
        geotracking.subscribe(function(geo) {
            self.map.setCenter(new google.maps.LatLng(geo.coords.latitude, geo.coords.longitude));
        });
    }

    /**
     * animation frame callback
     * @param target
     * @param targetref
     * @param frame
     * @private
     */
    this._onAnimationFrame = function(target, targetref, f) {
        switch (target) {
            case "marker":
                if (f.size) {
                    targetref.marker.icon.scaledSize = new google.maps.Size(f.size, f.size);
                    targetref.marker.icon.size = new google.maps.Size(f.size, f.size);
                }
                self.moveMarkerTo(targetref, f.coords);
                break;

            case "camera":
                if (f.zoom && f.zoom != self.lastZoom) {
                    self.lastZoom = f.zoom;
                    targetref.setZoom(f.zoom);
                }

                if (f.coords) {
                    targetref.panTo( new google.maps.LatLng(f.coords.latitude, f.coords.longitude) );
                }
                break;
        }
    }

    /**
     * make a marker
     * @param type
     * @private
     */
    this._markerFactory = function(type, coords) {
        var latlng;
        if (coords) {
            latlng = new google.maps.LatLng(coords.latitude, coords.longitude);
        }
        switch (type) {
            case "userMarker":
                return new google.maps.Marker({
                    map: self.map,
                    position: latlng
                    
                });

            case "ball":
                return new google.maps.Marker({
                    map: self.map,
                    position: latlng,
                    zIndex: 1,
                    icon: new google.maps.MarkerImage(
                        'images/golf-ball.png',
                        new google.maps.Size(15, 15),
                        new google.maps.Point(0, 0),
                        new google.maps.Point(Math.floor(15/2), Math.floor(15/2)),
                        new google.maps.Size(15, 15)
                    ),
                });

            case "dot":
                return new google.maps.Marker({
                    map: self.map,
                    position: latlng,
                    icon: new google.maps.MarkerImage(
                        'images/dot.png',
                        new google.maps.Size(16, 16),
                        new google.maps.Point(0, 0),
                        new google.maps.Point(Math.floor(16/2), Math.floor(16/2)),
                        new google.maps.Size(16, 16)
                    )
                });

            default:
                return new google.maps.Marker({
                    position: latlng,
                    map: self.map
                });

        }
    }
});;angular.module('cordova').service('mapping2', function($http, geotracking) {
    var self = this;

    self.model = {};
    self.map = {};
    self.markers = {};
    self.polygons = {};

    this.config = {
        google: {
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.SATELLITE
            
        },
        animationSteps: 50,
        closeUpZoom: 20,
        cameraAnimationSteps: 100
    };

  self.newLatLng = function(lat, lng) {
    
    if (_.isArray(lat)) {
      lng = lat[1];
      lat = lat[0];
    }
    return new google.maps.LatLng(lat, lng);
  };

   self.coordsToLatLngs = function(coords) {
      return _.map(coords, self.newLatLng);
    };

      self.render_polygon = function(geomType, item) {
      // console.log('GeometryRenderer: render_polygon');
      var latLngs = self.coordsToLatLngs(item.coords);
      

       if(!(item.name in self.polygons)){
        	
      self.polygons[item.name]  = new google.maps.Polygon({
        paths: latLngs,
        map: self.map,
        strokeColor: geomType.strokeColor,
        strokeOpacity: geomType.strokeOpacity,
        strokeWeight: geomType.strokeWeight,
        fillColor: geomType.fillColor,
        fillOpacity: geomType.fillOpacity,
        zIndex: 5
      });

      // Fulfill anchor interface for infoWindows
      //polygon.set('position', GoogleMapsWrapper.newLatLng(item.coords[0]));

      // console.log('render_polygon:', polygon);
      return self.polygons[item.name] ;
  }
    };

     this.removePolygon = function(name) {
        console.log(self.polygons);
        for (var c in self.polygons) {
            if (c == name) {
                
                self.polygons[c].setMap(null);
                delete self.polygons[c];
            }
        }
        
    }

    /**
     * create the map
     * @param map ID (in DOM)
     * @param center
     * @returns {Function|map|*|exports.minify.map|optionTypes.map|SourceNode.toStringWithSourceMap.map}
     */
    this.create = function(mID, center) {
        var ll;
        if (center) {
            ll = new google.maps.LatLng(center.coords.latitude, center.coords.longitude);

        } else {
            ll = new google.maps.LatLng(geotracking.geo.coords.latitude, geotracking.geo.coords.longitude);
            
        }

        self.config.google.center = ll;
        
        self.map = self.config.google;

        
		console.log("map built");
        return self.map;
    }

        /**
     * add a marker
     * @param type
     * @param name
     * @param coords
     */
    this.addMarker = function(type, name, coords) {
        if(!(name in self.markers)){
        	self.markers[name] = self._markerFactory(type, coords);
        	
        	return { marker: self.markers[name], coords: coords};
    	}
    }

    this.getMarkers  = function(){
    	return self.markers;
    }
    this.getMarker  = function(name){
    	
    	return self.markers[name];
    }

    /**
     * remove marker
     * @param ref
     */
    this.removeMarker = function(name) {
    	console.log(self.markers);
        for (var c in self.markers) {
            if (c == name) {
                
                self.markers[c].setMap(null);
                delete self.markers[c];
            }
        }
        
    }

     this.moveMarkerTo = function(ref, coords) {
        ref.marker.setPosition(new google.maps.LatLng(coords.latitude, coords.longitude));
        ref.coords = coords;
    }



     /**
     * make a marker
     * @param type
     * @private
     */
    this._markerFactory = function(type, latlng) {
        
        switch (type) {
            case "userMarker":
            
                return new google.maps.Marker({
                    map: self.map,
                    position: latlng,
                    animation: google.maps.Animation.DROP
                    
                });

            case "ball":
                return new google.maps.Marker({
                    map: self.map,
                    position: latlng,
                    zIndex: 1,
                    icon: new google.maps.MarkerImage(
                        'images/golf-ball.png',
                        new google.maps.Size(15, 15),
                        new google.maps.Point(0, 0),
                        new google.maps.Point(Math.floor(15/2), Math.floor(15/2)),
                        new google.maps.Size(15, 15)
                    ),
                });

            case "dot":
                return new google.maps.Marker({
                    map: self.map,
                    position: latlng,
                    icon: new google.maps.MarkerImage(
                        'images/dot.png',
                        new google.maps.Size(16, 16),
                        new google.maps.Point(0, 0),
                        new google.maps.Point(Math.floor(16/2), Math.floor(16/2)),
                        new google.maps.Size(16, 16)
                    )
                });

            default:
                return new google.maps.Marker({
                    position: latlng,
                    map: self.map
                });

        }
    }

    


});angular.module('cordova').service('orientation', function() {
    var self = this;

    this.config = {
        frequency: 100
    };

    /** is device orientation available ? */
    this.available = window.DeviceOrientationEvent ? true : false;

    /** orientation listeners */
    this.listeners = [];

    /** acceleration */
    this.acceleration = {};

    /**
     * c-tor
     */
    this.init = function() {
        document.addEventListener("deviceready", self.onDeviceReady, false)
    }

    /**
     * phonegap device ready listener
     */
    this.onDeviceReady = function() {
        self.available = window.DeviceOrientationEvent ? true : false;
    }

    /**
     * get one time orientation
     * @param callback
     */
    this.getCurrent = function(callback) {
        if (!self.available) { return false; }
    }

    /**
     * start tracking
     * @param callback for orientation update
     * @param optional config to override default
     *
     */
    this.start = function(config) {
        if (!self.available) { return false; }
        self.config = config;
        window.addEventListener('deviceorientation', self.updated);
    };

    /**
     * stop watching orientation
     */
    this.stop = function() {
        if (!self.available) { return false; }
        window.removeEventListener('deviceorientation', self.updated);
    }

    /**
     * subscribe to orientation service
     * @param callback
     */
    this.subscribe = function(callback) {
        self.listeners.push(callback);
    }

    /**
     * remove all the listeners
     */
    this.removeAllListeners = function() {
        self.listeners = [];
    }

    /**
     * update orientation
     * @param orientation
     */
    this.updated = function(o) {
        self.orientation = o;
        self.listeners.forEach( function(l) {
            l.apply(this, [o]);
        });
    }

    this.init();
});;'use strict';
angularApp.controller('MapCtrl', function MapCtrl($scope,cordovaReady, geotracking, mapping2, geometry, MapWidget) {

    /**
     * init controller
     */
    $scope.init = function() {
      

       

    }



    
   // cordovaReady($scope.init());
    //$scope.init();
  });


angularApp.controller('GMapCtrl',
    function GMapCtrl($scope, mapping2, geotracking, $rootScope) {
        
        /*
        $scope.gmap = {
            fromAddress: 'Calgary',
            streetAddress: "5111 47 St NE  Calgary, AB T3J 3R2",
            businessWriteup: "<b>Calgary Police Service</b><br/>Calgary's Finest<br/>",
            businessTitle: "Calgary Police Service",
            Lon: -113.970889,
            Lat: 51.098945,
            showError: function (status) {
                toastr.error(status);
            }
        };
        */



        geotracking.getCurrent( function(geo) {
            
            console.log("building map");
       var mapConfig = mapping2.create("map-canvas", geo);
       $scope.gmap = mapConfig;
             //$scope.$apply();
              $rootScope.$broadcast('test', mapConfig);
        });
    });

