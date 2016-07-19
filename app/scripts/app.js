'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular.module('sbAdminApp', ['oc.lazyLoad', 'ui.router', 'ui.bootstrap', 'datatables', 'datatables.bootstrap', 'ngCookies']).config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $httpProvider) {
  $ocLazyLoadProvider.config({
    debug: false,
    events: true,
  });
  $urlRouterProvider.otherwise('/login');

  $stateProvider.state('dashboard', {
    url: '/dashboard',
    templateUrl: 'views/dashboard/main.html',
    resolve: {
      loadMyDirectives: function($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: 'sbAdminApp',
          files: ['scripts/directives/header/header.js', 'scripts/directives/sidebar/sidebar.js']
        })
        $ocLazyLoad.load({
            name: 'ngCookies',
            files: ['bower_components/angular-cookies/angular-cookies.js']
          }),
          $ocLazyLoad.load({
            name: 'ngResource',
            files: ['bower_components/angular-resource/angular-resource.js']
          }),
          $ocLazyLoad.load({
            name: 'ngSanitize',
            files: ['bower_components/angular-sanitize/angular-sanitize.js']
          });
      }
    }
  }).state('dashboard.home', {
    url: '/home',
    controller: 'homeCtrl',
    templateUrl: 'views/home.html',
    resolve: {
      loadMyFiles: function($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: 'sbAdminApp',
          files: ['scripts/controllers/home.js']
        });
      }
    }
  }).state('dashboard.sms', {
    url: '/sms',
    controller: 'smsCtrl',
    templateUrl: 'views/sms.html',
    resolve: {
      loadMyFiles: function($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: 'sbAdminApp',
          files: ['scripts/controllers/sms.js']
        });
      }
    }
  }).state('dashboard.shortcodes', {
    url: '/shortcodes',
    controller: 'shortcodesCtrl',
    templateUrl: 'views/shortcodes.html',
    resolve: {
      loadMyFiles: function($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: 'sbAdminApp',
          files: ['scripts/controllers/shortcodes.js']
        });
      }
    }
  }).state('dashboard.regex', {
    url: '/regex',
    controller: 'regexCtrl',
    templateUrl: 'views/regex.html',
    resolve: {
      loadMyFiles: function($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: 'sbAdminApp',
          files: ['scripts/controllers/regex.js']
        });
      }
    }
  }).state('dashboard.users', {
    url: '/users',
    controller: 'usersCtrl',
    templateUrl: 'views/users.html',
    resolve: {
      loadMyFiles: function($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: 'sbAdminApp',
          files: ['scripts/controllers/users.js']
        });
      }
    }
  }).state('dashboard.moreUserDetail', {
    url: '/user/:id',
    templateUrl: 'views/userDetail.html',
    controller: 'userDetailCtrl',
    resolve: {
      loadMyFile: function($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: 'sbAdminApp',
          files: ['scripts/controllers/userDetail.js']
        });
      }
    }
  }).state('login', {
    templateUrl: 'views/login.html',
    url: '/login',
    controller: 'loginCtrl',
    resolve: {
      loadMyFile: function($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: 'sbAdminApp',
          files: ['scripts/controllers/login.js']
        }), $ocLazyLoad.load({
          name: 'ngCookies',
          files: ['bower_components/angular-cookies/angular-cookies.js']
        });
      }
    }
  }).state('dashboard.merchants', {
    url: '/merchants',
    templateUrl: 'views/merchants.html',
    controller: 'merchantsCtrl',
    resolve: {
      loadMyFile: function($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: 'sbAdminApp',
          files: ['./assets/plugins/select2/select2.min.css', 'bower_components/angular-xeditable/dist/css/xeditable.css','scripts/controllers/merchants.js', './assets/plugins/select2/select2.full.min.js','bower_components/angular-xeditable/dist/js/xeditable.js']
        });
      }
    }
  }).state('dashboard.addUser', {
    url: '/au',
    templateUrl: 'views/addUser.html',
    controller: 'addUserCtrl',
    resolve: {
      loadMyFile: function($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: 'sbAdminApp',
          files: ['scripts/controllers/addUser.js']
        });
      }
    }
  }).state('dashboard.validateRegex', {
    url: '/validateregex',
    templateUrl: 'views/validateRegex.html',
    controller: 'validateRegexCtrl',
    resolve: {
      loadMyFile: function($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: 'sbAdminApp',
          files: ['scripts/controllers/validateRegex.js']
        });
      }
    }
  });
}]);