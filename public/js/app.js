// Routes for the single page application

var env = {};

if(window){  
  Object.assign(env, window.__env);
}

var randomNumbers = angular.module('randomNumbers', ['ngRoute', 'ngAnimate', 'uiSwitch'])

    .config(function ($routeProvider, $httpProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'bitmap.html',
    }).
    when('/home', {
        templateUrl: 'bitmap.html',
        controller: 'mainAppController'
    }).
    when('/bitmap', {
        templateUrl: 'bitmap.html',
        controller: 'mainAppController'
    }).
    otherwise({
        templateUrl: 'notfound.html',
        controller: 'notFoundController'
    });

});

randomNumbers.constant('__env',__env);