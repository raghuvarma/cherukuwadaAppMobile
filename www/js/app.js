// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('cherukuwadaApp', ['ionic', 'cherukuwadaApp.login', 'cherukuwadaApp.dashboard', 'ionic-material', 'ionMdInput', 'cherukuwadaApp.event', 'cherukuwadaApp.post', 'angularMoment'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common["X-Requested-With"];
$stateProvider
  .state('login', {
    url: '/login',
    views: {
      'main': {
        templateUrl: 'views/login.html',
        controller: 'loginCtrl'
      }
    }
  })
   .state('dashboard', {
    url: '/dashboard',
    views: {
      'main': {
        templateUrl: 'views/dashboard.html',
        controller: 'dashboardCtrl'
      }
    }
  })
   .state('event', {
    url: '/event',
    params: {'eventObject': null},
    views: {
      'main': {
        templateUrl: 'views/event.html',
        controller: 'eventCtrl'
      }
    }
  })
   .state('post', {
    url: '/post',
    params: {'postObject': null},
    views: {
      'main': {
        templateUrl: 'views/post.html',
        controller: 'postCtrl'
      }
    }
  })

  $urlRouterProvider.otherwise('login');
});