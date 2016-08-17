'use strict';
/*
 * merchant module
 */
angular.module('sbAdminApp',['angularUtils.directives.dirPagination']).controller('assignedMessagesCtrl', function($scope, $http,$compile, $filter, api, $window, $cookieStore) {
    var token = $cookieStore.get('c2cCookie');
    var url = api.addr();

    $scope.alert = "";
    $scope.assignedTexts = []; //declare an empty array
    $scope.pageno = 1; // initialize page no to 1
    $scope.total_count = 0;
    $scope.itemsPerPage = 100; //this could be a dynamic value from a drop down
    $scope.currentPage = 1;
    $scope.assignedMsgData = {};
    $scope.sortBy = 'saveTime';
    $scope.sortReverse = false;

    $scope.assignedTextsList = function(pageno) { // This would fetch the data on page change.
    var searchParams = angular.isUndefined($scope.searchStr) ? "" : $scope.searchStr;
    var req = {
        method: 'get',
        url: url + "get-all-assigned-messages/" + $scope.itemsPerPage + "/" + pageno,
        headers: {
            // Accept: "application/json",
            Authorization: $cookieStore.get('c2cCookie')
        },
        params: {
                         searchParams: searchParams,
                         sortBy:$scope.sortBy,
                         sortOrder:($scope.sortReverse) ? 1 : -1
                     }
    }
    $http(req).success(function(response) {
        $scope.assignedTexts = response.data; //ajax request to fetch data into vm.data
        $scope.total_count = response.total_count;
        $scope.currentPage = pageno;
    });
    $scope.pageno = pageno;
};

  $scope.assignedTextsList($scope.pageno); // Call the function to fetch initial data on page load.

    $scope.assignedMessagesCountByTheirStatus = function() {
     api.get('get-status-count-by-assigned-to', false, token, {
     }, function(err, response) {
         if (err) {
             $scope.alert = response.error
         } else {
                $scope.assignedMsgData = response.assigneeData;
         }
     });
    };

     $scope.assignedMessagesCountByTheirStatus(); 


    $scope.order = function(sortBy) {
        $scope.sortReverse = ($scope.sortBy === sortBy) ? !$scope.sortReverse : false;
        $scope.sortBy = sortBy;
        var searchParams = angular.isUndefined($scope.searchStr) ? "" : $scope.searchStr;
    var req = {
        method: 'get',
        url: url + "get-all-assigned-messages/" + $scope.itemsPerPage + "/" + $scope.pageno,
        headers: {
            // Accept: "application/json",
            Authorization: $cookieStore.get('c2cCookie')
        },
        params: {
                         searchParams: searchParams,
                         sortBy:$scope.sortBy,
                         sortOrder:($scope.sortReverse) ? 1 : -1
                     }
    }
    $http(req).success(function(response) {
        $scope.assignedTexts = response.data; //ajax request to fetch data into vm.data
        $scope.total_count = response.total_count;
        $scope.currentPage = $scope.pageno;
    });

    };
});