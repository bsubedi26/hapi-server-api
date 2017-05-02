import aguid from 'aguid';
import Boom from 'boom';
import Joi from'joi';
import Promise from 'bluebird';
import bcrypt from 'bcrypt';
import User from '../models/User';
import config from '../config';
const bcryptAsync = Promise.promisifyAll(bcrypt);

export default {
	login: {
		auth: false,
		validate: {
			payload: {
				password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).required(),
				email: Joi.string().email().required()
			}
		},
		handler: async function (request, reply) {
				const user = await User.findOne({email: request.payload.email}).exec();
				if (!user) {
					throw Boom.unauthorized('Username is incorrect. Please login again.');
				} else {
					// check if password is valid by using bcrypt compare
					const valid = await bcryptAsync.compareAsync(request.payload.password, user.password);
					// if it is valid, construct a cookie options since we use cookie to store the access token
					if (valid) {
						// sign the token
						const sessionId = aguid();
						const session = await request.server.methodsAsync.getSession(sessionId, {id: sessionId, userId: user.id, role: user.role});
						const token = await request.server.methodsAsync.sign(session);
						const {urlKey} = config.auth;
						const {key: csrfKey} = config.csrf;
						
						return reply({[urlKey]: token, [csrfKey]: request.plugins.crumb}).header('Authorization', token);
						// DO NOT SET COOKIE TO PREVENT XSRF ATTACK
						// .state(cookieKey, token, request.cookieOptions);
					}
					throw Boom.unauthorized('Password is incorrect. Please login again.');
				}
			}
	},
	logout: {
		auth: 'jwt',
		handler: {
			async: async function (request, reply) {
				await request.server.methodsAsync.getSession.cache.dropAsync(request.auth.credentials.id);
				return reply('Successfully logout');
			}
		}
	}
};