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
