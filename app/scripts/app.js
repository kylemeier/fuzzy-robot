//Assign to a variable for reference in controllers/services
var app = angular.module('fuzzyRobotApp', 
  ['ngRoute']);

//Set up routing
app.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .when('/account', {
      templateUrl: 'views/account.html',
      controller: 'AccountCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

  //Add an interceptor to view requests/responses before they're received by the app or the server
  $httpProvider.interceptors.push('Auth');
});

//Immediately redirect to account page if user has a token
app.run(function($window, $location){
  if($window.localStorage.token){
    $location.path('/account');
  }
});