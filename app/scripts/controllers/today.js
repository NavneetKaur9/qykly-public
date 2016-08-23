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
var page=0;
    $scope.getTodaysUser = function() {

        $scope.showProcessing=true;
        api.get('user-shortcode-count', false, token, {
            page:page
        }, function(err, response) {
            if (!err) {
                $scope.appUsers = response.result;

                $scope.showProcessing=false;
            } else {
                $scope.alert = response.message;
            }
        });
    };
    $scope.getTodaysUser();
    $scope.moreUsers=function () {
        page++;
        $scope.getTodaysUser();
    };
    var d = new Date();
    d.setHours(0, 0, 0, 0);
    console.log(+d);
    var time=+d;

    /*************************************************
     START :    UNPROCESSESD
     *************************************************/
    $scope.unProc = {
        codes: [],
        start: 0,
        sortby: 'count',
        searchCode: '',
        getcodes: function() {
            $scope.showLoader = true;
            console.log('get codes00');
            api.get('get-unprocessedCodes', false, token, {
                start: $scope.unProc.start,
                search: $scope.unProc.searchCode,
                sortby: $scope.unProc.sortby,
                time:time
            }, function(err, response) {
                if (err || response.error) {
                    $scope.alert = response.userMessage || 'Server error! Are you connected to the internet?.';
                } else {
                    $scope.showLoader = false;
                    $scope.unProc.codes = $scope.unProc.codes.concat(response);
                }
            });
        },
        search: function() {
            $scope.unProc.codes = [];
            $scope.unProc.start = 0;
            $scope.unProc.getcodes();
        },
        showMore: function() {
            $scope.unProc.start++;
            $scope.unProc.getcodes();
        },
        sort: function() {
            $scope.unProc.codes = [];
            $scope.unProc.sortby = $scope.unProc.sortby;
            $scope.unProc.start = 0;
            $scope.unProc.getcodes();
        }
    };

    $scope.unProc.getcodes();

    /*************************************************
     START :    NEWCODES
     *************************************************/
    $scope.new = {
        codes: [],
        start: 0,
        sortby: 'count',
        searchCode: '',
        getcodes: function() {
            $scope.showLoader = true;
            api.get('get-newCodes', false, token, {
                start: $scope.new.start,
                search: $scope.new.searchCode,
                sortby: $scope.new.sortby,
                time:time
            }, function(err, response) {
                if (err || response.error) {
                    $scope.alert = response.userMessage || 'Server error! Are you connected to the internet?.';
                } else {
                    $scope.showLoader = false;
                    $scope.new.codes = $scope.new.codes.concat(response);
                }
            });
        },
        search: function() {
            $scope.new.codes = [];
            $scope.new.start = 0;
            $scope.new.getcodes();
        },
        showMore: function() {
            $scope.new.start++;
            $scope.new.getcodes();
        },
        sort: function() {
            $scope.new.codes = [];
            $scope.new.sortby = $scope.new.sortby;
            $scope.new.start = 0;
            $scope.new.getcodes();
        }
    };
    $scope.new.getcodes();
    /*************************************************
     START :    PROCESSED
     *************************************************/
    $scope.proc = {
        codes: [],
        start: 0,
        sortby: 'count',
        searchCode: '',
        getcodes: function() {
            $scope.showLoader = true;
            api.get('get-processedCodes', false, token, {
                start: $scope.proc.start,
                search: $scope.proc.searchCode,
                sortby: $scope.proc.sortby,
                time:time
            }, function(err, response) {
                if (err || response.error) {
                    $scope.alert = response.userMessage || 'Server error! Are you connected to the internet?.';
                } else {
                    $scope.showLoader = false;
                    $scope.proc.codes = $scope.proc.codes.concat(response);
                }
            });
        },
        search: function() {
            $scope.proc.codes = [];
            $scope.proc.start = 0;
            $scope.proc.getcodes();
        },
        showMore: function() {
            $scope.proc.start++;
            $scope.proc.getcodes();
        },
        sort: function() {
            $scope.proc.codes = [];
            $scope.proc.sortby = $scope.proc.sortby;
            $scope.proc.start = 0;
            $scope.proc.getcodes();
        }
    };
    $scope.proc.getcodes();

    /*************************************************
     START :    LATER USE
     *************************************************/
});