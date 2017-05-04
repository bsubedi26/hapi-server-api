import Joi from 'Joi';
import Boom from 'boom';
import User from './user.model';
import * as bcrypt from 'bcrypt';
import { secret } from '../../config';
import { sign } from 'jsonwebtoken';
import util from 'util';

const error = {
	userNotFound: 'The user name %s does not exist.',
	userListNotFound: 'Unable to obtain user list.',
	unableToUpdateOtherUser: 'You are unable to update other user.',
	emailDuplicate: 'The email address %s is already used.',
	passwordNotMatched: 'Sorry, the password does not match the username'
};
const validator = {
	username: Joi.string(),
	password: Joi.string()
};


export default class UserController {
	attemptRegister() {
		return {
			validate: {
				payload: {
					username: validator.username.required(),
					password: validator.password.required()
				}
			},
			handler: async (request, reply) => {
				const { username, password } = request.payload
				try {
					const usernameAvailable = await request.server.methods.verifyUniqueUser(username)
					console.log('Is the username available? ', usernameAvailable)
					if (usernameAvailable === true) {
						console.log('username is available -> try to create')
						const newDoc = await request.server.methods.createUser(username, password)
						reply(newDoc).code(201)
					} else {
						return reply(Boom.badRequest(util.format(error.emailDuplicate, username)));
					}
				}
				catch (err) {
					console.log('controller -> attempt register() error: ', err);
					return reply(Boom.badImplementation(err));
				}
			}
		}
	}

	attemptLogin() {
		return {
			handler: async (request, reply) => {
				const { username, password } = request.payload
				try {
					const userFound = await User.findOne({ username: username }).exec();
					console.log('attempt user found ', userFound)
					if (!userFound) {
						return reply(Boom.notFound(util.format(error.userNotFound, username)));
					} else {
						// check password match
						const matchResult = await bcrypt.compare(password, userFound.password)
						if (matchResult === true) {
							console.log('password matched')
							// const session = await request.server.methods.getSession(sessionId, {id: sessionId, userId: user.id, role: user.role});
							// console.log("Auth State ", request.auth)
							// console.log("Cookie: ", request.state)
							// console.log("Plugins: ", request.server.plugins)
							const token = await request.server.methods.createToken(userFound)
							return reply({ jwt: token, user: userFound })
						} else {
							console.log('password NOT matched')
							return reply(Boom.forbidden(util.format(error.passwordNotMatched, username)));
						}
					}
				}
				catch (err) {
					return reply(Boom.badRequest(err));
				}
			},
			validate: {
				payload: {
					username: validator.username.required(),
					password: validator.password.required()
				}
			}
		}
	}
}
