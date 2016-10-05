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

    // if (category === "purchases") {
    //   api.post('get-purchases-data', false, false, {
    //     category: category,
    //     merchant: merchants,
    //     // range: [$scope.start, $scope.end],
    //     date: [dt1, dt2]
    //   }, function(err, response) {
    //     if (err) {
    //       $scope.alert = response.message;
    //     } else {
    //       $scope.usersPurchases = response;
    //       $scope.showLoader2 = false;
    //     }
    //     // generatePieChart(response.result);
    //   });
    // } else {
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
    // }
  };

  //date
  $scope.dt2 = new Date();
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
  //google chart ends here

  // $scope.usersPurchases = [{
  //   "_id": "AMAZON",
  //   "userId": ["577b99a83b517a3563d813bd", "eeeeca191c06c2a077b3b3eb66ce6120cdde0f1c", "577b6a6cbb109b23591f6a5c", "577b6864bb109b23591f6a5b", "577b5fb3bb109b23591f6a58", "57775a91004ac7c048884626", "577a78266d36efd134bd5b7b", "577a767c6d36efd134bd5b78", "577a6c066d36efd134bd5b70", "577a64ea6d36efd134bd5b6a"],
  //   "purchaseId": ["b071b943-5296-44a5-b114-4f54e31e742f", "986d711e-6074-4dda-95d3-ddd55528d1f1", "678befce-eca1-40e3-b0bf-04db543ecd77", "ec62fd14-6496-4d1b-af3a-25c4d91096e2", "c29d0a67-280a-4455-a533-ec62642a903f", "10bbdfe6-9a05-4a4b-ba0c-5872090b454d", "8e622073-d419-4e28-af9f-01a2bc05ce22", "6219f6f8-c710-4246-8c74-9fe146744110", "d80434ac-73fc-4a26-a310-d3fd3aa01af1", "8e5bd07e-9290-40ed-b318-037bc306d8d0", "ef9deb23-bacc-40e7-9383-c9345cc5bf1f", "5d8e0f97-cf16-43f2-897c-8f3a7daeac3a", "c587c5b1-9155-4b93-b111-7cfc499aea84", "5db4bd73-6faa-4dc3-b993-2051175915ea", "8ca7f558-db62-4424-8ff7-e91dbef2a6b7", "d8ebb3f2-f11c-4477-92e6-a9f315c57910", "1584c9ad-be6f-40ff-ab19-a57e47a8e56b", "57b19117-38a1-401c-b621-f08116ebcc47"],
  //   "msgDate": 1457668436000,
  //   "count": 85
  // }, {
  //   "_id": "FLIPKART",
  //   "userId": ["eeeeca191c06c2a077b3b3eb66ce6120cdde0f1c"],
  //   "purchaseId": ["89cfb46b-b40c-4c93-9e9e-c21a1630c0cf", "d43a051a-ef7b-4d8a-b467-4447b586cfc5"],
  //   "msgDate": 1454642092000,
  //   "count": 6
  // }];

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
});
