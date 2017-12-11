const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  autoIncrement = require('mongoose-auto-increment'),
  db = require('../config/mongoose');

autoIncrement.initialize(db);

/**
* @module  User
* @description contain the details of Attribute
*/

const User = new Schema({

  /** 
    email. It can only contain valid email id, should be unique, is required and indexed.
  */
  email: {
    type: String,
    unique: true,
    required: true
  },

  /** 
    password. It can only contain string, is required field.
  */
  password: {
    type: String,
    required: true
  },

  /** 
  Scope. It can only contain string, is required field, and should have value from enum array.
  */
  scope: {
    type: String,
    enum: ['Customer'],
    required: true,
    default: 'Customer'
  },

  /** 
    propertyId. It can only contain string.
  */
  isVerified: {
    type: Boolean,
    default: false
  }


});

User.plugin(autoIncrement.plugin, {
  model: 'user',
  field: '_id'
});

User.statics.saveUser = function (requestData, callback) {
  this.create(requestData, callback);
};

User.statics.updateUser = function (user, callback) {
  user.save(callback);
};

User.statics.findUser = function (userName, callback) {
  this.findOne({
    userName: userName
  }, callback);
};

User.statics.findUserByIdAndUserName = function (id, userName, callback) {
  this.findOne({
    userName: userName,
    _id: id
  }, callback);
};

const user = mongoose.model('user', User);

/** export schema **/
module.exports = user;
