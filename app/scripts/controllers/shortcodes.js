'use strict';
/**
 * 
 */
angular.module('sbAdminApp').controller('shortcodesCtrl', function($scope, $http, api) {
	var url = api.addr();
	$scope.searchCode = '';

	// api.get('new-codes', false, false, false, function(err, response) {
	// 	$scope.newcodes = response;
	// 	// console.log(response);

	// });
	api.get('alltypes-shortcodes', false, false, false, function(err, response) {
		$scope.codes = response;
		// console.log(response);

	});
	$scope.shortcode = function() {
		api.get('short-code', false, false, {
			sender: $scope.searchCode
		}, function(err, response) {
			$scope.ShortcodeSummary = response;
		})
	};

});