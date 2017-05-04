import good from 'good';

const goodConsolePlugin = async (server, options, next) => {
  const goodOptions = {
    reporters: {
      myConsoleReporter: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ log: '*', response: '*', error: '*', request: '*' }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  };

  await server.register({
    register: good,
    options: goodOptions
  })
  next();
};

goodConsolePlugin.attributes = {
  pkg: {
    "name": "GoodConsolePlugin",
    "version": "1.0.0"
  }
};

export default goodConsolePlugin;