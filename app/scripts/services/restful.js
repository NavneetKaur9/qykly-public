'use strict';
/**
 * Viewport Services
 * @module: app.core
 * @desc: Calculate application window width and height
 */
//
angular.module('sbAdminApp').factory('api', ['$rootScope', '$http', '$cookieStore', function($rootScope, $http, $cookieStore) {

	  // var parseUrl = 'http://localhost:3000/api2';
	// var parseUrl = 'http://52.66.81.240/api2'; // staging server address
	//var parseUrl = 'http://54.169.236.107/api2'; //  production server address

	// var parseUrl = 'http://localhost:3000/api2';
	var parseUrl = 'http://52.66.81.240/api2'; // staging server address
	 // var parseUrl = 'http://54.255.1715.65/api2'; //  production server address
	// var parseUrl="";
	// var token = $cookieStore.get('c2cCookie'); //set Headers for JWTTOKEN
	// $http.defaults.headers.common.Authorization = token;
	var parseHeaders = {};
	var GenerateUrl = function(theClass, object, objectId) {
		if (object && objectId) {
			return parseUrl + '/' + theClass + '/' + object + '/' + objectId;
		} else {
			if (object) {
				return parseUrl + '/' + theClass + '/' + object;
			} else {
				return parseUrl + '/' + theClass;
			}
		}
	};
	return {
		addr: function() {
			return parseUrl + '/';
		},
		//Create a db object on server
		post: function(theClass, object, token, data, callback) {
			$http.post(GenerateUrl(theClass, object, false), data, {
				headers: {
					'Authorization': token
				}
			}).success(function(response) {
				callback(null, response);
			}).error(function(response) {
				callback(true, response || 'Cannot submit data!');
			});
		},
		put: function(theClass, object, token, data, callback) {
			$http.put(GenerateUrl(theClass, object, false), data, {
				headers: {
					'Authorization': token
				}
			}).success(function(response) {
				callback(null, response);
			}).error(function(response) {
				callback(true, response || 'There is some problem with your data.');
			});
		},
		//Get a db object by id
		get: function(theClass, object, token, query, callback) {
			var config = {
				headers: {
					'Authorization': token
				}
			};
			if (query) {
				config.params = query;
			}
			$http.get(GenerateUrl(theClass, object, false), config).success(function(response) {
				callback(null, response);
			}).error(function(response) {
				callback(true, response || 'Some error occured.');
			});
		},
		//Remove a db object
		delete: function(theClass, object, token, objectId, callback) {
			$http['delete']( //['delete'] to get around using delete js keyword
				GenerateUrl(theClass, object, objectId), {
					headers: {
						'Authorization': token
					}
				}).success(function(response) {
				callback(null, response);
			}).error(function(response) {
				callback(true, response || 'Some error occured.');
			});
		}
	};
}]);