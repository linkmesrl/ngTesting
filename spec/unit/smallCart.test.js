describe('The smallCart Directive', function () {

  var element, scope, cartService;

  // injecting main module
  beforeEach(module('groceryStore'));

  // injecting and bootstrapping the directive
  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile('<small-cart></small-cart>')(scope);
  }));

  it('should show 0 element in cart', function () {
    // should trigger a $digest cicle to render the directive
    scope.$digest();
    expect(element.find('span').text()).toEqual('0 Items in cart');
  });

  describe('when mocking listService', function(){
   
    // this let us to inject a service and mock some properties
    beforeEach(inject(function(_cartService_, $compile, $rootScope){
        cartService = _cartService_;
        cartService.cart = ['banana', 'apple'];
        scope = $rootScope.$new();
        element = $compile('<small-cart></small-cart>')(scope);
      })
    );

    it('should show 2 element in cart', function(){
      // should trigger a $digest cicle to render the directive
      scope.$digest();
      expect(element.find('span').text()).toEqual('2 Items in cart');
    });
  });
});
