'use strict';
/**
 * validate regex
 */

angular.module("sbAdminApp")
  .controller("validateRegexCtrl", function ($scope, $timeout,$location, $http, api) {
 	var url = api.addr();
    $scope.searchButtonText = "Search";
	$scope.btnBoolVal="false";
	$scope.search = function() {
		var senderCode = $scope.validate.senderCode;
		var req = {
                method: 'POST',
                url: url + 'validate',
                data: {
                    senderCode: senderCode,
                }
            }

        $http(req).then(
                function successCallback(response) {
                    console.log(response);
                },
                function errorCallback(response) {
                    console.log(response);
                });
	    $scope.btnBoolVal="true";
	    $scope.searchButtonText = "Searching";
	    $timeout(function(){
	        $scope.btnBoolVal="false";
	        $scope.searchButtonText = "Search";
	    },1000)
	    // Do your searching here
	}
});