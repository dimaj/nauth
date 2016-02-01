/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Account = require('../api/account/account.model');

console.log("Account is: " + Account.constructor.name);
console.log(Account);
Account.find({}).remove(function() {
  Account.create(
    {
      provider: 'Google'
      , secret: 'google_secret'
      , email: 'email@address.com'
    }
    , {
      provider: 'Yahoo'
      , secret: 'yahoo_secret'
      , email: 'email@address.com'
    }
  );
});
