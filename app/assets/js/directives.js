'use strict';

var directives = angular.module('ZhiHuDaily.Directives', []);

directives.directive('loading', ['$rootScope',
  function($rootScope) {
    return {
      link: function(scope, element, attributes) {
        $rootScope.$on('$routeChangeStart', function() {
          element.removeClass('ng-hide');
          console.log('routeChangeStart');
        });
        $rootScope.$on('$routeChangeSuccess', function() {
          element.addClass('ng-hide');
          console.log('routeChangeSuccess');
        });
      }
    }
  }
]);