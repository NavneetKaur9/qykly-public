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
    $scope.appUsers=[];
    $scope.getTodaysUser = function() {
        $scope.showProcessing=true;
        api.get('todays-users', false, token, {
            page:page
        }, function(err, response) {
            if (!err) {
                $scope.appUsers.push(response.result);
                $scope.showProcessing=false;
            } else {
                $scope.alert = response.message;
            }
        });
    };
    // $scope.getTodaysUser();
    $scope.moreUsers=function () {
        page++;
        $scope.getTodaysUser();
    };
    var d = new Date();
    d.setHours(0, 0, 0, 0);
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
            $scope.showLoaderunProc = true;
            console.log('get codes00');
            api.get('get-unprocessedCodes-today', false, token, {
                start: $scope.unProc.start,
                search: $scope.unProc.searchCode,
                sortby: $scope.unProc.sortby,
                time:time
            }, function(err, response) {
                if (err || response.error) {
                    $scope.alert = response.userMessage || 'Server error! Are you connected to the internet?.';
                } else {
                    $scope.showLoaderunProc = false;
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
            $scope.showLoaderNew = true;
            api.get('get-newCodes-today', false, token, {
                start: $scope.new.start,
                search: $scope.new.searchCode,
                sortby: $scope.new.sortby,
                time:time
            }, function(err, response) {
                if (err || response.error) {
                    $scope.alert = response.userMessage || 'Server error! Are you connected to the internet?.';
                } else {
                    $scope.showLoaderNew = false;
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
            $scope.showLoaderProc = true;
            api.get('get-processedCodes-today', false, token, {
                start: $scope.proc.start,
                search: $scope.proc.searchCode,
                sortby: $scope.proc.sortby,
                time:time
            }, function(err, response) {
                if (err || response.error) {
                    $scope.alert = response.userMessage || 'Server error! Are you connected to the internet?.';
                } else {
                    $scope.showLoaderProc = false;
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

    /************** GET SMS ********************/
    $scope.start = 1;
    $scope.currentPage = 1;
    $scope.length = 10;
    $scope.itemsPerPage = 50;

    $scope.getSms = function(code, status, start, tab) {
        if (code !== $scope.code) {
            $scope.currentPage = 1;
        }
        console.log(tab);
        $scope.showLoaderMessages = true;
        $scope.loadingMsg = true;
        $scope.selected_all=false;
        $scope.code = code;
        api.get('get-messages-today', false, token, {
            address: code,
            status: status,
            start: start,
            length: 50,
            time:time
        }, function(err, response) {
            if (err || response.error) {
                $scope.alert = response.userMessage || 'Server error! Are you connected to the internet?.';
            } else {
                $scope.messages=response.data;

                // $scope.start = start;
                $scope.status = status;
                $scope.tab = tab;
                // if (tab === 'unProc') {
                //     $scope.unProc.messages = response.data;
                // } else if (tab === 'new') {
                //     $scope.new.messages = response.data;
                // } else if (tab === 'proc') {
                //     $scope.proc.messages = response.data;
                // } else if (tab === 'laterUse') {
                //     $scope.laterUse.messages = response.data;
                // }
                $scope.totalCount = response.totalCount;
                $scope.loadingMsg = false;
                $scope.showLoaderMessages = false;
            }
        });
    };
    //***********pagination on change ************//
    $scope.pageChanged = function(newPage) {
        $scope.selected_all=false;
        console.log($scope.code,$scope.status,newPage);
        $scope.getSms($scope.code, $scope.status, newPage, $scope.tab);
    };



    $scope.assign = function() {
        $scope.msgText = [];
        var checkboxes = document.getElementsByName('assign');
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                var value = checkboxes[i].value;
                $scope.msgText.push(value);
            }
        }
        api.put('assign-msg', false, token, {
            msgText: $scope.msgText,
            assignTo: $scope.assignTo.name
        }, function(err, response) {
            if (err || response.error) {
                $scope.alert = response.message;
            } else {
                $scope.alert = response.message;
                $scope.getSms($scope.code, $scope.status, $scope.start, $scope.tab);

            }
        });
    };

    $scope.moveToDump = function() {
        $scope.msgText = [];
        var checkboxes = document.getElementsByName('assign');
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                var value = checkboxes[i].value;
                $scope.msgText.push(value);
            }
        }
        api.put('move-to-dumb', false, token, {
            msgText: $scope.msgText
        }, function(err, response) {
            if (err || response.error) {
                $scope.alert = response.message;
            } else {
                $scope.alert = response.message;
                //remove from list that msg
                $scope.getSms($scope.code, $scope.status, $scope.start, $scope.tab);
            }
        });

    };
    $scope.useLater = function() {
        $scope.addresses = [];
        var checkboxes = document.getElementsByName('blacklist');
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                var value = checkboxes[i].value;
                $scope.addresses.push(value);
            }
        }
        // var type=typeOf($scope.addresses);

        api.put('later-use', false, token, {
            shortcode: $scope.addresses
        }, function(err, response) {
            if (err || response.error) {
                $scope.alerts = [{
                    msg: response.userMessage || 'Server error! Are you connected to the internet?.',
                    type: 'error'
                }];
            } else {
                $scope.alert = response.message;
                $scope.new.messages = [];
                $scope.new.codes = [];
                $scope.new.getcodes();


            }
        });
    };
    $scope.blacklist = function() {
        $scope.addresses = [];
        var checkboxes = document.getElementsByName('blacklist');
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                var value = checkboxes[i].value;
                $scope.addresses.push(value);

            }
        }
        api.put('blacklist', false, token, {
            address: $scope.addresses
        }, function(err, response) {
            if (err || response.error) {
                $scope.alerts = [{
                    msg: response.userMessage || 'Server error! Are you connected to the internet?.',
                    type: 'error'
                }];
            } else {
                $scope.alert = response.message;
                $scope.new.messages = [];
                $scope.new.codes = [];
                $scope.new.getcodes();
                //remove shortcode from list of shortcodes
            }
        });
    };

});