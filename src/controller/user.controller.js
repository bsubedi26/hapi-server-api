const Joi = require('joi'),
  Boom = require('boom'),
  Common = require('./common'),
  Config = require('../config'),
  // knex = require('../config/knex'),
  Jwt = require('jsonwebtoken');
  // User = require('../model/user.model');

const User = {}
const privateKey = Config.key.privateKey;

const beforeGet = (request, h) => {
  console.log('before get')
  return 'from beforeGet'
}

exports.get = {
  pre: [
    { assign: 'method1', method: beforeGet }
  ],
  handler: (request, h) => {
    // console.log('pre returns: ', request.pre.method1)
    // console.log(Object.keys(request.server.app))
    // console.log(server.app.config)
    console.log(Object.keys(request.db))
    console.log(Object.keys(request.db.collections))
    console.log(Object.keys(request.db.models))
    return 'dne'
    // return request.db.select().table('user')
  }
}

exports.create = {
  validate: {
    payload: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  },
  handler: (request, h) => {
    const { payload, knex } = request
    // payload.password = Common.encrypt(payload.password)
    const response = knex.insert(payload).into('user').returning('*')
    response.then(res => {
      console.log(res)
      return res
    })
    .catch(res => {
      console.log(res)
    })
    // return response
  }
}

exports.createOld = {
  validate: {
    payload: {
      userName: Joi.string().email().required(),
      password: Joi.string().required()
    }
  },
  handler: function (request, reply) {
    request.payload.password = Common.encrypt(request.payload.password);
    request.payload.scope = "Customer";
    User.saveUser(request.payload, function (err, user) {
      if (!err) {
        let tokenData = {
          userName: user.userName,
          scope: [user.scope],
          id: user._id
        };
        Common.sentMailVerificationLink(user, Jwt.sign(tokenData, privateKey));
        reply("Please confirm your email id by clicking on link in email");
      } else {
        if (11000 === err.code || 11001 === err.code) {
          reply(Boom.forbidden("please provide another user email"));
        } else reply(Boom.forbidden(err)); // HTTP 403
      }
    });
  }
};

exports.login = {
  validate: {
    payload: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  },
  handler: function (request, h) {
    const { email } = request.payload
    User.find({ email }, function (err, user) {
      console.log('ERR ', err)
      console.log('USER ', user)
      if (!err) {
        if (user === null) { return Boom.forbidden("invalid username or password") }

        if (request.payload.password === Common.decrypt(user.password)) {

          if (!user.isVerified) {
            return "Your email address is not verified. please verify your email address to proceed"
          }

          let tokenData = {
            userName: user.userName,
            scope: [user.scope],
            id: user._id
          };
          let res = {
            username: user.userName,
            scope: user.scope,
            token: Jwt.sign(tokenData, privateKey)
          };

          // reply(res);
          return res;
        } else { return Boom.forbidden("invalid username or password") }
      } else {
        if (11000 === err.code || 11001 === err.code) {
          // reply(Boom.forbidden("please provide another user email"));
          return Boom.forbidden("please provide another user email")
        } else {
          console.error(err);
          // return reply(Boom.badImplementation(err));
          return Boom.badImplementation(err)
        }
      }
    });
  }
};

exports.resendVerificationEmail = {
  validate: {
    payload: {
      userName: Joi.string().email().required(),
      password: Joi.string().required()
    }
  },
  handler: function (request, reply) {
    User.findUser(request.payload.userName, function (err, user) {
      if (!err) {
        if (user === null) return reply(Boom.forbidden("invalid username or password"));
        if (request.payload.password === Common.decrypt(user.password)) {

          if (user.isVerified) return reply("your email address is already verified");

          let tokenData = {
            userName: user.userName,
            scope: [user.scope],
            id: user._id
          };
          Common.sentMailVerificationLink(user, Jwt.sign(tokenData, privateKey));
          reply("account verification link is sucessfully send to an email id");
        } else reply(Boom.forbidden("invalid username or password"));
      } else {
        console.error(err);
        return reply(Boom.badImplementation(err));
      }
    });
  }
};

exports.forgotPassword = {
  validate: {
    payload: {
      userName: Joi.string().email().required()
    }
  },
  handler: function (request, reply) {
    User.findUser(request.payload.userName, function (err, user) {
      if (!err) {
        if (user === null) return reply(Boom.forbidden("invalid username"));
        Common.sentMailForgotPassword(user);
        reply("password is send to registered email id");
      } else {
        console.error(err);
        return reply(Boom.badImplementation(err));
      }
    });
  }
};

exports.verifyEmail = {
  handler: function (request, reply) {
    Jwt.verify(request.headers.authorization.split(" ")[1], privateKey, function (err, decoded) {
      if (decoded === undefined) return reply(Boom.forbidden("invalid verification link"));
      if (decoded.scope[0] != "Customer") return reply(Boom.forbidden("invalid verification link"));
      User.findUserByIdAndUserName(decoded.id, decoded.userName, function (err, user) {
        if (err) {
          console.error(err);
          return reply(Boom.badImplementation(err));
        }
        if (user === null) return reply(Boom.forbidden("invalid verification link"));
        if (user.isVerified === true) return reply(Boom.forbidden("account is already verified"));
        user.isVerified = true;
        User.updateUser(user, function (err, user) {
          if (err) {
            console.error(err);
            return reply(Boom.badImplementation(err));
          }
          return reply("account sucessfully verified");

        })
      })

    });
  }
};