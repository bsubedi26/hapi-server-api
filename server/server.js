'use strict';

const Hapi = require('hapi');
const Blipp = require('blipp');
const Joi = require('joi');
const Inert = require('inert');
const Vision = require('vision');
const Swagger = require('swagger-client');
const HapiSwagger = require('hapi-swagger');

const config = require('./config');
import routes from './routes';
let server = new Hapi.Server();
server.connection(config.connect);
server.route(routes);
server.register([
  // blipp is a simple hapi plugin that displays all the routes
  { register: Blipp, options: { showAuth: true } },
  // inert is a static file and directory handler plugin 
  // that provides new handler methods for serving static files and directories
  Inert,
  // templates rendering plugin support
  Vision,
  // hapi swagger is a swagger interface for HAPI
  { register: HapiSwagger, options: config.swaggerOptions }
], (err) => {
  if (err) throw err;
  server.views({
    engines: { html: require('handlebars') },
    path: __dirname + '/views'
  });

  server.start((err) => {
    if (err) throw err;
    console.log('Server running at:', server.info.uri);
  });
});