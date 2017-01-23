'use strict';
/*
 *
 */
angular.module('sbAdminApp').controller('processedAnalyticsCtrl', function($scope, $http, api, $cookieStore) {

    var url = api.addr();
    var token = $cookieStore.get('c2cCookie');

    $scope.alert = "";
    $scope.dealers = []; //declare an empty array
    $scope.pageno = 1; // initialize page no to 1
    $scope.total_count = 0;
    $scope.itemsPerPage = 10; //this could be a dynamic value from a drop down
    $scope.currentPage = 1;
    $scope.length = 10;

    $scope.incomeData = function(pageno) {
        $scope.alert = 'loading............';
        api.post('get-income-details/' + $scope.itemsPerPage + "/" + pageno, false, token, {}, function(err, response) {
            if (err) {
                $scope.alert = response.message;
            }
            $scope.dealers = response.data;
            $scope.total_count = response.total_count;
            $scope.currentPage = pageno;
            $scope.alert = false;
        });
        $scope.pageno = pageno;
    };
    $scope.incomeData($scope.pageno);
    $scope.pageChanged = function(newPage) {
        $scope.incomeData(newPage);
    };

    self.expandAll = function(expanded) {
        // $scope is required here, hence the injection above, even though we're using "controller as" syntax
        $scope.$broadcast('onExpandAll', { expanded: expanded });
    };

    $scope.test = function(expanded, index) {
        console.log('expanded', expanded);
        $scope.dayDataCollapse = [];
        for (var i = 0; i < $scope.dealers.length; i += 1) {
            if (expanded && i == index) {
                console.log('if satisfy condition');
                $scope.expanded = false;
                $scope.dayDataCollapse.push(true);
            } else if (!expanded && i == index) {
                console.log('satisfy condition');
                $scope.dayDataCollapse.push(false);
            } else {
                $scope.dayDataCollapse.push(false);
            }
        }
        console.log('bool', $scope.dayDataCollapse);
    }



}).directive('expand', function() {
    return {
        restrict: 'A',
        controller: ['$scope', function($scope) {
            $scope.$on('onExpandAll', function(event, args) {
                $scope.expanded = args.expanded;
            });
        }]
    };
});