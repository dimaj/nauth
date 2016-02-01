'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('authenticatorApp'));

  var MainCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/accounts')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of accounts to the scope', function () {
    $httpBackend.flush();
    expect(scope.accounts.length).toBe(4);
  });
});
