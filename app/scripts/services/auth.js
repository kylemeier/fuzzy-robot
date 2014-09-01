//An HTTP request interceptor that views requests/responses before they hit the app or server
app.factory('Auth', ['$window', '$q', '$location',
	function($window, $q, $location){
  		return {
		    request: function (config) {
		    	console.log('request');
		    	console.log(config);

		      config.headers = config.headers || {};

		      //If a token exists, attach it to the header of all HTTP requests for authentication
		      if ($window.localStorage.token) {
		        config.headers.Authorization = 'JWT ' + $window.localStorage.token;
		      }
		      return config;
		    },

		    response: function (response) {

		      return response || $q.when(response);

		    },

		    //Handle non-successful responses
		    responseError: function(error){

		      //Kick user to login page if they're unauthorized
		      if (error.status === 401) {
		        $location.path('/');
		      }
		      return error || $q.when(error);
		    }
  		};
}]);