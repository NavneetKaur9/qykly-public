'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:
 * @description
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp').controller('userDetailCtrl', function ($scope, $http, $stateParams, api, DTOptionsBuilder, DTColumnBuilder, $filter, $window, $cookieStore) {
    var id = $stateParams.id;
    var url = api.addr();
    var token = $cookieStore.get('c2cCookie');
    $window.scrollTo(0, 0);
    $scope.code = {};
    $scope.sms = {};
    function getUser() {
        // body...
        api.get('get-user', id, token, false, function (err, response) {
            if (err) {
                $scope.alert = response.message;
            } else {
                $scope.userData = response.userdata;
            }
        });
    };
    function getUserCount() {
        api.get('user-shortcode-count', false, token, {id: id}, function (err, response) {
            if (err) {
                $scope.alert = response.message;
            } else {
                $scope.count1 = response.unprocessed;
                $scope.count2=response.new;
                $scope.count3=response.processed;
                $scope.count=true;
            }
        });
    };
    getUserCount();
    function getShortcode(codeType) {
        $scope.showLoader=true;
        // $scope.alert = '  loading ' + codeType + ' Shortcodes.........';
        api.get('get-users-shortcode', false, token, {
            get_code_typ: codeType,
            id: id
        }, function (err, response) {
            if (err) {
                $scope.alert = response.message;
            } else {
                // $scope.alert = false;
                $scope.showLoader=false;
                if (codeType === 'new') {
                    $scope.new = response;
                }
                else if (codeType === 'proc') {
                    $scope.proc = response;
                }
                else {
                    $scope.unproc = response;
                }
            }
        });
    };
    getShortcode('unproc');
    $scope.checkArray = [];
    $scope.check = function (value) {
        var index = $scope.checkArray.indexOf(value);
        if ((index === -1) && (value === 'new')) {
            getShortcode('new');
            $scope.checkArray.push(value);
        } else if ((index === -1) && (value === 'proc')) {
            getShortcode('proc');
            $scope.checkArray.push(value);
        }
    };

    function countStatus() {
        api.get('get-sms-count-status', id, token, false, function (err, response) {
            if (err) {
                $scope.alert = response.message;
            } else {
                // $scope.statusCount = response;
                for (var i = 0; i < response.length; i++) {
                    if (response[i].status === 0) {
                        $scope.unproCount = response[i].count;
                    } else if (response[i].status === 3) {
                        $scope.proCount = response[i].count;
                    }
                }
                getUser();
            }
        });
    };

    function countShortcode() {

        api.get('get-shortcode', id, token, false, function (err, response) {
            if (err) {
                $scope.alert = response.message;
            } else {

                console.log(response);
            }
        });
    }

    // countShortcode();
    countStatus();
    $scope.getSms = function (code, status, codeType) {
        $scope.selected_all=false;

        $scope.alert = 'fetching ' + code + ' messages....';
        $scope.code = code;
        api.get('get-sms/' + id + '/' + status + '/' + code, false, token, false, function (err, response) {
            if (err) {
                $scope.alert = response.message;
            } else {
                $scope.alert = false;

                if (codeType === 'new') {
                    $scope.code_new = code;
                    $scope.sms_new = response;
                }
                else if (codeType === 'proc') {
                    $scope.code_proc = code;
                    $scope.sms_proc = response;
                }
                else if (codeType === 'unproc') {
                    $scope.code_unproc = code;
                    $scope.sms_unproc = response;
                }
            }
        });
    };
    $scope.blacklist = function () {
        var addresses = [];
        var checkboxes = document.getElementsByName('blacklist');
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                var value = checkboxes[i].value;
                addresses.push(value);
            }
        }
        api.put('blacklist', false, token, {
            address: addresses
        }, function (err, response) {
            if (err) {
                $scope.alert = response.message;
            } else {
                $scope.alert = response.message;
                $scope.sms.new = [];
                getShortcode('new');
                countStatus();
            }
        });
    };
    $scope.closeAlert = function () {
        $scope.alert = false;
    };
    $scope.sortType = 'saveTime';
    $scope.sortReverse = false;
    $scope.order = function (sortType) {
        $scope.sortReverse = ($scope.sortType === sortType) ? !$scope.sortReverse : false;
        $scope.sortType = sortType;
    };
    $scope.parseAllSms = function () {
        $scope.alert = '  processing.........';
        api.post('parsesms', false, token, {
            deviceId: id
        }, function (err, response) {
            if (err) {
                $scope.alert = response.message;
            } else if (response.output.length === 0) {
                return $scope.alert = "No data found";
            }
            $scope.parseSmsResult = response;
            $scope.alert = false;
        });
    };
    $scope.parseSms = function (code) {
        $scope.parseSmsResult = [];
        $scope.alert = 'processing.........';
        api.post('parsesmsbyshortcode', false, token, {
            shortcode: code
        }, function (err, response) {
            if (err) {
                $scope.alert = response.message;
            } else if (response.output.length === 0) {
                $scope.alert = "No data found";
            }
            $scope.parseSmsResult = response;
            $scope.alert = false;
        });
    };
    $scope.closeParseSmsResult = function (argument) {
        $scope.parseSmsResult = [];
    };
    $scope.assign = function (codeType) {
        var msgText = [];
        var checkboxes = document.getElementsByName('assign');
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                var value = checkboxes[i].value;
                msgText.push(value);
            }
        }
        api.put('assign-msg', false, token, {
            msgText: msgText,
            assignTo: $scope.assignTo.name
        }, function (err, response) {
            if (err || response.error) {
                $scope.alert = response.message;
            } else {
                $scope.alert = response.message;
                $scope.getSms($scope.code, 0, codeType);
            }
        });
    };
    // get mod users
    api.get('user', false, token, false, function (err, response) {
        if (err) {
            $scope.alert = response.message;
        } else {
            $scope.modusers = response;
        }
    });
    $scope.moveToDump = function () {
        var msgText = [];
        var checkboxes = document.getElementsByName('assign');
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                var value = checkboxes[i].value;
                msgText.push(value);
            }
        }

        api.put('move-to-dumb', false, token, {
            msgText: msgText
        }, function (err, response) {
            if (err || response.error) {
                $scope.alert = response.message;
            } else {
                $scope.alert = response.message;
                $scope.getSms($scope.code, 0, 'unproc');
            }
        });

    };
});