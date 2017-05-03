const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Boom = require('boom');

const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now },
  //  email: String,
  //  firstName: String,
  //  lastName: String,
  //  permissions: { type: Array }
});

UserSchema.methods.getUsername = function () {
  return {
    username: this.username
  }
};

UserSchema.methods.verifyUniqueUser = async function (input) {
  // Find an entry from the database that
  // matches either the email or username
  try {
    const userFound = await this.findOne({
      $or: [
        { username: input.username }
        // { email: email },
      ]
    }).exec()

    if (userFound) {
      if (userFound.username === input.username) {
        return Boom.badRequest('Username taken');
      }
      // if (user.email === req.payload.email) {
      //   res(Boom.badRequest('Email taken'));
      // }
    } else {
      return Promise.resolve('ok')
    }
  }
  catch (err) {
      return Boom.badRequest('Username taken');
    }
  }

export default mongoose.model('User', UserSchema);