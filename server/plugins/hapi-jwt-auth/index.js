'use strict';

const Promise = require('bluebird');
const jwt = require('hapi-auth-jwt2');

// const db = require('./database');

exports.register = (server, options, next) => {
  server.register(jwt, registerAuth);

  function registerAuth(err) {
    if (err) { return next(err); }

    server.auth.strategy('jwt', 'jwt', {
      key: process.env.JWT || 'stubJWT',
      validateFunc: validate,
      verifyOptions: { algorithms: ['HS256'] }
    });

    server.auth.default('jwt');

    return next();
  }

  // bring your own validation function
  function validate(decoded, request, callback) {
    // do your checks to see if the person is valid
    if (!people[decoded.id]) {
      return callback(null, false);
    }
    else {
      return callback(null, true);
    }
  };
};

exports.register.attributes = {
  name: 'auth-jwt',
  version: '1.0.0'
};