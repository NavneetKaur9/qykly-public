'use strict';
/**
 *
 */
angular.module('sbAdminApp').controller('homeCtrl', function($scope, $http, api, $window, $cookieStore) {
  $window.scrollTo(0, 0);
  $scope.closeAlert = function() {
    $scope.alert = false;
  };

  function reset() {
    $scope.users = [];
    $scope.bankUsers = [];
    $scope.showChart = false;
  }
  $scope.categories = ['travel', 'purchases'];
  // api.get('get-category', false, false, false, function(err, response) {
  //     if (err) {
  //         $scope.alert = response.message;
  //     } else {
  //         $scope.categories = response.category;
  //     }
  // });
  $scope.getMerchants = function() {
    // $scope.users = [];
    $scope.merchantName = [];
    $scope.showLoader1 = true;
    reset();
    $scope.selected = false;
    api.get('get-merchants', false, false, {
      category: $scope.category
    }, function(err, response) {
      if (err) {
        $scope.alert = response.message;
      } else {
        $scope.showLoader1 = false;
        $scope.merchantName = response.merchantname;
      }
    });
  };

  $scope.getUserCount = function(category) {
    $scope.usersPurchases = [];
    var checkboxes = document.getElementsByName('merchantCheckbox');
    var merchants = [];
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        var value = checkboxes[i].value;
        merchants.push(value);
      }
    }
    if (merchants.length === 0) {
      $scope.alert = 'Please Choose one or more merchant';
      return
    } else if (($scope.start === undefined) || ($scope.end === undefined)) {
      $scope.alert = ' Range field is undefined '
    } else if ($scope.dt1 === undefined) {
      $scope.alert = ' From Field Is empty '
    }
    var dt1 = ($scope.dt1).getTime();
    var dt2 = ($scope.dt2).getTime();
    $scope.showLoader2 = true;
    reset();
    // $scope.myChartObject.data=[];

    if (category === "purchases") {
      api.post('get-purchases-data', false, false, {
        category: category,
        merchant: merchants,
        range: [$scope.start, $scope.end],
        date: [dt1, dt2]
      }, function(err, response) {
        if (err) {
          $scope.alert = response.message;
        } else {
          $scope.usersPurchases = response;
          $scope.showLoader2 = false;
        }
        generatePurchasesPieChart(response);
      });
    } else {
      api.post('get-user-count', false, false, {
        category: $scope.category,
        merchant: merchants,
        range: [$scope.start, $scope.end],
        date: [dt1, dt2]
      }, function(err, response) {
        if (err) {
          $scope.alert = response.message;
        } else if (($scope.category === "travel") || ($scope.category === "purchases")) {
          $scope.users = response.result;
          $scope.showLoader2 = false;
        } else if ($scope.category === "credit-transaction" || $scope.category === "debit-transaction") {
          $scope.bankUsers = response.result;
          $scope.showLoader2 = false;
        }
        generatePieChart(response.result);
      });
    }
  };

  //date
  // $scope.dt2 = new Date();
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
  $scope.open3 = function() {
    $scope.popup3.opened = true;
  };
  $scope.open4 = function() {
    $scope.popup4.opened = true;
  };
  $scope.altInputFormats = ['M!/d!/yyyy'];
  $scope.popup1 = {
    opened: false
  };
  $scope.popup2 = {
    opened: false
  };
  $scope.popup3 = {
    opened: false
  };
  $scope.popup4 = {
    opened: false
  };
  //date

  //googlecharts starts here
  $scope.myChartObject = {};
  $scope.myChartObject.type = "PieChart";

  function generatePieChart(data) {
    var shortCodesgraphData = [];
    $scope.showChart = true;
    for (var i = data.length - 1; i >= 0; i--) {
      var tempArr = [];
      var temoObj = {};
      tempArr.push({ 'v': data[i].merchantname }, { 'v': data[i].count });
      temoObj['c'] = tempArr;
      shortCodesgraphData.push(temoObj);
    }
    // $scope.myChartObject.options = {
    //     'title': 'How Much Pizza I Ate Last Night'
    // };
    $scope.myChartObject.data = {
      "cols": [
        { id: "t", label: "MerchantName", type: "string" },
        { id: "s", label: "count", type: "number" }
      ],
      "rows": shortCodesgraphData
    };
  }

  function generatePurchasesPieChart(data) {
    var purchaseGraphData = [];
    $scope.showChart = true;
    for (var i = data.length - 1; i >= 0; i--) {
      var tempArr = [];
      var temoObj = {};
      tempArr.push({ 'v': data[i].merchantName }, { 'v': data[i].users });
      temoObj['c'] = tempArr;
      purchaseGraphData.push(temoObj);
    }
    // $scope.myChartObject.options = {
    //   'title': 'Users'
    // };
    $scope.myChartObject.data = {
      "cols": [
        { id: "t", label: "Merchant Name", type: "string" },
        { id: "s", label: "Users", type: "number" }
      ],
      "rows": purchaseGraphData
    };
  }

  $scope.getUserList = function(userIdArr) {
    api.post('get-user-list', false, false, {
      userIdArr: userIdArr,
    }, function(err, response) {
      if (err) {
        $scope.alert = response.message;
      } else {
        $scope.users = response.result;
        $scope.showLoader2 = false;
      }
      generatePieChart(response.result);
    });
  };


 



 $scope.options = [
    "EKART",
"SHOPCLUES",
"EBAY",
"SHOP CLUES",
"MYNTRA",
"PAYTM",
"BOOKMYSHOW",
"SNAPDEAL",
"FLIPKART",
"AMAZON"
];


});
