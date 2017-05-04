import User from './user.model';
import Boom from 'boom';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { secret } from '../../config';

async function createToken(user) {
  const userObject = { id: user._id, username: user.username, permissions: [] }
  const token = sign(userObject, secret, { expiresIn: "7d" })
  return token
}

async function createUser(username, password) {
  const hash = await bcrypt.hash(password, 10)
  const newDoc = await User.create({ username: username, password: hash })
  return newDoc
}

async function verifyUniqueUser(username) {
  try {
    const userFound = await User.findOne({ username: username }).exec()
		console.log('user found ', userFound)
    // return true if the username is available
    return userFound ? Promise.resolve(false) : Promise.resolve(true)
  }
  catch (err) {
    return Boom.badRequest('Could not verify unique user');
  }
}

const checkAsync = () => {
  console.log('checkAsync called')
}
 
export { verifyUniqueUser, createUser, createToken, checkAsync }