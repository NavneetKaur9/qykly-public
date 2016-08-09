'use strict';
/**
 * 
 */
angular.module('sbAdminApp').controller('homeCtrl', function($scope, $http, api, $window, $cookieStore) {

    api.get('get-category', false, false, false, function(err, response) {
        if (err) {
            $scope.alert = response.message;
        } else {
            $scope.categories = response.category;
        }
    });

    $scope.getMerchants = function() {
        $scope.showLoader1=true;
        api.get('get-merchants', false, false, {
            category: $scope.category
        }, function(err, response) {
            if (err) {
                $scope.alert = response.message;
            } else {
                $scope.showLoader1=false;
                $scope.merchantName = response.merchantname;
            }
        });
    };
    $scope.getUserCount = function(merchant) {
        $scope.showLoader2=true;

        var merchants = [];
        var checkboxes = document.getElementsByName('merchantCheckbox');
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                var value = checkboxes[i].value;
                merchants.push(value);
            }
        }
        var dt1=($scope.dt1).getTime();
        var dt2=($scope.dt2).getTime();


        console.log(dt1,dt2);
        api.post('get-user-count', false, false, {
            category: $scope.category,
            merchant: merchants,
            range: [$scope.start, $scope.end],
            date: [dt1, dt2]

        }, function(err, response) {
            if (err) {
                $scope.alert = response.message;
            } else {
                $scope.users = response.result;
                $scope.showLoader2=false;
                
            }
        });
    };

    //date
   $scope.dt2=new Date();  

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

    // var tomorrow = new Date();
    // tomorrow.setDate(tomorrow.getDate() + 1);
    // var afterTomorrow = new Date();
    // afterTomorrow.setDate(tomorrow.getDate() + 1);
    // $scope.events = [{
    //     date: tomorrow,
    //     status: 'full'
    // }, {
    //     date: afterTomorrow,
    //     status: 'partially'
    // }];

    // function getDayClass(data) {
    //     var date = data.date,
    //         mode = data.mode;
    //     if (mode === 'day') {
    //         var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

    //         for (var i = 0; i < $scope.events.length; i++) {
    //             var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

    //             if (dayToCheck === currentDay) {
    //                 return $scope.events[i].status;
    //             }
    //         }
    //     }

    //     return '';
    // }
    //date

});
