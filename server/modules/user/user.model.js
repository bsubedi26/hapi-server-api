import mongoose, { Schema, model } from 'mongoose';

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

export default model('User', UserSchema);