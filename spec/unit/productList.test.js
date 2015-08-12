'use strict';

describe('The Product List Directive', function() {
  var element, scope;

  // injecting main module
  beforeEach(module('groceryStore'));

  // preload Html Templates with ng-html2js
  beforeEach(module('templates'));

  it('should throw an error if no products are specified', inject(function($compile, $rootScope) {
    function errorFunctionWrapper(){
      $compile(angular.element('<product-list></product-list>'))($rootScope);

      // always call a $digest cicle to render the directive
      $rootScope.$digest();
    }
    expect(errorFunctionWrapper).toThrow(new Error('You must specify a product list'));
  }));

  it('should throw an error if products are not an array', inject(function($compile, $rootScope) {
    function errorFunctionWrapper(){

      // setup the parent scope
      scope = $rootScope.$new();
      scope.products = 'green';

      // pass the values to the directive
      $compile(angular.element('<product-list products="products"></product-list>'))(scope);

      // always call a $digest cicle to render the directive
      scope.$digest();
    }
    expect(errorFunctionWrapper).toThrow(new Error('Product list must be an array'));
  }));

  describe('when correctly configured', function() {
    // injecting and bootstrapping the directive
    beforeEach(inject(function ($compile, $rootScope) {
      scope = $rootScope.$new();

      scope.products = [
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
      ];

      scope.pageSize = 2;

      element = angular.element('<product-list products="products" page-size="{{pageSize}}"></product-list>');
      $compile(element)(scope);
      scope.$digest();
    }));

    it('should calculate the corret page number', function(){
      var isolatedScope = element.isolateScope();
      expect(isolatedScope.pageNumber).toEqual(2);
    });

    it('should contain 4 rows', function() {
      var wells = element[0].getElementsByClassName('well');
      
      // one is the filter, the other two are the products, one is the pagination
      expect(wells.length).toEqual(4);
    });

    it('should show the pagination', function(){
      var isolatedScope = element.isolateScope();
      var pagination = element[0].getElementsByClassName('pagination');

      expect(pagination.length).toEqual(1);
      expect(pagination[0].getElementsByTagName('li').length).toEqual(isolatedScope.pageNumber + 2);
    });

    it('should show first page and disable prev button', function(){

      var pagination = element[0].getElementsByClassName('pagination');
      var pagesElement = pagination[0].getElementsByTagName('li');

      var firsElementInList = element[0].querySelector('.well > .row:nth-child(1) > .col-sm-3:nth-child(2)');

      var firsElement = angular.element(pagesElement[0]);

      expect(firsElement.hasClass('disabled')).toBe(true);
      expect(angular.element(firsElementInList).text()).toEqual('Apple');
    });

    it('should show last page and disable next button', function(){

      // move to the second page an trigger a digest cycle
      var isolatedScope = element.isolateScope();
      isolatedScope.currentPage = 1;
      scope.$digest();

      var pagination = element[0].getElementsByClassName('pagination');
      var pagesElement = pagination[0].getElementsByTagName('li');

      var firsElementInList = element[0].querySelector('.well > .row:nth-child(1) > .col-sm-3:nth-child(2)');

      var lastElement = angular.element(pagesElement[pagesElement.length - 1]);

      expect(lastElement.hasClass('disabled')).toBe(true);
      expect(angular.element(firsElementInList).text()).toEqual('Mango');
    });


  });
});

describe('when the cartService.add() is called it', function() {

  var mockService, scope, element;

  // injecting main module
  beforeEach(module('groceryStore'));

  // preload Html Templates with ng-html2js
  beforeEach(module('templates'));

  // mock the service
  beforeEach(function(){
    module(function($provide){
      $provide.service('cartService', function(){
        this.add = jasmine.createSpy('add');
      });
    });
  })

  // inject the mocked service
  beforeEach(inject(function(cartService){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    mockService = cartService;
  }));

  // injecting and bootstrapping the directive
  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();

    scope.products = [
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
    ];

    scope.pageSize = 2;

    element = angular.element('<product-list products="products" page-size="{{pageSize}}"></product-list>');
    $compile(element)(scope);
    scope.$digest();
  }));

  it('should be called with the correct params', function(){

    //reading the isolated scope
    var isolatedScope = element.isolateScope();

    var product = isolatedScope.products[0];

    isolatedScope.addToCart(product);

    expect(mockService.add).toHaveBeenCalled();
    expect(mockService.add).toHaveBeenCalledWith(product);
  });
});
