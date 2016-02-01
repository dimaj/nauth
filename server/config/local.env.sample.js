'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  // port on which this server is going to be running on
  PORT: 9000
  // IP address on which this server is going to be running on
  , IP: 'localhost'
  // NTP host ot synchronize time with
  , NTP_HOST: 'pool.ntp.org'
  // Port number for time sync
  , NTP_PORT: 123
  // Should browser be auto-launched on application boot
  , OPEN_BROWSER: true
  // Database configuration
  // Please refer to sequelize docs for more info
  // http://docs.sequelizejs.com/en/latest/api/sequelize/
  , DATABASE: {
    dialect: 'sqlite'
    , storage: './authenticator.db'
  }

  // Control debug level for modules using visionmedia/debug
  , DEBUG: ''
};
