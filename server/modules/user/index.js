import routes from './user.routes';
import { checkAsync, verifyUniqueUser, createUser, createToken } from './user.method';

const UserPlugin = function (server, options, next) {
  
  server.route(routes);
  server.method("checkAsync", checkAsync)
  server.method("verifyUniqueUser", verifyUniqueUser)
  server.method("createUser", createUser)
  server.method("createToken", createToken)
  next()
};
 
UserPlugin.attributes = {
  pkg: {
    "name": "UserPlugin",
    "version": "1.0.0"
  }
};

export default UserPlugin;