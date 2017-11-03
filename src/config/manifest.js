// Glue.compose(manifest) is equivalent to:
// server = new Hapi.Server(Options)
// one or more server.connection(Options)
// zero or more server.register(Plugin, Options)
// calling each based on the configuration generated from the Glue manifest.
const restHapi = require('rest-hapi');
const path = require('path');

restHapi.config.modelPath = path.resolve(__dirname, '../models');
restHapi.config.absoluteModelPath = true;

const manifest = {
  connections: [
    {
      host: 'localhost',
      port: 3030,
      routes: {
        cors: true
      },
      router: {
        stripTrailingSlash: true
      }
    }
  ],
  registrations: [
    {
      plugin: {
        register: 'blipp',
        options: {
          showAuth: true
        }
      }
    },
    {
      plugin: {
        register: 'rest-hapi',
        options: {
          mongoose: require('mongoose'),
        }
      }
    },
    {
      plugin: 'hapijs-status-monitor'
    },
    {
      plugin: 'inert'
    },
    {
      plugin: 'vision'
    },
    {
      plugin: 'hapi-swagger'
    },
    {
      plugin: 'hapi-auth-jwt2'
    },
    {
      plugin: './plugins/auth'
    },
    {
      plugin: './api',
      options: { routes: { prefix: '/api' } }
    },
    {
      plugin: {
        register: 'good',
        options: {
          ops: { interval: 60000 },
          reporters: {
            console: [
              { module: 'good-squeeze', name: 'Squeeze', args: [{ error: '*' }] }, { module: 'good-console' }, 'stdout'
            ]
          }
        }
      }
    }
  ]
};

module.exports = manifest;