'use strict';

angular.module('groceryStore')
.controller('listCtrl', function($scope, $http){

  // Define a list of categories
  $scope.categories = ['Fruits', 'Vegetables'];

  // Retrieve data form the backend
  $http.get('../mocks/list.json')
  .success(function(list){
    $scope.products = list;
  })
  .error(function(err){
    $scope.errors = err;
  });

  // Define a function to add new products to my list
  $scope.addProduct = function(){
    $scope.products.push($scope.newProduct);
    $scope.newProduct = null;
  };

});
