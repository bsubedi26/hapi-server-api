'use strict';

const Joi = require('joi');


import users from '../controllers/user.controller';

export default [
	{method: 'POST', path: '/api/user/create', config: users.createOne},
    {
    method: 'GET',
    path: '/route/user',
    config: {
      tags: ['api'],
      handler: (request, reply) => {
        reply('Welcome to / route.', request.query)
        console.log(request.query)
      },
      validate: {
        query: {
          hour: Joi.number()
          // minute: validator.number().min(0).max(59).with('hour')
        }
      }
    }
  },
	// {method: 'GET', path: '/users/{userId}', config: users.readOne},
	// {method: 'PUT', path: '/users/{userId}', config: users.updateOne},
	// {method: 'DELETE', path: '/users/{userId}', config: users.deleteOne},

	// {method: 'GET', path: '/users', config: users.read}
];

// const defaultHandler = function (request, reply) {
//   reply({
//     'done': 'success',
//     statusCode: 200,
//     message: 'reply from default user handler',
//     'created': new Date().toISOString()
//   });

// };


// var userRoutes = [
//   {
//     method: 'GET',
//     path: '/api/user',
//     handler: (request, reply) => {
//       reply('Welcome to /api/user route.')
//     },
//     config: {
//       // Include this API in swagger documentation
//       tags: ['api'],
//       // description: 'Get All User data',
//       // notes: 'Get All User data',
//       validate: {
//         query: {
//           hour: Joi.number()
//           // minute: validator.number().min(0).max(59).with('hour')
//         }
//       }
//     }
//   },
//   {
//     method: 'GET',
//     path: '/api/user/login',
//     handler: defaultHandler,
//     config: {
//       tags: ['api'],
//       description: 'user login description',
//       plugins: {
//         'hapi-swagger': {
//           'id': 'user login plugin id'  // refer to notes above
//         }
//       },
//       // validate: {
//       //   params: {
//       //     a: Joi.number()
//       //       .required()
//       //       .description('the first number'),

//       //     b: Joi.number()
//       //       .required()
//       //       .description('the second number')
//       //   }
//       // }

//     }
//   }, 
// ]