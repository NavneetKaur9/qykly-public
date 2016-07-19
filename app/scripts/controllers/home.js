'use strict';
/**
 * 
 */
angular.module('sbAdminApp').controller('homeCtrl', function($scope, $http, api, $sce) {

	var url = api.addr();
	$scope.alert = '<img src="assets/images/ajax-loader.gif"/>' + ' loading.........';
	$scope.alerts = $sce.trustAsHtml($scope.alert);


	$scope.closeAlert = function(argument) {
		$scope.alert = 'server error';
		$scope.alerts = $sce.trustAsHtml($scope.alert);

	};

});