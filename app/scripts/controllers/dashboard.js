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
// console.log(merchantGraphData);
    $scope.tempData = {
  "data": [
    {
      "teds": [
        {
          "_id": "ICICI",
          "amount": 2760,
          "accountType": "credit-card",
          "count": 2161
        },
        {
          "_id": "SBI",
          "amount": 190.74,
          "accountType": "bank",
          "count": 2129
        },
        {
          "_id": "HDFC",
          "amount": 500,
          "accountType": "debit-card",
          "count": 2118
        },
        {
          "_id": "Axis",
          "amount": 1200,
          "accountType": "credit-card",
          "count": 1978
        },
        {
          "_id": "Citi",
          "amount": 3377,
          "accountType": "credit-card",
          "count": 933
        },
        {
          "_id": "Kotak",
          "amount": 10,
          "accountType": "bank",
          "count": 488
        },
        {
          "_id": "PNB",
          "amount": 100,
          "accountType": "bank",
          "count": 347
        },
        {
          "_id": "Yes",
          "amount": 99.25,
          "accountType": "bank",
          "count": 203
        },
        {
          "_id": "HSBC",
          "amount": 1650,
          "accountType": "bank",
          "count": 47
        }
      ],
      "5-10000": [
        {
          "_id": "ICICI",
          "amount": 8804.11,
          "accountType": "bank",
          "count": 1613
        },
        {
          "_id": "HDFC",
          "amount": 8000,
          "accountType": "bank",
          "count": 1415
        },
        {
          "_id": "SBI",
          "amount": 6000,
          "accountType": "bank",
          "count": 1226
        },
        {
          "_id": "Axis",
          "amount": 10000,
          "accountType": "bank",
          "count": 808
        },
        {
          "_id": "Citi",
          "amount": 7023,
          "accountType": "credit-card",
          "count": 457
        },
        {
          "_id": "PNB",
          "amount": 8000,
          "accountType": "bank",
          "count": 255
        },
        {
          "_id": "Kotak",
          "amount": 5003.71,
          "accountType": "bank",
          "count": 159
        },
        {
          "_id": "Yes",
          "amount": 8940,
          "accountType": "bank",
          "count": 49
        },
        {
          "_id": "HSBC",
          "amount": 7000,
          "accountType": "bank",
          "count": 10
        }
      ],
      "10000-20000": [
        {
          "_id": "ICICI",
          "amount": 17608.22,
          "accountType": "bank",
          "count": 1562
        },
        {
          "_id": "HDFC",
          "amount": 20000,
          "accountType": "bank",
          "count": 1212
        },
        {
          "_id": "SBI",
          "amount": 14650,
          "accountType": "bank",
          "count": 982
        },
        {
          "_id": "Axis",
          "amount": 20000,
          "accountType": "credit-card",
          "count": 900
        },
        {
          "_id": "Citi",
          "amount": 16878,
          "accountType": "credit-card",
          "count": 582
        },
        {
          "_id": "Kotak",
          "amount": 14094,
          "accountType": "bank",
          "count": 399
        },
        {
          "_id": "PNB",
          "amount": 18000,
          "accountType": "bank",
          "count": 188
        },
        {
          "_id": "Yes",
          "amount": 15000,
          "accountType": "bank",
          "count": 76
        },
        {
          "_id": "HSBC",
          "amount": 10128.96,
          "accountType": "bank",
          "count": 9
        }
      ],
      "20000-50000": [
        {
          "_id": "ICICI",
          "amount": 27900,
          "accountType": "credit-card",
          "count": 1959
        },
        {
          "_id": "HDFC",
          "amount": 31000,
          "accountType": "bank",
          "count": 1297
        },
        {
          "_id": "SBI",
          "amount": 48029,
          "accountType": "credit-card",
          "count": 1240
        },
        {
          "_id": "Axis",
          "amount": 30000,
          "accountType": "credit-card",
          "count": 945
        },
        {
          "_id": "Kotak",
          "amount": 28889,
          "accountType": "bank",
          "count": 784
        },
        {
          "_id": "Citi",
          "amount": 24772,
          "accountType": "credit-card",
          "count": 494
        },
        {
          "_id": "PNB",
          "amount": 41500,
          "accountType": "bank",
          "count": 250
        },
        {
          "_id": "Yes",
          "amount": 30000,
          "accountType": "bank",
          "count": 95
        },
        {
          "_id": "HSBC",
          "amount": 33368.17,
          "accountType": "bank",
          "count": 10
        }
      ],
      "50000-more": [
        {
          "_id": "Kotak",
          "amount": 150000,
          "accountType": "bank",
          "count": 6091
        },
        {
          "_id": "ICICI",
          "amount": 60000,
          "accountType": "bank",
          "count": 1711
        },
        {
          "_id": "HDFC",
          "amount": 52473,
          "accountType": "bank",
          "count": 880
        },
        {
          "_id": "Axis",
          "amount": 70000,
          "accountType": "bank",
          "count": 746
        },
        {
          "_id": "SBI",
          "amount": 105969,
          "accountType": "credit-card",
          "count": 570
        },
        {
          "_id": "Citi",
          "amount": 57256,
          "accountType": "credit-card",
          "count": 362
        },
        {
          "_id": "PNB",
          "amount": 54440,
          "accountType": "bank",
          "count": 237
        },
        {
          "_id": "Yes",
          "amount": 70023,
          "accountType": "bank",
          "count": 96
        },
        {
          "_id": "HSBC",
          "amount": 108643,
          "accountType": "bank",
          "count": 50
        }
      ]
    }
  ]
}


