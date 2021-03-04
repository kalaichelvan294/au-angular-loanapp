'use strict';

/**
 * @ngdoc overview
 * @name loanappApp
 * @description
 * # loanappApp
 *
 * Main module of the application.
 */
angular
  .module('loanappApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ui.router'
  ])
  .run(function($state, $rootScope, $timeout){
    
    console.log('running');
    // Change before prod - kn
    $rootScope.loggedIn = false;
    // $rootScope.currentUser = "null";

    $rootScope.message = "";
    $rootScope.messageVisiblity = false;
    
    $rootScope.displayMessage = function(text){
      $rootScope.message = text;
      $rootScope.messageVisiblity = true;
      $timeout((()=>{
        $rootScope.message = "";
        $rootScope.messageVisiblity = false;
      }), 3000);
    }

    $rootScope.$on('$stateChangeError',function(err){
        $rootScope.displayMessage("UnAuthorized Access, Redirecting to Home!!!");
        $state.go('login');
    });

    $rootScope.$on('showUser', function () {
      $state.go('user');
    });
    $rootScope.$on('showManager', function () {
      $state.go('manager');
    });
    $rootScope.$on('showLogin', function () {
        $state.go('login');
    });

  })
  .config(['$qProvider','$locationProvider', '$routeProvider', '$stateProvider', '$urlRouterProvider',function ( $qProvider, $locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
    $qProvider.errorOnUnhandledRejections(false);
    $locationProvider.hashPrefix('');
    $stateProvider
      .state('login', {
        url : '/login',
        templateUrl : 'views/login.html',
        controller : 'LoginCtrl'
      })
      .state('user', {
        url : '/user',
        templateUrl : 'views/user.html',
        controller : 'UserCtrl',
        resolve: { isValidUser : function(loginService){
            console.log('checking authentication');
            return loginService.isAuthenticated("user");
          }
        }
      })
      .state('manager', {
        url : '/manager',
        templateUrl : 'views/manager.html',
        controller : 'ManagerCtrl',
        resolve: { isValidUser : function(loginService){
            console.log('checking authentication');
            return loginService.isAuthenticated("manager");
          }
        }
      });
      $urlRouterProvider.otherwise('/login');

  }]);
