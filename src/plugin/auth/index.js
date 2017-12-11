const auth = require('hapi-auth-basic')
const users = require('./users')

exports.plugin = {
  register: async (server, options) => {
    await server.register(auth)
    server.auth.strategy('simple', 'basic', { validate })
    server.auth.default('simple')

  },

  pkg: {
    "name": "auth",
    "version": "1.0.0"
  }
}

const validate = async (request, username, password, h) => {

  const user = users[username];
  if (!user) {
    return { credentials: null, isValid: false }
  }

  const isValid = await compare(password, user.password);
  const credentials = { id: user.id, username: user.username };
  return { isValid, credentials };
};

const compare = (incomingPass, userPass) => {
  return new Promise(resolve => {
   const isValid = (incomingPass === userPass) ? true : false

   resolve(isValid)
  })
}