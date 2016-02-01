'use strict';

var _ = require('lodash')
    , b32 = require('thirty-two')
    , notp = require('notp')
    , app = require('../../config/express')
    , ntp = require('ntp-client')
    , diff = 0
    , qr = require('qr-image')
    , b64s = require('base64-stream')
    ;

var getTimeDiff = function() {
  // get the time diffrence between NTP server and local system
  ntp.getNetworkTime(process.env.NTP_HOST, process.env.NTP_PORT, function(err, date) {
      if(err) {
          console.error(err);
          return;
      }

      var now = Date.now();
      date = date.getTime();
      console.log('NTP: ' + date);
      console.log('System: ' + now);
      diff = now - date;
      console.log('DIFF: ' + diff);
  });
}

function getAccount(req){
  return req.app.get('models').Account;
}

function handleError(res, err) {
  return res.status(500).send(err);
}

function getAccountJson(account, counter) {
  if (counter === null || counter === undefined) {
    counter = Math.floor((Date.now() - diff) / 1000 / 30);
  }

  return {
    provider: account.provider
    , _id: account.id
    , code: account.totpCode(counter)
  }
}
// Get list of accounts
exports.index = function(req, res) {
  var counter = Math.floor((Date.now() - diff) / 1000 / 30);

  getAccount(req)
    .findAll()
    .then(function (accounts) {
      var modifiedAccounts = [];
      try {
        accounts.forEach(function(account) {
          modifiedAccounts.push(getAccountJson(account, counter));
        });
      }
      catch (e) {
        console.trace(e);
      }

      return res.status(200).json(modifiedAccounts);
    })
    .catch(function (err){
      if(err) { return handleError(res, err); }
    });
};

// Creates a new account in the DB.
exports.create = function(req, res) {
  getAccount(req)
    .create(req.body)
    .then(function (account) {
      return res.status(201).json(getAccountJson(account));
    })
    .catch(function (err){
      if(err) { return handleError(res, err); }
    });
};

// Deletes a account from the DB.
exports.destroy = function(req, res) {
  getAccount(req)
    .findById(req.params.id)
    .then(function (account) {
      if(!account) { return res.status(404).send('Not Found'); }
      account.destroy(function(err) {
        if(err) { return handleError(res, err); }
        return res.status(204).send('No Content');
      });
    })
    .catch(function (err){
      if(err) { return handleError(res, err); }
    });
};

exports.qrCode = function(req, res) {
  getAccount(req)
    .findById(req.params.id)
    .then(function(account) {
      if(!account) { return res.status(404).send('Not Found'); }
      var img = qr.image(account.qrURL, { type: 'png', ec_level: 'L' });
      res.writeHead(200);
      img.pipe(b64s.encode()).pipe(res)
    })
    .catch(function(err) {
      if (err) { return handleError(res, err); }
    });
};