$scope.bankByCreditTransaction = function(){
        //       $http({
        //     method: 'GET',
        //     url: url + 'get-user-count-by-merchant',
        //     headers: {
        //           Accept: "application/json",
        //           Authorization: $cookieStore.get('c2cCookie')
        //     },
        //     error: function(err) {
        //         $scope.alert = err.responseJSON.message; // body...
        //     }
        // }).then(function successCallback(response) {
        //     for (var i = response.data.length - 1; i >= 0; i--) {
        //         var tempArr = [];
        //         var newTempArr = {};

        //         tempArr.push({'v':response.data[i]._id},{'v':response.data[i].count});
        //         newTempArr['c'] = tempArr;
        //         merchantGraphData.push(newTempArr);
        //     }
     
        // }, function errorCallback(response) {
        //     console.log('Oops, Somethings went wrong.');
        // });
// for (var i = $scope.tempData.data.length - 1; i >= 0; i--) {
//     // console.log($scope.tempData.data.length);
//                 var tempArr = [];
//                 var newTempArr = {};
// console.log($scope.tempData.data[i]);
//                 tempArr.push({'v':response.data[i]._id},{'v':response.data[i].count});
//                 newTempArr['c'] = tempArr;
//                 merchantGraphData.push(newTempArr);
//             }
var log = [];
            // console.log($scope.tempData.data[0]);
            angular.forEach($scope.tempData.data[0], function(key, value) {

  // this.push(key + ': ' + value);
  console.log('Length' + $scope.tempData.data[0].teds.length);
  // for (var i = value.length - 1; i >= 0; i--) {
  //   var tempArr = [];
  //               var newTempArr = {};
  //               tempArr.push({'v':value[i].count});
  //      // console.log(value[i]._id);
  //      console.log(tempArr);
  // }
},log);
            // for (var i = Things.length - 1; i >= 0; i--) {
            //     Things[i]
            // }
    };
$scope.bankByCreditTransaction();
    $scope.myChartObjectOne = {
  "type": "LineChart",
  "displayed": false,
  "data": {
    "cols": [
      {
        "id": "month",
        "label": "Month",
        "type": "string",
        "p": {}
      },
      {
        "id": "laptop-id",
        "label": "KOTAKB",
        "type": "number",
        "p": {}
      },
      {
        "id": "desktop-id",
        "label": "ICICIB",
        "type": "number",
        "p": {}
      },
      {
        "id": "server-id",
        "label": "HDFCBK",
        "type": "number",
        "p": {}
      },
      {
        "id": "cost-id",
        "label": "HSBCIN",
        "type": "number"
      }
    ],
    "rows": [
      {
        "c": [
          {
            "v": "0-5000"
          },
          {
            "v": 19,
            "f": "42 items"
          },
          {
            "v": 2161
          },
          {
            "v": 7,
            "f": "7 servers"
          },
          {
            "v": 4
          }
        ]
      },
      {
        "c": [
          {
            "v": "5000-10000"
          },
          {
            "v": 13
          },
          {
            "v": 1613
          },
          {
            "v": 12
          },
          {
            "v": 2
          }
        ]
      },
      {
        "c": [
          {
            "v": "10000-20000"
          },
          {
            "v": 24
          },
          {
            "v": 1562
          },
          {
            "v": 11
          },
          {
            "v": 6
          }
        ]
      }
    ]
  },
  "options": {
    "title": "Sales per month",
    "isStacked": "true",
    "fill": 20,
    "displayExactValues": true,
    "vAxis": {
      "title": "Sales unit",
      "gridlines": {
        "count": 10
      }
    },
    "hAxis": {
      "title": "Date"
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
            for (var i = response.data.length - 1; i >= 0; i--) {
                var tempArr = [];
                var newTempArr = {};

                tempArr.push({'v':response.data[i]._id},{'v':response.data[i].count});
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
            for (var i = response.data.length - 1; i >= 0; i--) {
                var tempArr = [];
                var newTempArr = {};

                tempArr.push({'v':response.data[i]._id},{'v':response.data[i].count});
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
        {id: "s", label: "No of users", type: "number"}
    ], "rows": allBankGraphData};
    $scope.chartObjectThree.options = {
        'title': 'Bank accounts'
    };
$scope.bank();

});