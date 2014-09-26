'use strict';

var services = angular.module('ZhiHuDaily.Services', []);

services.factory('Daily', ['$q', '$http', function($q, $http) {
  return {
    getLatest: function() {
      var defer = $q.defer();
      $http({
          method: "GET",
          url: "http://news-at.zhihu.com/api/3/news/latest",
          cache: true
      }).success(function(data) {
          defer.resolve(data);
      }).error(function(err) {
          defer.reject(err);
      });
      return defer.promise;
    },
    getBefore: function(date) {
      var defer = $q.defer();
      $http({
          method: "GET",
          url: "http://news.at.zhihu.com/api/3/news/before/" + date,
          cache: true
      }).success(function(data) {
          defer.resolve(data);
      }).error(function(err) {
          defer.reject(err);
      });
      return defer.promise;
    }
  };
}]);


services.factory('CurrentDate', ['$filter', 
  function($filter) {
    return {
      get: function(date) {
       if(date) {
        var _y = date.substring(0,4);
        var _m = date.substring(4,6);
        var _d = date.substring(6,8);
        date = _y + "/" + _m + "/" + _d;
        return date;
       }
      },
      toStr: function(date) {
        if (date) {
          date.setDate(date.getDate() + 1);
          return $filter('date')(date, 'yyyyMMdd');
        };
      }
    }
  }
]);


services.factory('DateControl', ['$filter', '$routeParams', '$location',
  function($filter, $routeParams, $location) {
    var date_obj = function(date) {
      if (date) {
        var _y = date.substring(0,4);
        var _m = date.substring(4,6);
        var _d = date.substring(6,8);
        date = _y + "/" + _m + "/" + _d;
      }
      return new Date(date);
    };
    return {
      prevDay: function() {
        var _params = date_obj($routeParams.date);
        var _prev = _params.setDate(_params.getDate() - 1);
        var search_obj = $filter('date')(_prev, 'yyyyMMdd');
        $location.search({date: search_obj});
      },
      nextDay: function() {
        var _params = date_obj($routeParams.date);
        var _next = _params.setDate(_params.getDate() + 1);
        var search_obj = $filter('date')(_next, 'yyyyMMdd');
        $location.search({date: search_obj});
      },
      isToday: function() {
        var today = new Date();
        today.setDate(today.getDate() + 1);
        return $filter('date')(today, 'yyyyMMdd') === $location.search().date;
      }
    }
  }
]);



