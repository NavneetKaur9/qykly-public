'use strict';
/**
 *
 */
angular.module('sbAdminApp').controller('todayCtrl', function($scope, $http, api, $cookieStore) {

    var url = api.addr();
    var token = $cookieStore.get('c2cCookie');

    $scope.closeAlert = function() {
        $scope.alert = false;
    };

    $scope.getTodaysUser = function() {

        var dt1=($scope.dt1).getTime();
        var dt2=($scope.dt2).getTime();
        $scope.showLoader=true;
// $scope.appUsers=[];
        api.post('user-shortcode-count', false, token, {
            startTime:dt1,
            endTime:dt2
        }, function(err, response) {
            if (!err) {
                $scope.appUsers = response.result;

                $scope.showLoader=false;
            } else {
                $scope.alert = response.message;
            }
        });
    };

    // $scope.getTodaysUser();
    //date
    // $scope.dt1=new Date();
    $scope.dt2=new Date();
// $scope.getTodaysUser();
    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(),
        startingDay: 1
    };

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };

    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.popup1 = {
        opened: false
    };
    $scope.popup2 = {
        opened: false
    };

    //date

});