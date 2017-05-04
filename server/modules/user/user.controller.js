import Joi from 'Joi';
import Boom from 'boom';
import aguid from 'aguid';
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

async function verifyUniqueUser(request, reply) {
  // Find an entry from the database that
  // matches either the email or username
	const { username, password } = request.payload
	try {
    const userFound = await this.findOne({ username: username }).exec()
		console.log('user found ', userFound)
		reply.continue()
    if (userFound) {
      if (userFound.username === username) {
        return Boom.badRequest('Username taken');
      }
    } else {
      return Promise.resolve('ok')
    }
  }
  catch (err) {
      return Boom.badRequest('Username taken');
    }
  }
export default class UserController {
	attemptRegister() {
		return {
			validate: {
				payload: {
					username: validator.username.required(),
					password: validator.password.required()
				}
			},
			pre: [
				{ method: verifyUniqueUser, assign: 'user' }
			],
			handler: async (request, reply) => {
				const { username, password } = request.payload
				console.log('register func')
				try {
					// const result = await User.findOne({ username: username }).exec();
					// const result = await User.verifyUniqueUser({ username: username }).exec();
					// console.log('rrr ', result)

					// if (result) {
					// 	return reply(Boom.forbidden(util.format(error.emailDuplicate, username)));
					// } else {
					// 	console.log('username is available -> try to create')
					// 	try {
					// 		const hash = await bcrypt.hash(password, 10)
					// 		let newDoc = await User.create({ username: username, password: hash })
					// 		reply(newDoc);
					// 	}
					// 	catch (err) {
					// 		return reply(Boom.badImplementation(err));
					// 	}
					// }

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
							// sign the token
							const sessionId = aguid();
							console.log("generated session id ", sessionId)
							// const session = await request.server.methodsAsync.getSession(sessionId, {id: sessionId, userId: user.id, role: user.role});
							// console.log(Object.keys(request.server))
							let arr = Object.keys(request.server)
							console.log("Auth State ", request.auth)
							request.auth.set(userFound);
							console.log("Auth State ", request.auth)
							console.log("Cookie: ", request.state)
							console.log("Plugins: ", request.server.plugins)
							const user = { id: userFound._id, username: userFound.username, permissions: [] }
							const token = sign(user, secret, { expiresIn: "7d" })
							return reply({ jwt: token, user: user, serverArray: arr })
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
