'use strict';
/*
* dashboard controller 
*/

angular.module("sbAdminApp",['googlechart'])
.controller("dashboardCtrl", function ($scope, $http, api, $window, $cookieStore) {
    var url = api.addr();
    var shortCodesgraphData = []; //declare an empty array
    var merchantGraphData = []; //declare an empty array
    var bankGraphData = []; //declare an empty array
    var allBankGraphData = [];


    $scope.shortCodesData = function() {
        $http({
            method: 'GET',
            url: url + 'get-most-used-shortcodes',
            headers: {
                  Accept: "application/json",
                  Authorization: $cookieStore.get('c2cCookie')
            },
            error: function(err) {
                $scope.alert = err.responseJSON.message; // body...
            }
        }).then(function successCallback(response) {
            for (var i = response.data.length - 1; i >= 0; i--) {
                var tempArr = [];
                var newTempArr = {};

                tempArr.push({'v':response.data[i]._id},{'v':response.data[i].count});
                newTempArr['c'] = tempArr;
                shortCodesgraphData.push(newTempArr);
            }
     
        }, function errorCallback(response) {
            console.log('Oops, Somethings went wrong.');
        });
    };
    $scope.shortCodesData();

    $scope.myChartObject = {};
    
    $scope.myChartObject.type = "BarChart";
    
    $scope.myChartObject.data = {"cols": [
        {id: "t", label: "Sender code", type: "string"},
        {id: "s", label: "Frequency", type: "number"}
    ], "rows": shortCodesgraphData};
    $scope.myChartObject.options = {
        'title': 'Top 10 sender codes'
    };

    
    $scope.userCountByMerchant = function(){
              $http({
            method: 'GET',
            url: url + 'get-user-count-by-merchant',
            headers: {
                  Accept: "application/json",
                  Authorization: $cookieStore.get('c2cCookie')
            },
            error: function(err) {
                $scope.alert = err.responseJSON.message; // body...
            }
        }).then(function successCallback(response) {
            for (var i = response.data.length - 1; i >= 0; i--) {
                var tempArr = [];
                var newTempArr = {};

                tempArr.push({'v':response.data[i]._id},{'v':response.data[i].count});
                newTempArr['c'] = tempArr;
                merchantGraphData.push(newTempArr);
            }
     
        }, function errorCallback(response) {
            console.log('Oops, Somethings went wrong.');
        });
    };
    
    $scope.userCountByMerchant();
    $scope.merchantChartObject = {};
    $scope.merchantChartObject.type = "ColumnChart";

    $scope.merchantChartObject.data = {"cols": [
        {id: "t", label: "Merchnat", type: "string"},
        {id: "s", label: "No of purchase", type: "number"}
    ], "rows": merchantGraphData};
    $scope.merchantChartObject.options = {
        'title': 'Top ecommerce'
    };

  var temp1 = [];
  var testData = [];
  var newTempArr = [];
$scope.bankByCreditTransaction = function(){
   $http({
            method: 'GET',
            url: url + 'get-bank-by-credit-transaction',
            headers: {
                  Accept: "application/json",
                  Authorization: $cookieStore.get('c2cCookie')
            },
            error: function(err) {
                $scope.alert = err.responseJSON.message; // body...
            }
        }).then(function successCallback(response) {
             var log = [];
   testData.push( {"id": "month","label": "Month","type": "string","p": {}});
   angular.forEach(response.data.data[0], function(value, key) {
      for (var i = value.length - 1; i >= 0; i--) {
                  var tempArr = [];
                  var newTempArrLocal = {};
                //cols
                if(testData.length < 10){  

                testData.push({'id':"laptop-id","label": value[i]._id,"type": "number","p": {}});

                 }
                 //rows
                   temp1.push({'v':value[i].count});
                  if(temp1.length == value.length){
                    temp1.splice(0, 0, {'v':key})
                    newTempArrLocal['c'] = temp1;
                    newTempArr.push(newTempArrLocal);

                    temp1 = [];
                    continue;
                  }
      }
       
    }, log);
     
        }, function errorCallback(response) {
            console.log('Oops, Somethings went wrong.');
        });

    };
 
$scope.bankByCreditTransaction();
    $scope.myChartObjectOne = {
  "type": "LineChart",
  "displayed": false,
  "data": {
     "cols":testData,
     "rows":newTempArr
  },
  "options": {
    "title": "Transactions",
    "isStacked": "true",
    "fill": 20,
    "displayExactValues": true,
    "vAxis": {
      "title": "Transactions",
      "gridlines": {
        "count": 10
      }
    },
    "hAxis": {
      "title": "Amount"
    }
  },
  "formatters": {}
}

    $scope.bankByCreditCard = function(){
              $http({
            method: 'GET',
            url: url + 'get-bank-by-credit-card',
            headers: {
                  Accept: "application/json",
                  Authorization: $cookieStore.get('c2cCookie')
            },
            error: function(err) {
                $scope.alert = err.responseJSON.message; // body...
            }
        }).then(function successCallback(response) {
               var bankData = [];
          for (var i = response.data.resData.length - 1; i >= 0; i--) {
            angular.forEach(response.data.resData[i], function(value, key) {
               var newTempArr = {};
               newTempArr['_id'] = key;
               newTempArr['count'] = value;
               bankData.push(newTempArr);
            }, bankData);
          }
            for (var i = bankData.length - 1; i >= 0; i--) {
                var tempArr = [];
                var newTempArr = {};

                tempArr.push({'v':bankData[i]._id},{'v':bankData[i].count});
                newTempArr['c'] = tempArr;
                bankGraphData.push(newTempArr);
            }
     
        }, function errorCallback(response) {
            console.log('Oops, Somethings went wrong.');
        });
    };
    
    
    $scope.chartObjectTwo = {};
    $scope.chartObjectTwo.type = "ColumnChart";

    $scope.chartObjectTwo.data = {"cols": [
        {id: "t", label: "Bank", type: "string"},
        {id: "s", label: "No of users", type: "number"}
    ], "rows": bankGraphData};
    $scope.chartObjectTwo.options = {
        'title': 'Credit Card Users'
    };
$scope.bankByCreditCard();

    $scope.bank = function(){
              $http({
            method: 'GET',
            url: url + 'get-bank',
            headers: {
                  Accept: "application/json",
                  Authorization: $cookieStore.get('c2cCookie')
            },
            error: function(err) {
                $scope.alert = err.responseJSON.message; // body...
            }
        }).then(function successCallback(response) {
          var bankData = [];
          for (var i = response.data.resData.length - 1; i >= 0; i--) {
            angular.forEach(response.data.resData[i], function(value, key) {
               var newTempArr = {};
               newTempArr['_id'] = key;
               newTempArr['count'] = value;
               bankData.push(newTempArr);
            }, bankData);
          }
            for (var i = bankData.length - 1; i >= 0; i--) {
                var tempArr = [];
                var newTempArr = {};

                tempArr.push({'v':bankData[i]._id},{'v':bankData[i].count},{v:'#e2431e'});
                newTempArr['c'] = tempArr;
                allBankGraphData.push(newTempArr);
            }
     
        }, function errorCallback(response) {
            console.log('Oops, Somethings went wrong.');
        });
    };
    
    
    $scope.chartObjectThree = {};
    $scope.chartObjectThree.type = "ColumnChart";

    $scope.chartObjectThree.data = {"cols": [
        {id: "t", label: "Bank", type: "string"},
        {id: "s", label: "No of users", type: "number"},
        {role: "style", type: "string"}
    ], "rows": allBankGraphData};
    $scope.chartObjectThree.options = {
        'title': 'Bank accounts'
    };
$scope.bank();

//debit-transaction
  var debitTemp = [];
  var debitCols = [];
  var debitRows = [];

$scope.bankBydebiitTransaction = function(){
   $http({
            method: 'GET',
            url: url + 'get-bank-by-debit-transaction',
            headers: {
                  Accept: "application/json",
                  Authorization: $cookieStore.get('c2cCookie')
            },
            error: function(err) {
                $scope.alert = err.responseJSON.message; // body...
            }
        }).then(function successCallback(response) {
             var log = [];
   debitCols.push( {"id": "month","label": "Month","type": "string","p": {}});
   angular.forEach(response.data.data[0], function(value, key) {
      for (var i = value.length - 1; i >= 0; i--) {
                  var tempArr = [];
                  var newTempArrLocal = {};
                //cols
                if(debitCols.length < 10){  

                debitCols.push({'id':"laptop-id","label": value[i]._id,"type": "number","p": {}});

                 }
                 //rows
                   debitTemp.push({'v':value[i].count});
                  if(debitTemp.length == value.length){
                    debitTemp.splice(0, 0, {'v':key})
                    newTempArrLocal['c'] = debitTemp;
                    debitRows.push(newTempArrLocal);

                    debitTemp = [];
                    continue;
                  }
      }
       
    }, log);
     
        }, function errorCallback(response) {
            console.log('Oops, Somethings went wrong.');
        });

    };
 
$scope.bankBydebiitTransaction();
 $scope.bankDebitTransactionObj = {
  "type": "LineChart",
  "displayed": false,
  "data": {
     "cols":debitCols,
     "rows":debitRows
  },
  "options": {
    "title": "Debit transactions",
    "isStacked": "true",
    "fill": 20,
    "displayExactValues": true,
    "vAxis": {
      "title": "Debit transactions",
      "gridlines": {
        "count": 10
      }
    },
    "hAxis": {
      "title": "Amount"
    }
  },
  "formatters": {}
}

});