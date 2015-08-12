describe('ListController', function() {

  // load the application module
  beforeEach(module('groceryStore'));

  var $controller, http, httpBackend, rootScope;

  beforeEach(inject(function(_$controller_, $http, $rootScope){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    rootScope = $rootScope;
    http = $http;
  }));

  describe('the addProduct function', function() {

    it('should insert a product in the list', function() {

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

  describe('when the backend is correctly responding', function() {
    // injecting an $http mock using angular $httpBackend
    // we need to mock the controller scope and the fake backend while injeacting a real $http service
    beforeEach(inject(function($httpBackend) {
      httpBackend = $httpBackend;

      httpBackend.when('GET', '../mocks/list.json')
        .respond([
          {
            category: 'Fruit',
            name: 'Apple',
            quantity: 12
          },
          {
            category: 'Fruit',
            name: 'Banana',
            quantity: 10
          },
          {
            category: 'Fruit',
            name: 'Mango',
            quantity: 12
          },
          {
            category: 'Fruit',
            name: 'Pineapple',
            quantity: 10
          }
        ]);
    }));

    it('should retrieve 4 products', function(){
      $controller('listCtrl', {
        $scope: rootScope,
        $http: http
      });
      httpBackend.flush();
      expect(rootScope.products.length).toEqual(4);
    });
  });

  describe('When the backend is down', function() {
    // injecting an $http mock using angular $httpBackend
    // we need to mock the controller scope and the fake backend while injeacting a real $http service
    beforeEach(inject(function($httpBackend){

      httpBackend = $httpBackend;

      httpBackend.when('GET', '../mocks/list.json').respond(404, 'Not Found');
    }));

    it('should show an error', function(){
      $controller('listCtrl', {
        $scope: rootScope,
        $http: http
      });
      httpBackend.flush();
      expect(rootScope.errors).toEqual('Not Found');
    });
  });
});
