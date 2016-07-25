'use strict';
/**
 * 
 */
angular.module('sbAdminApp').controller('addUserCtrl', function($scope, $http, api, $cookieStore) {

	var url = api.addr();
	var token = $cookieStore.get('c2cCookie');

	function reset() {
		$scope.name = '';
		$scope.username = '';
		$scope.password = '';
	}
	$scope.getuser = function() {
		// body...
		api.get('user', false, token, false, function(err, response) {
			if (err) {
				$scope.alert = response.message;
			} else {
				// $scope.alert = response.message;
				$scope.modusers = response;
			}
		});
	};
	$scope.getuser();

	$scope.addUser = function(argument) {
		api.post('user', false, token, {
			name: $scope.name,
			username: $scope.username,
			password: $scope.password,
			role: $scope.role
		}, function(err, response) {
			if (err) {
				$scope.alert = response.message;
			}

			$scope.alert = response;
			reset();
			$scope.getuser();
		});
	};

	$scope.delete = function(id) {
		api.delete('user', id, token, false, function(err, response) {
			if (err) {
				$scope.alert = response.message;
			}
			$scope.getuser();
		});
	};

	$scope.closeAlert = function() {
		$scope.alert = false;
	};

});