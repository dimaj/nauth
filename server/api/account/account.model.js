'use strict';

var hotp = require('notp').hotp
    , b32 = require('thirty-two')
    ;

module.exports = function(sequelize, DataTypes) {
  var Account = sequelize.define('Account', {
    provider: DataTypes.STRING
    , secret: DataTypes.STRING
    , email: DataTypes.BOOLEAN
    , qrURL: {
      type: DataTypes.VIRTUAL
      , get: function() {
        return 'otpauth://totp/' + this.email +
               '?secret=' + this.secret +
               '&issuer=' + this.provider;

      }
    }
  }
  , {
    instanceMethods: {
      totpCode: function(counter) {
        var decodedSecret = b32.decode(this.getDataValue('secret'));
        return hotp.gen(decodedSecret, { counter: counter });
      }
    }
  }
);

  // Account
  //   .sync({force: true})
  //   .then(function (){
  //     return Account.create({
  //       title: 'title',
  //       info: 'info',
  //       active: true
  //     });
  //   });

  Account.sync();
  return Account;
};
