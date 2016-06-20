'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:
 * @description
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp').controller('userDetailCtrl', function($scope, $position, $location, $http, $stateParams) {


	var userId = $stateParams.userId;


	if (!$stateParams.userId) {
		$scope.alerts = [{
			msg: 'userId is missing',
			type: 'error'
		}];
	}

	$http.get('api/userdetail/' + $stateParams.id).then(function(response) {
		$scope.user = response.data.data;
		// $scope.UserCodes = response.data.data.UserCodes;
		// $scope.Unknown = response.data.data.Unknown;
		// $scope.BlackListed = response.data.data.BlackListed;
		$scope.userDeviceInfo = response.data.data.DeviceInfo[0];
		// $scope.user.UserCodes.sort();
		// $scope.user.Unknown.sort();
		// $scope.user.BlackListed.sort();
	}, function(response) {
		$scope.alerts = [{
			msg: response.data.userMessage || 'Server error! Are you connected to the internet?.',
			type: 'error'
		}];
	});

	$http.get('api/findblacklistedshortcodes/' + userId).then(function(response) {
		$scope.BlackListed = response.data.data.blacklisted;

	}, function(response) {
		$scope.alerts = [{
			msg: response.data.userMessage || 'Server error! Are you connected to the internet?.',
			type: 'error'
		}];
	});

	$http.get('api/findunprocessedshortcodes/' + userId).then(function(response) {
		$scope.Unknown = response.data.data.unprocessed;

	}, function(response) {
		$scope.alerts = [{
			msg: response.data.userMessage || 'Server error! Are you connected to the internet?.',
			type: 'error'
		}];
	});
	$http.get('api/findprocessedshortcodes/' + userId).then(function(response) {
		$scope.UserCodes = response.data.data.processed;

	}, function(response) {
		$scope.alerts = [{
			msg: response.data.userMessage || 'Server error! Are you connected to the internet?.',
			type: 'error'
		}];
	});
	// $http.post('api/userdetailshortcode', {
	// 	UserId: userId,
	// }).then(function(response) {
	// // $scope.UserCodes = response.data.data.processed;
	// // $scope.Unknown = response.data.data.unprocessed;
	// // $scope.BlackListed = response.data.data.blacklisted;
	// }, function(response) {
	// 	$scope.alerts = [{
	// 		msg: response.data.userMessage || 'Server error! Are you connected to the internet?.',
	// 		type: 'error'
	// 	}];
	// });
	$scope.getProcessed = function(code) {
		$http.post('api/userprocessed', {
			UserId: userId,
			Sender: code
		}).then(function(response) {
			$scope.show = true;
			$scope.Code = 'Sms code :' + code;
			$scope.messages = response.data.data;
		}, function(response) {
			$scope.alerts = [{
				msg: response.data.userMessage || 'Server error! Are you connected to the internet?.',
				type: 'error'
			}];
		});
	};
	$scope.getunProcessed = function(code) {
		$http.post('api/userunprocessed', {
			UserId: userId,
			Sender: code
		}).then(function(response) {
			$scope.show = true;
			$scope.Code = 'Sms code: ' + code;
			$scope.messages = response.data.data;
		}, function(response) {
			$scope.alerts = [{
				msg: response.data.userMessage || 'Server error! Are you connected to the internet?.',
				type: 'error'
			}];
		});
	};
	$scope.show = true;
	$scope.showBlacklisted = function() {
		$scope.show = false;
	};

	$scope.selectAllToBlacklist = function() {

		$scope.checkbox = true;

		var checkboxes = document.getElementsByName('blockme');
		if (!$scope.bulkCode) {
			for (var i = 0; i < checkboxes.length; i++) {
				checkboxes[i].checked = true;
			}
		} else {
			for (var j = 0; j < checkboxes.length; j++) {
				checkboxes[j].checked = false;
			}
		}
	};

	$scope.blacklistTest = function() {
		var arr = [];
		var checkboxes = document.getElementsByName('blockme');
		for (var i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i].checked) {
				arr.push(checkboxes[i].value);
			}
		}
		console.log(arr);
		$http.post('api/flag/mod', {
			smsCode: arr,
		}).then(function(response) {
			$scope.smsUnprocess = [];
			$scope.alerts = [{
				msg: response.data.userMessage,
				type: 'error'
			}];
			$scope.length = $scope.length - arr.length;
			angular.forEach(arr, function(value, key) {
				var index = $scope.codeIndex(value);
				$scope.shortCodeList.splice(index, 1);
			});
			$scope.checkbox = false;
		}, function(response) {
			$scope.alerts = [{
				msg: response.data.userMessage || 'Server error! Are you connected to the internet?.',
				type: 'error'
			}];
		});
	};
});