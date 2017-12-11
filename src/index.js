const Hapi = require('hapi')

const server = new Hapi.Server({  
  host: 'localhost',
  port: 3030
})

const main = async () => {
  try {      
    await server.register({ plugin: require('./plugin/auth') })
    await server.register({ plugin: require('./module/user') })

    await server.start()
    console.log('✅  Server is listening on ' + server.info.uri.toLowerCase())
  }
  catch (err) {  
    console.error(err)
    process.exit(1)
  }
}


main()
