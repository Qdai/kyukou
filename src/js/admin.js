/* global angular, window */

var SITE_URL = '/* @echo SITE_URL */' || '//' + window.location.hostname;

var adminMethod = function (method) {
  return function ($scope, $http) {
    this.alerts = [];
    var self = this;
    this.post = function (data) {
      $http({
        method: 'POST',
        url: SITE_URL + '/admin/events/' + method,
        data: data
      }).success(function (result) {
        var alert = {};
        if (result.error) {
          alert.type = 'danger';
          alert.message = 'Error: ' + result.error.message;
        } else {
          alert.type = 'success';
          alert.message = 'Success: ' + result.success.message;
        }
        self.alerts.push(alert);
        // reload
        $scope.loadEvents();
      }).error(function (result, status) {
        self.alerts.push({
          type: 'danger',
          message: 'Load error:' + status + ' ' + result.error.message
        });
      });
    };
    this.closeAlert = function (index) {
      this.alerts.splice(index, 1);
    };
  };
};

var adminApp = angular.module('adminApp', ['ui.bootstrap']);
adminApp.controller('adminCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.events = [];

  $scope.loadEvents = function () {
    $http.get(SITE_URL + '/admin/events/list.json').success(function (data) {
      $scope.events = data;
    }).error(function (data, status) {
      console.error('load error: %s: %s', status, data); // eslint-disable-line no-console
    });
  };

  $scope.loadEvents();
}]);
adminApp.controller('addCtrl', ['$scope', '$http', adminMethod('add')]);
adminApp.controller('editCtrl', ['$scope', '$http', adminMethod('edit')]);
adminApp.controller('deleteCtrl', ['$scope', '$http', adminMethod('delete')]);
