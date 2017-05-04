'use strict';

const Hapi = require('hapi');
const Blipp = require('blipp');
const Inert = require('inert');
const Vision = require('vision');
const Swagger = require('swagger-client');
const HapiSwagger = require('hapi-swagger');
const Glue = require('glue');
const statusMonitor = require('hapijs-status-monitor');

const config = require('./config');
import manifest from './manifest';
import UserPlugin from './modules/user';
import goodConsolePlugin from './modules/good-console';

const server = new Hapi.Server();
Glue.compose(manifest, (err, server) => {
  server.register([
    { register: Blipp, options: { showAuth: true } },
    Inert,
    Vision,
    { register: HapiSwagger, options: config.swaggerOptions },
    statusMonitor,
    UserPlugin,
    goodConsolePlugin
  ], (err) => {
    if (err) throw err;
    server.views({
      engines: { html: require('handlebars') },
      path: __dirname + '/views'
    });


    server.route({
      method: 'GET',
      path: '/',
      handler: (request, reply) => {
        console.log(Object.keys(server.methods))
        server.methods.checkAsync()
        reply({})
      }
    })

    server.route({
      method: 'GET',
      path: '/2',
      handler: (request, reply) => {
        console.log('second')
        reply({})
      }
    })

    server.start((err) => {
      if (err) throw err;
      console.log('Server running at:', server.info.uri);
    });
  });

});