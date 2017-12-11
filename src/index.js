const Hapi = require('hapi')
const config = require('./config')
const { host, port } = config.server
const Routes = require('./routes')

const server = new Hapi.Server({  
  host,
  port
})

const registerPlugins = async (server) => {
  // await server.register({ plugin: require('./module/user') })
  // await server.register({ plugin: require('./plugin/auth') })
}


const registerRoutes = async (server) => {
  server.route(Routes.endpoints)
}

const main = async () => {
  try {      
    // await registerPlugins(server)
    await registerRoutes(server)

    await server.start()
    console.log('Server is listening on ' + server.info.uri.toLowerCase())
    server.app.config = config
    // console.log(server.app.config)
  }
  catch (err) {  
    console.error(err)
    process.exit(1)
  }
}


main()