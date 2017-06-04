import Knex from '../knex';

const AppRoutes = function (server, options, next) {
  server.route(
    {
      method: 'GET',
      path: '/',
      config: {
        auth: false,
        description: 'return index html page',
        handler: (request, reply) => {
          reply.view('index', {
            hi: 'sent'
          });
          // reply({ done: 'index' });
        },
      }
    }
  )


  server.route(
    {
      method: 'GET',
      path: '/birds',
      config: {
        auth: false,
        // auth: { strategy: 'jwt' },
        description: 'return bird data',
        handler: (request, reply) => {

          // In general, the Knex operation is like Knex('TABLE_NAME').where(...).chainable(...).then(...)
          const getOperation = Knex('birds').where({

            isPublic: true

          }).select('name', 'species', 'picture_url').then((results) => {

            if (!results || results.length === 0) {

              reply({
                error: true,
                errMessage: 'no public bird found',

              });

            }

            reply({

              dataCount: results.length,
              data: results,

            });

          }).catch((err) => {

            reply('server-side error');

          });

        },
      }
    }
  )



  server.route({

    path: '/auth',
    method: 'POST',
    handler: (request, reply) => {

      // This is a ES6 standard
      const { username, password } = request.payload;

      const getOperation = Knex('users').where({
        username: username
      }).select('guid', 'password').then((results) => {

      }).catch((err) => {

        reply('server-side error');

      });

    }

  });



  next();
}

AppRoutes.attributes = {
  pkg: {
    "name": "AppRoutes",
    "version": "1.0.0"
  }
};

export default AppRoutes;