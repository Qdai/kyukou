/* global angular, window */

var SITE_URL = '/* @echo SITE_URL */' || '//' + window.location.hostname;

var logApp = angular.module('statusApp', ['ui.bootstrap', 'ngAnimate']);
logApp.factory('logList', ['$http', '$q', function ($http, $q) {
  var deferred = $q.defer();
  $q.all([
    $http.get(SITE_URL + '/api/1/logs/task.json'),
    $http.get(SITE_URL + '/api/1/logs/twit_new.json'),
    $http.get(SITE_URL + '/api/1/logs/twit_tomorrow.json'),
    $http.get(SITE_URL + '/api/1/logs/delete.json')
  ]).then(function (results) {
    var temp = [];
    for (var i = 0; i < results.length; i++) {
      results[i].data.time = new Date(results[i].data.time).toString();
      results[i].data.isFailure = results[i].data.level !== 1;
      results[i].data.level = ['', 'success', 'info', 'warning', 'danger'][results[i].data.level];
      temp.push(results[i].data);
    }
    deferred.resolve(temp);
  }, function (error) {
    deferred.reject(error);
  });
  return deferred.promise;
}]);
logApp.controller('logListCtrl', ['logList', function (logList) {
  this.ctrlTmpl = 'logapp-loading';
  this.oneAtATime = false;
  this.logs = null;
  this.error = null;

  var self = this;
  logList.then(function (data) {
    self.logs = data;
    self.ctrlTmpl = 'logapp';
    self.error = null;
  }, function (err) {
    self.error = err;
  });
}]);
