import routes from './user.routes';

const UserPlugin = function (server, options, next) {
  
  server.route(routes)
  // server.route({ 
  //   path: '/about',
  //   method: 'GET',
  //   handler: require('./routes/about')
  // });
 
  next();
 
};
 
UserPlugin.attributes = {
  pkg: {
    "name": "UserPlugin",
    "version": "1.0.0"
  }
};

export default UserPlugin