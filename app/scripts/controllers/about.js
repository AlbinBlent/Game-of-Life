'use strict';

/**
 * @ngdoc function
 * @name gameoflifeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gameoflifeApp
 */
angular.module('gameoflifeApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
