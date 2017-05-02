import Joi from 'Joi';
import Boom from 'boom';
import User from '../models/user.model';
import * as bcrypt from 'bcrypt';
import { secret } from '../config';
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
					const result = await User.findOne({ username: username }).exec();
					if (result) {
						// return reply(Boom.notFound(util.format(error.userNotFound, request.params.userId)));
						return reply(Boom.forbidden(util.format(error.emailDuplicate, username)));
					} else {
						console.log('username is available -> try to create')
						try {
							const hash = await bcrypt.hash(password, 10)
							let newDoc = await User.create({ username: username, password: hash })
							reply(newDoc);
						}
						catch (err) {
							return reply(Boom.badImplementation(err));
						}
					}

				}
				catch (err) {
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
							const user = { id: userFound._id, username: userFound.username, permissions: [] }
							const token = sign(user, secret, { expiresIn: "7d" })
							return reply({ jwt: token, user: user })
						} else {
							console.log('password NOT matched')
							return reply(Boom.forbidden(util.format(error.passwordNotMatched, username)));
						}
					}
				}
				catch (err) {
					return reply(Boom.badImplementation(err));
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
