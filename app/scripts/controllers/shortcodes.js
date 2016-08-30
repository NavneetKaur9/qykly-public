'use strict';
/**
 *  Shortcodes controller
 */
angular.module('sbAdminApp').controller('shortcodesCtrl', function($scope, $http, api, $cookieStore, $window, DTOptionsBuilder, DTColumnBuilder, $filter) {

    var url = api.addr();
    var token = $cookieStore.get('c2cCookie');
    $window.scrollTo(0, 0);

    $scope.checkArray = [];
    $scope.check = function(value) {

        var index = $scope.checkArray.indexOf(value);

        function reset() {
            $scope.currentPage = 1;
            $scope.unProc.messages = [];
            $scope.new.messages = [];
            $scope.proc.messages = [];
        }
        reset();
        if ((index === -1) && (value === 'new')) {

            $scope.new.getcodes();
            $scope.checkArray.push(value);
        } else if ((index === -1) && (value === 'proc')) {

            $scope.proc.getcodes();
            $scope.checkArray.push(value);
        } else if ((index === -1) && (value === 'laterUse')) {

            $scope.laterUse.getcodes();
            $scope.checkArray.push(value);

        }
    };



        // api.get('get-codeCount', false, token, {}, function(err, response) {
        //     if (err || response.error) {
        //         $scope.alert = response.userMessage || 'Server error! Are you connected to the internet?.';
        //     } else {
        //         $scope.count = response;
        //     }
        // });

    /*************************************************
               START :    UNPROCESSESD 
    *************************************************/
    $scope.unProc = {
        codes: [],
        start: 0,
        sortby: 'Time',
        searchCode: '',
        getcodes: function() {
            $scope.showLoader = true;
            console.log('get codes00');
            api.get('get-unprocessedCodes', false, token, {
                start: $scope.unProc.start,
                search: $scope.unProc.searchCode,
                sortby: $scope.unProc.sortby
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
        sortby: 'Time',
        searchCode: '',
        getcodes: function() {
            $scope.showLoader = true;
            api.get('get-newCodes', false, token, {
                start: $scope.new.start,
                search: $scope.new.searchCode,
                sortby: $scope.new.sortby
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
                sortby: $scope.proc.sortby
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
    /*************************************************
                    START :    LATER USE
    *************************************************/
    $scope.laterUse = {
        codes: [],
        start: 0,
        sortby: 'count',
        searchCode: '',
        getcodes: function() {
            $scope.showLoader = true;
            api.get('get-laterUseCodes', false, token, {
                start: $scope.laterUse.start,
                search: $scope.laterUse.searchCode,
                sortby: $scope.laterUse.sortby
            }, function(err, response) {
                if (err || response.error) {
                    $scope.alert = response.userMessage || 'Server error! Are you connected to the internet?.';
                } else {
                    $scope.showLoader = false;
                    $scope.laterUse.codes = $scope.laterUse.codes.concat(response);
                }
            });
        },
        search: function() {
            $scope.laterUse.codes = [];
            $scope.laterUse.start = 0;
            $scope.laterUse.getcodes();
        },
        showMore: function() {
            $scope.laterUse.start++;
            $scope.laterUse.getcodes();
        },
        sort: function() {
                $scope.laterUse.codes = [];
                $scope.laterUse.sortby = $scope.laterUse.sortby;
                $scope.laterUse.start = 0;
                $scope.laterUse.getcodes();
        }
    };

    /************** GET SMS ********************/
    $scope.start = 1;
    $scope.currentPage = 1;
    $scope.length = 10;
    $scope.itemsPerPage = 50;

    $scope.getSms = function(code, status, start, tab) {

        if (code !== $scope.code) {
            $scope.currentPage = 1;
        }
        $scope.alert = 'loading............';
        $scope.loadingMsg = true;
        api.get('get-messages', false, token, {
            address: code,
            status: status,
            start: start,
            length: 50
        }, function(err, response) {
            if (err || response.error) {
                $scope.alert = response.userMessage || 'Server error! Are you connected to the internet?.';
            } else {
                $scope.code = code;
                $scope.start = start;
                $scope.status = status;
                $scope.tab = tab;
                if (tab === 'unProc') {
                    $scope.unProc.messages = response.data;
                } else if (tab === 'new') {
                    $scope.new.messages = response.data;
                } else if (tab === 'proc') {
                    $scope.proc.messages = response.data;
                } else if (tab === 'laterUse') {
                    $scope.laterUse.messages = response.data;
                }
                $scope.totalCount = response.totalCount;
                $scope.loadingMsg = false;
                $scope.alert = false;
            }
        });
    };
    //***********pagination on change ************//
    $scope.pageChanged = function(newPage) {
        $scope.selected_all=false;
        $scope.getSms($scope.code, $scope.status, newPage, $scope.tab);
    };





    // ***************************** GET BLACKLIST  *********************//
    $scope.dtOptions = DTOptionsBuilder.newOptions().withOption('ajax', {
        url: url + 'get-blacklisteds',
        type: 'GET',
        data: function(aodata) {
            if (aodata.draw == "1") {
                aodata.order[0].column = "4";
                aodata.order[0].dir = 'desc';
            }
        }
    }).withDataProp('data').withOption('processing', true).withOption('serverSide', true).withLanguage({
        'sSearch': 'Search  Blacklisted Shortcode:',
        'oPaginate': {
            'sNext': '»',
            'sPrevious': '«'
        }
    }).withOption('headerCallback', function(header) {
        $window.scrollTo(0, 0);
    });
    $scope.dtColumns = [
        DTColumnBuilder.newColumn('_id').notVisible().withOption('searchable', false),
        DTColumnBuilder.newColumn(null).withTitle('# ').renderWith(function(data, type, full, meta) {
            return data = meta.settings._iDisplayStart + meta.row + 1;
        }).notSortable().withOption('searchable', false).withOption('width', '2%'),
        DTColumnBuilder.newColumn('Sender').withTitle('Sender '),
        DTColumnBuilder.newColumn('Status').withTitle('Status ').withOption('searchable', false),
        DTColumnBuilder.newColumn('saveTime').withTitle('DateModified      ').renderWith(function(data, type, full) {
            return $filter('date')(data, 'd/MM/yy,h:mma'); //date filter 
        }).withOption('searchable', false).withOption('width', '20%')
    ];
    // ***************************** GET BLACKLIST  *********************//



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

    $scope.closeAlert = function() {
        $scope.alert = false;
    };
    $scope.searchCode = '';
    $scope.searchShortcode = function() {
        api.get('Search-code', false, token, {
            address: $scope.searchCode
        }, function(err, response) {
            $scope.alert = response.message;
            $scope.searchResult = response.result;
        })
    };

    $scope.parseSms = function(code) {
        // $scope.alert = false;
        $scope.parseSmsResult = [];
        $scope.alert = 'processing.........';
        api.post('parsesmsbyshortcode', false, token, {
            shortcode: code
        }, function(err, response) {
            $scope.parseSmsResult = response;
            $scope.alert = false;
            $scope.getShortcode('0');
        });
    };
    $scope.closeParseSmsResult = function() {
        $scope.parseSmsResult = [];
    };


    // get mod users
    api.get('user', false, token, false, function(err, response) {
        if (err) {
            $scope.alert = response.message;
        } else {
            $scope.modusers = response;
        }
    });


    $scope.moveToDump = function() {
        $scope.selected_all=false;
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
                // test();
            }
        });

    };
    function test() {
       var index= $scope.unProc.codes.indexOf($scope.code);
        console.log('index',index,$scope.unProc.codes[index]);
        console.log('count before',$scope.unProc.codes[index].count);

        $scope.unProc.codes[index].count-=$scope.msgText.length;
        console.log('count after',$scope.unProc.codes[index].count);
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


   $scope.moveAllToDump=function () {
       if (confirm("Are you sure you want to move all the messages of "+$scope.code+" to Dump!!!") == true) {
           api.put('move-all-to-dump', false, token, {
               address: $scope.code
           }, function(err, response) {
               if (err || response.error) {
                   $scope.alerts = [{
                       msg: response.userMessage || 'Server error! Are you connected to the internet?.',
                       type: 'error'
                   }];
               } else {
                   $scope.alert = response.message;
                   $scope.unProc.messages = [];
                   $scope.unProc.codes=[];
                   $scope.unProc.getcodes();
               }
           });
       }
   };





});