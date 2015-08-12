describe('Cart Service', function () {

  var cartService;

  // load the application module
  beforeEach(module('groceryStore'));

  // inject the cartService
  beforeEach(inject(function (_cartService_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    cartService = _cartService_;
  }));

  describe('the add function', function () {

    it('should add an item to the list', function () {

      // check that cart is empty
      expect(cartService.cart.length).toEqual(0);

      // add a product
      cartService.add({category: 'Fruits', name: 'Apple', quantity: 12});

      // check the result
      expect(cartService.cart.length).toEqual(1);
      expect(cartService.cart[0].name).toEqual('Apple');
      expect(cartService.cart[0].quantity).toEqual(12);
    });
  });

  describe('the remove function', function () {
    it('should remove an item from the list', function() {

      // mock the cart
      cartService.cart = ['apple', 'banana'];

      // remove the first product
      cartService.remove(0);

      // check the result
      expect(cartService.cart.length).toEqual(1);
      expect(cartService.cart[0]).toEqual('banana');

    });

  });

});
