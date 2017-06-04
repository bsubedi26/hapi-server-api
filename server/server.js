'use strict';

const Hapi = require('hapi');
const Blipp = require('blipp');
const Inert = require('inert');
const Vision = require('vision');
const Swagger = require('swagger-client');
const HapiSwagger = require('hapi-swagger');
const Glue = require('glue');
const statusMonitor = require('hapijs-status-monitor');

const config = require('./config/app.config');
import AppRoutes from './routes/index.route';

import manifest from './config/manifest';
import UserPlugin from './modules/user';
import goodConsolePlugin from './plugins/good-console';
import * as hapiJwtPlugin from './plugins/hapi-jwt-auth';

////////////////////////////////////////////////////////////
// START SERVER
const server = new Hapi.Server();
Glue.compose(manifest, (err, server) => {
  server.register([
    { register: Blipp, options: { showAuth: true } },
    Inert,
    Vision,
    AppRoutes,
    hapiJwtPlugin,
    { register: HapiSwagger, options: config.swaggerOptions },
    statusMonitor,
    UserPlugin,
    goodConsolePlugin
  ], (err) => {
    if (err) throw err;
    server.views({
      engines: { html: require('handlebars') },
      relativeTo: __dirname,
      path: './views',
      // layoutPath: './views/layouts'
      // helpersPath: './views/helpers'
    });

    server.start((err) => {
      if (err) throw err;
      console.log('Server running at:', server.info.uri);

    });
  });

});