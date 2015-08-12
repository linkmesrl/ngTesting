# ngTesting

This is an example application to be tested with **Karma** and **Protractor**

## Start the app

Clone the repository

Run `npm install`

Run `npm start`

## Check for errors

Run `npm run lint`

## Setting Up the environment for Karma

In order to execute Unit Tests we need:

- A test runner (Karma)
- An assertion library (Jasmine)
- A browser in which run the tests (PhantomJs)
- A configuration File
- One spec (at least)
- A script to run the test

To install the necessary tools run:

`npm install jasmine-core karma karma-jasmine karma-mocha-reporter karma-ng-html2js-preprocessor karma-phantomjs-launcher phantomjs --save-dev`

### Create a Spec Folder

Create a new folder to hold your spec:

`mkdir spec; mkdir spec/unit`

### The Karma configuration file

It is possible to automatically generate this file with `karma init`, for more information visit: http://karma-runner.github.io/0.8/intro/configuration.html

You will be asked for:

- Assertion Framework (jasmine)
- Usage of require.js (no)
- Browser (PhantomJs)
- Files Location (src/js/**/*.js) then add the other location later
    + _You need to add, all the files (framework, modules, scripts, test)_
- Exclude files (empty)
- Watch (yes)

#### Some improvement to the generated config

Set a `basePath` to `./`

Add this files to the list:

- `'src/vendor/angular/angular.min.js',`
- `'src/vendor/angular-route/angular-route.min.js',`
- `'src/vendor/angular-google-maps/dist/angular-google-maps.min.js',`
- `'src/vendor/lodash/lodash.min.js',`
- `'src/vendor/angular-mocks/angular-mocks.js',`
- `'src/js/main.js',`
- `'src/js/*.js',`
- `'spec/unit/*.test.js'`

Change the reporte from `progress` to `mocha`

### Create the default `npm test` script

In the `package.json` file, within the `scripts` section, add:

`"test": "karma start"`

### Running the tests

As you have defined a `npm test` script, you can execute your test with this command, if everything has worked you should see:

![Karma message for working tests](./readme_assets/testEnv.png)

## Our first Spec / Testing a Controller

Create a `listCtrl.test.js` in `spec/unit` folder.

In oder to test the `addProduct()` function, so the step we need to do are:

- Load the module before any test
- Inject the `$controller` mock before any test
- Setup our `listController` with a mocked `$scope`
- Trigger the `addProduct()` function
- Check for the expected result

## Testing a Service

Create a `cartService.test.js` in `spec/unit` folder.

In order to test `add()` and `remove()` function, we need to:

- Load the module before any test
- Inject the service to be tested
- Trigger the functions
- Check for the expected result

## Testing Directives

Create a `smallCart.test.js` in `spec/unit` folder.

In order to test a `directive` we need to **compile** the template and to force a **digest** cicle, so hour steps are:

- Load the module before any test
- Inject and compile the directive
- Force a digest cicle
- Check for the expected result

### Mocking angular service

As this directive is using `cartService` to retrieve cart data, we should mock it to run our tests in Isolation. To mock the service our steps are:

- Inject `cartService`
- Mock out `.cart` data

### Testing directives with an external template

To test a `directive` that use an external `html` template, the easiest way is to use angular's `$templateCache` service with a prepocessor called: **ng-html2js** (_it was installed with `npm install karma-ng-html2js-preprocessor`_).

Basically it loads our `templates` and create an angular module that provide them to the tests.

In `karma.conf.js` add:

```
    files: [
        ...,
        // load the html files
        // they have to be preprocessed and cached
        'src/views/**/*.html'
    ],

    preprocessors: {
      'src/views/**/*.html': 'ng-html2js'
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/', //strip the src path from template url (http://stackoverflow.com/questions/22869668/karma-unexpected-request-when-testing-angular-directive-even-with-ng-html2js)
      moduleName: 'templates' // define the template module name
    },
```

### Passing attributes to Directives

Often Angular's directive grab their data trough an `isolatedScope`, and the data are provided as `attributes`.

When testing this type of directive we should remember to mock this data to test different cases. To achieve this goal we need to mock the `scope` that is passed to the `$compile` service, and (_obviously_) to pass the attributes.

Here an example:
```
scope = $rootScope.$new();
scope.products = [...];
scope.pageSize = 2;

element = angular.element('<product-list products="products" page-size="{{pageSize}}"></product-list>');

$compile(element)(scope);
```

#### Accessing Isolated Scope

To access the directive's `isolatedScope`, Angular provide us an helper method that can be called after the `$compile` and the `$digest`, that is:

`var isolatedScope = element.isolateScope();`

We can use this method to read the directive `scope` values and check out expectations.

## Spy On external function

We should run our test in `isolated` context, but for sure wee need to test that our calls to external `methods`, such as `services`, are done with the correct parameters.

Jasmine provide a `spyOn` method that let us check this, the steps are:

- Mock the external service
- Mock the function with a `spy`
- Check the `spy`

## Mocking the Backend

In a context of `isolation` is a good idea to mock all the `http` request from our application. In this way our tests will not depend on the backend status.

Angular provide a service called `$httpBackend` that is intended to mock our request, and it can be configured in this way:

```
beforeEach(inject(function($http, $rootScope){
    rootScope = $rootScope;
    http = $http;
}));

beforeEach(inject(function($httpBackend){
    $httpBackend.when('GET', 'url')
        .respond(status, data);
}));
```

This is also a good method to test server errors handling, providing fake responses.