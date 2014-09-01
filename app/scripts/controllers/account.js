app.controller('AccountCtrl', ['$scope', '$http', '$window', '$location', '$timeout',
	function ($scope, $http, $window, $location, $timeout) {

    var token = $window.localStorage.token;

    //Attempt to grab user data upon page load
    (function(){
			$http
				.get('http://ec2-54-204-155-167.compute-1.amazonaws.com/api/users/') 
				
        //If successful, tie user data object to $scope.user
				.success(function(data){
					$scope.user = data[0];
				})

		})();

    //Attempt to update user info
		$scope.updateInfo = function(){
      $scope.message = '';
			$http
				.put('http://ec2-54-204-155-167.compute-1.amazonaws.com/api/users/'+$scope.user.id+'/', $scope.user)

        //If successful, message user success message
				.success(function(){
          $scope.message = 'Information saved successfully!';
				})

        //If error'd, show error message to user
				.error(function(error){

          for(first in error){
            $scope.message = error[first][0];
          }

				});
		};

    //Delete token and kick user back to login page upon logout
		$scope.logout = function(){
			delete $window.localStorage.token;
			$location.path('/');
		};
}]);
