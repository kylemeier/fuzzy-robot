app.controller('LoginCtrl', ['$scope', '$http', '$window', '$location',
	function ($scope, $http, $window, $location) {

		$scope.user = {username: null, password: null};
		$scope.message = '';

		//Login function
	  $scope.auth = function(){
	  	$http
	  		.post('http://ec2-54-204-155-167.compute-1.amazonaws.com/api/auth-token/', $scope.user)


	  		//If successful, store token and route to /account
	  		.success(function (data){
	  			$window.localStorage.token = data.token;
	  			$location.path('/account');
	  		})

	  		//If error'd, delete token and provide error messaging
	  		.error(function (error){
	  			delete $window.localStorage.token;

	  			if(error.username){
	  				$scope.message = 'Please enter a username.';

	  			}else if(error.password){
	  				$scope.message = 'Please enter a password.';

	  			}else{

	          for(first in error){
	            $scope.message = error[first][0];
	          }
	  			}

	  		});
	  	};
  }]);
