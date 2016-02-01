'use strict';

angular.module('authenticatorApp')
  .controller('MainCtrl', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {

    var qrCodes = {};
    $scope.accounts = [];
    $scope.timeLeft = 0;
    $scope.needsUpdating = true;
    $scope.showAddAccount = false;
    $scope.showAddForm = false;
    $scope.addAccountForm = {};

    function processAccount(account) {
      account.showQR = false;
      if (qrCodes[account._id] !== null && qrCodes[account._id] !== undefined) {
        account.qrcode = qrCodes[account._id].code;
        account.showQR = qrCodes[account._id].visible;
      }

      // $scope.accounts.push(account);
      return account;
    }

    $scope.deleteAccount = function(account) {
      $http.delete('/api/accounts/' + account._id);
      var index = $scope.accounts.indexOf(account);
      if (index > -1) {
        $scope.accounts.splice(index, 1);
      }
    };

    $scope.addAccount = function() {
      $http.post('/api/accounts', $scope.addAccountForm)
        .then(function(response) {
          var account = processAccount(response.data);
          $scope.accounts.push(account);
        }, function(errorResponse) {
          // todo: display an overlay saying that account was not added for a specific reason
        });
        $scope.addAccountForm = {};
    };

    $scope.toggleQR = function(account) {
      account.showQR = !account.showQR;
      if (qrCodes[account._id] !== null && qrCodes[account._id] !== undefined) {
        qrCodes[account._id].visible = account.showQR;
      }

      if (account.qrcode === null || account.qrcode === undefined) {
        $http.get('/api/accounts/qrcode/' + account._id)
          .success(function(result) {
            var qrCode = 'data:image/png;base64,' + result;
            qrCodes[account._id] = {code: qrCode, visible: account.showQR };
            account.qrcode = qrCode;

          }
        );
      }
    };

    $scope.$watch('needsUpdating', function(newVal) {
      if (newVal === false) {
        return;
      }
      $http.get('/api/accounts').success(function(accounts) {
        $scope.accounts = accounts;
        $scope.accounts.forEach(function(account) {
          processAccount(account);
        });
      });

    });

    var countdownTimer = $interval(function() {
      var epoch = Math.round(new Date().getTime() / 1000.0);
      $scope.timeLeft = 30 - (epoch % 30);
      $scope.needsUpdating = (epoch % 30 === 0);
    }, 1000, 0, true);

    $scope.$on('$destroy', function() {
      $interval.cancel(countdownTimer);
    });

  }]);
