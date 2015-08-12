'use strict';

angular.module('groceryStore')
.directive('productList', function(cartService){
  return {
    scope: {
      pageSize: '@',
      products: '=products'
    },
    restrict: 'E',
    templateUrl: 'views/templates/list.tpl.html',
    link: function(scope){
      if(!scope.products){
        throw new Error('You must specify a product list');
      }

      if(!angular.isArray(scope.products)){
        throw new Error('Product list must be an array');
      }

      scope.pageSize = parseInt(scope.pageSize) || 5;

      scope.currentPage = 0;

      scope.$watch('products', function(){
        scope.pageNumber = Math.round(scope.products.length / scope.pageSize);
        scope.getPages();
      });

      scope.pages = [];
      scope.getPages = function(){

        var arr = [];

        for(var i = 0; i < scope.pageNumber; i++){
          arr.push(i);
        }
        scope.pages = arr;
        return arr;

      };

      scope.goToPage = function(n){
        scope.currentPage = n;
      };

      scope.addToCart = function(product){
        cartService.add(product);
      };

    }
  };
})
.filter('pagination', function(){
  return function(input, start) {
    start = parseInt(start, 10);
    return input.slice(start);
  };
});
