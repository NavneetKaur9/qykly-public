'use strict';
/**
 *  Shortcodes controller
 */
angular.module('sbAdminApp').controller('shortcodesCtrl', function($scope, $http, api, $cookieStore, $window, DTOptionsBuilder, DTColumnBuilder, $filter) {

    var url = api.addr();
    var token = $cookieStore.get('c2cCookie');
    $window.scrollTo(0, 0);

    $scope.checkArray=[];
    $scope.check=function(value){
        
        var index=$scope.checkArray.indexOf(value);
        function reset(){
            $scope.currentPage=1;
            $scope.unProc.messages=[];
            $scope.new.messages=[];
            $scope.proc.messages=[];
        }
        reset();
       if ((index===-1) && (value==='new')){
            
            $scope.new.getcodes();             
             $scope.checkArray.push(value);
        }else if ((index===-1) && (value==='proc')){
            
            $scope.proc.getcodes();             
            $scope.checkArray.push(value);
        }
    };

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
            $scope.$watch('unProc.sortby', function(value) {
                $scope.unProc.codes = [];
                $scope.unProc.sortby = value;
                $scope.unProc.start = 0;
                $scope.unProc.getcodes();
            });
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
            $scope.$watch('new.sortby', function(value) {
                $scope.new.codes = [];
                $scope.new.sortby = value;
                $scope.new.start = 0;
                $scope.new.getcodes();

            });
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
            $scope.$watch('proc.sortby', function(value) {
                $scope.proc.codes = [];
                $scope.proc.sortby = value;
                $scope.proc.start = 0;
                $scope.proc.getcodes();

            });
        }
    };
    /*************************************************
                    START :    PENDING  
    *************************************************/
    $scope.getPendingCodes = function() {
        api.get('get-newCodes', false, token, {
            start: start,
            search: $scope.search_pendingCodes,
            sortby: $scope.sortby
        }, function(err, response) {
            if (err || response.error) {
                $scope.alert = response.userMessage || 'Server error! Are you connected to the internet?.';
            } else {
                $scope.pendingCodes = $scope.pendingCodes.concat(response);
            }
        });
    };

    /************** GET SMS ********************/
    $scope.start = 1;
    $scope.currentPage=1;
    $scope.length=10;
    $scope.itemsPerPage=50;

    $scope.getSms = function(code, status,start,tab) {

        if(code!==$scope.code){
            $scope.currentPage=1;
        }
        $scope.loadingMsg = true ;
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
                $scope.start=start;
                $scope.status=status;
                $scope.tab=tab;
                if (tab==='unProc') {
                   $scope.unProc.messages=response.data;
                   // $scope.unproc.totalCount=response.totalCount;
                } else if(tab==='new') {
                   $scope.new.messages=response.data;
                   // $scope.new.totalCount=response.totalCount;
                }else if(tab ==='proc'){
                   $scope.proc.messages=response.data;
                   // $scope.proc.totalCount=response.totalCount;
                }
                // $scope.messages = response.data;
                $scope.totalCount = response.totalCount;

                $scope.loadingMsg = false;
            }
        });
    };
    //***********pagination on change ************//
    $scope.pageChanged = function(newPage) {
        $scope.getSms($scope.code,$scope.status,newPage,$scope.tab);
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
                $scope.smses = [];
                //remove shortcode from list of shortcodes
            }
        });
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
               $scope.getSms($scope.code,$scope.status,$scope.start,$scope.tab);
                  
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
               $scope.getSms($scope.code,$scope.status,$scope.start,$scope.tab);
            }
        });

    };
    $scope.laterUse = function() {
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
            }
        });
    };







});