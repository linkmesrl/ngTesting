'use strict';

describe('The pagination filter', function () {

  var $filter;

  beforeEach(function () {
    module('groceryStore');

    inject(function (_$filter_) {
      $filter = _$filter_;
    });
  });

  it('should return element from given to the end', function () {
    // Arrange.
    var list = ['a', 'b', 'c', 'd'], result;

    // call the filter function
    result = $filter('pagination')(list, 2);

    // Assert.
    expect(result).toEqual(['c', 'd']);
  });
});
