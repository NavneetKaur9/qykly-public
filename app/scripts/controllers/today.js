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
  var page = 0;
  // $scope.appUsers=[];
  $scope.getTodaysUser = function() {
    $scope.showProcessing = true;
    api.get('todays-users', false, token, {
      page: page
    }, function(err, response) {
      if (!err) {
        $scope.appUsers = response.result;
        $scope.showProcessing = false;
      } else {
        $scope.alert = response.message;
      }
    });
  };
  // $scope.getTodaysUser();
  $scope.moreUsers = function() {
    page++;
    $scope.getTodaysUser();
  };
  var d = new Date();
  d.setHours(0, 0, 0, 0);
  var time = +d;
  /*************************************************
   START :    UNPROCESSESD
   *************************************************/

  $scope.unProc = {
    codes: [],
    start: 0,
    sortby: 'count',
    searchCode: '',
    getcodes: function() {
      if ($scope.currentPage == 1) {
        $scope.showLoader = true;
      }
      if ($scope.currentPage > 1) {
        $scope.showLoaderUnProc = true;
      }
      api.get('get-unprocessedCodes-today', false, token, {
        // start: $scope.unProc.start,
        start: $scope.currentPage,
        search: $scope.unProc.searchCode,
        sortby: $scope.unProc.sortby,
        time: time
      }, function(err, response) {
        if (err || response.error) {
          $scope.alert = response.userMessage || 'Server error! Are you connected to the internet?.';
        } else {
          $scope.showLoader = false;
          $scope.showLoaderUnProc = false;
          // $scope.unProc.codes = $scope.unProc.codes.concat(response);
          $scope.unProc.codes = response.data;
          $scope.totalItems = response.totalcount;
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
  // $scope.unProc.getcodes();

  /*************************************************
   START :    NEWCODES
   *************************************************/
  $scope.new = {
    codes: [],
    start: 0,
    sortby: 'count',
    searchCode: '',
    getcodes: function() {
      if ($scope.currentPage == 1) {
        $scope.showLoader = true;
      }
      if ($scope.currentPage > 1) {
        $scope.showLoaderNew = true;
      }
      api.get('get-newCodes-today', false, token, {
        // start: $scope.new.start,
        start: $scope.currentPage,
        search: $scope.new.searchCode,
        sortby: $scope.new.sortby,
        time: time
      }, function(err, response) {
        if (err || response.error) {
          $scope.alert = response.userMessage || 'Server error! Are you connected to the internet?.';
        } else {
          $scope.showLoader = false;
          $scope.showLoaderNew = false;
          // $scope.new.codes = $scope.new.codes.concat(response);
          $scope.new.codes = response.data;
          $scope.totalItems = response.totalcount;
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
  // $scope.new.getcodes();
  /*************************************************
   START :    PROCESSED
   *************************************************/
  $scope.proc = {
    codes: [],
    start: 0,
    sortby: 'count',
    searchCode: '',
    getcodes: function() {
      if ($scope.currentPage == 1) {
        $scope.showLoader = true;
      }
      if ($scope.currentPage > 1) {
        $scope.showLoaderProc = true;
      }
      api.get('get-processedCodes-today', false, token, {
        // start: $scope.proc.start,
        start: $scope.currentPage,
        search: $scope.proc.searchCode,
        sortby: $scope.proc.sortby,
        time: time
      }, function(err, response) {
        if (err || response.error) {
          $scope.alert = response.userMessage || 'Server error! Are you connected to the internet?.';
        } else {
          $scope.showLoader = false;
          $scope.showLoaderProc = false;
          // $scope.proc.codes = $scope.proc.codes.concat(response);
          $scope.proc.codes = response.data;
          $scope.totalItems = response.totalcount;
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
  // $scope.proc.getcodes();

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
    $scope.activeMenu = code;

    $scope.showLoaderMessages = true;
    $scope.loadingMsg = true;
    $scope.selected_all = false;
    $scope.code = code;
    api.get('get-messages-today', false, token, {
      address: code,
      status: status,
      start: start,
      length: 50,
      time: time
    }, function(err, response) {
      if (err || response.error) {
        $scope.alert = response.userMessage || 'Server error! Are you connected to the internet?.';
      } else {
        $scope.messages = response.data;

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
    $scope.selected_all = false;
    // $scope.getSms($scope.code, $scope.status, newPage, $scope.tab);
    $scope.unProc.getcodes();
  };

  $scope.pageChangedProc = function(newPage) {
    $scope.proc.getcodes();
  };

  $scope.pageChangedNew = function(newPage) {
    $scope.new.getcodes();
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
  /***************  shweta *****************/
  $scope.Users = {
    users: [],
    getusers: function(time) {
      $scope.showLoader = true;
      api.get('emails-todays-users', false, token, {
        start: $scope.currentPage,
        filter: time
      }, function(err, response) {
        if (err || response.error) {
          $scope.alert = response.userMessage || 'Server error! Are you connected to the internet?.';
        } else {
          $scope.showLoader = false;
          $scope.Users.users = response.data;
          $scope.totalItems = response.length;
        }
      });

    }
  };

  // $scope.todaysUsers.getusers();

  $scope.email = "";
  $scope.getCount = function(userEmail) {
    $scope.msgCount = null;
    $scope.email = userEmail;
    $scope.alert = 'loading............';
    $scope.loadingMsg = true;
    api.get('user-info-by-email/' + userEmail, false, token, {}, function(err, response) {
      if (err || response.error) {
        $scope.alert = response.userMessage || 'Server error! Are you connected to the internet?.';
      } else {
        $scope.msgCount = response.data;
        $scope.loadingMsg = false;
        $scope.alert = false;
      }

    });
  }

  /***************  shweta *****************/


  /******* 29 sep ********/
  $scope.getUsers = function(time, page) {
    $scope.proc.codes = [];
    $scope.unProc.codes = [];
    $scope.new.codes = [];
    $scope.todayusers = [];
    $scope.weekusers = [];
    $scope.yesterdayusers = [];
    $scope.currentPage = page;
    if ($scope.currentPage == 1) {
      $scope.showLoader = true;
    }
    if ($scope.currentPage > 1) {
      $scope.showPageLoader = true;
    }
    api.get('emails-todays-users', false, token, {
      start: page,
      filter: time
    }, function(err, response) {
      if (err || response.error) {
        $scope.alert = response.userMessage || 'Server error! Are you connected to the internet?.';
      } else {
        $scope.showLoader = false;
        if (time == 'today') {
          $scope.todayusers = response.data;
        } else if (time == 'yesterday') {
          $scope.yesterdayusers = response.data;
        } else if (time == 'week') {
          $scope.weekusers = response.data;
        }
        $scope.totalItems = response.length;
        $scope.showPageLoader = false;
      }
    });
  };

  $scope.pageChangedUsers = function(newPage, time) {
    $scope.getUsers(time, newPage);
  };


  $scope.getShortcodes = function(value) {
    $scope.yesterdayusers = [];
    $scope.todayusers = [];
    $scope.weekusers = [];
    $scope.proc.codes = [];
    $scope.unProc.codes = [];
    $scope.new.codes = [];
    $scope.currentPage = 1;

    if (value === 'new') {
      $scope.new.getcodes();
    } else if (value === 'proc') {
      $scope.proc.getcodes();
    } else if (value === 'unProc') {
      $scope.unProc.getcodes();
    }
  };

  $scope.showCounts = function() {
    $scope.alert = 'loading............';
    $scope.loadingMsg = true;
    api.get('todayscount/', false, token, {}, function(err, response) {
      if (err || response.error) {
        $scope.alert = response.userMessage || 'Server error! Are you connected to the internet?.';
      } else {
        $scope.allCounts = response;
        $scope.loadingMsg = false;
        $scope.alert = false;
      }
    });
  };
  $scope.showCounts();
});
