'use strict';

angular.module('groceryStore')
.controller('aboutCtrl', function($scope){
  $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
});
