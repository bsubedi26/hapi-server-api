'use strict';

const Joi = require('joi');

const defaultHandler = function (request, reply) {
  let a = parseFloat(request.params.a);
  let b = parseFloat(request.params.b);
  reply({
    'a': a,
    'b': b,
    'operator': '+',
    'equals': a + b,
    'created': new Date().toISOString(),
    'modified': new Date().toISOString()
  });
};

export default [
  {
    method: 'GET',
    path: '/',
    config: {
      description: 'return index html page',
      handler: (request, reply) => {
        reply.view('index');
      },
    }
  },
  {
    method: 'PUT',
    path: '/sum/add/{a}/{b}',
    config: {
      handler: defaultHandler,
      description: 'Add',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          'id': 'add'  // refer to notes above
        }
      },
      validate: {
        params: {
          a: Joi.number()
            .required()
            .description('the first number'),

          b: Joi.number()
            .required()
            .description('the second number')
        }
      }

    }
  }, {
    method: 'PUT',
    path: '/math/add/{a}/{b}',
    config: {
      handler: defaultHandler,
      description: 'Add',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          'id': 'add' // refer to notes above
        }
      },
      validate: {
        params: {
          a: Joi.number()
            .required()
            .description('the first number'),

          b: Joi.number()
            .required()
            .description('the second number')
        }
      }

    }
  }, {
    method: 'PUT',
    path: '/mathematics/add/{a}/{b}',
    config: {
      handler: defaultHandler,
      description: 'Add',
      tags: ['api'],
      validate: {
        params: {
          a: Joi.number()
            .required()
            .description('the first number'),

          b: Joi.number()
            .required()
            .description('the second number')
        }
      }

    }
  }, {
    method: 'GET',
    path: '/another/one/{a}/{b}',
    config: {
      handler: defaultHandler,
      description: 'Add',
      tags: ['api'],
      validate: {
        params: {
          a: Joi.number()
            .required()
            .description('the first number'),

          b: Joi.number()
            .required()
            .description('the second number')
        }
      }

    }
  }
]