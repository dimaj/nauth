'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/authenticator-dev'
  },

  // Postgres connection options
  postgres: {
    uri: process.env.POSTGRES_URL ||
         'postgres://user:pass@localhost:5432/authenticator'
  },
  database: 'test',
  username: 'postgres',
  password: 'root',
  seedDB: true
};

console.log('In development');
