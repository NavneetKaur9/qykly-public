'use strict';
/**
 * 
 */
angular.module('sbAdminApp').controller('shortcodesCtrl', function($scope, $http, api) {
	var url = 'http://localhost:3000/mod-api/';
	$scope.searchCode = '';

	api.get('new-codes', false, false, false, function(err, response) {
		$scope.newcodes = response;
		console.log(response);

	});
	$scope.shortcode = function() {
		api.get('short-code', false, false, {
			sender: $scope.searchCode
		}, function(err, response) {
			$scope.ShortcodeSummary = response;
		})
	};
});