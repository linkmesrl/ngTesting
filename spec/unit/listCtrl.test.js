describe('ListController', function() {

  // load the application module
  beforeEach(module('groceryStore'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('the addProduct function', function() {

    it('should insert a produc in the list', function() {

      // Load my controller with a fake $scope
      var $scope = {};
      $controller('listCtrl', { $scope: $scope });
      
      // Setup the scope as per my needing
      $scope.products = [];
      $scope.newProduct = {category: 'Fruits', name: 'Apple', quantity: 14};

      // Trigger a function to be tested
      $scope.addProduct();

      // Check the results
      expect($scope.products.length).toEqual(1);
    });

  });
});
