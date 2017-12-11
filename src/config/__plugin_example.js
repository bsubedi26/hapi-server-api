exports.plugin = {  
  register: (server, options) => {
    server.ext('onRequest', function (request, h) {
      console.log('server.ext >> onRequest')
      return h.continue
    });

    const pre3 = (request, h) => {
      // request.a = 'wo'
      console.log('pre3 for /')
      return h.continue
    }

    server.route({
      method: 'GET',
      path: '/user',
      handler: (request, h) => {
        // console.log(Object.keys(request.server.app))
        // console.log(server.app.config)
        return '/user'
      },
      options: {
        // auth: 'simple'
      }
    })
    server.route({
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        return '/'
      },
      options: {
        pre: [
          { method: pre3, assign: 'm3' },
        ]
      }
    })

    
  },
  pkg: {
    "name": "user",
    "version": "1.0.0"
  }
}
