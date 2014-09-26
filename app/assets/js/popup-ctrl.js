'use strict';

var app = angular.module('ZhiHuDaily', ['ZhiHuDaily.Services', 'ngRoute', 'ZhiHuDaily.Directives']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        controller: 'PopupCtrl',
        templateUrl: 'views/_popup.html'
      }).
      otherwise({redirectTo: "/"});
  }
]);

app.controller('PopupCtrl', ['$scope', 'Daily', '$location', '$filter', 
  'CurrentDate', '$routeParams', 'DateControl',
  function($scope, Daily, $location, $filter, CurrentDate, $routeParams, DateControl) {

    $scope.prevDay = DateControl.prevDay;
    $scope.nextDay = DateControl.nextDay;
    $scope.isToday = DateControl.isToday;
    if (!$location.search().date) 
      $location.search({date: CurrentDate.toStr(new Date)});
      Daily.getBefore($location.search().date).then(function(data) {
        $scope.data = data;
        $scope.data.date = CurrentDate.get(data.date);
      });
  }
]);

