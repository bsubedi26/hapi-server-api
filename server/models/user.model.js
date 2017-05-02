const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
 username: { type: String, unique: true },
 password: String,
 createdAt: { type: Date, default: Date.now },
//  email: String,
//  firstName: String,
//  lastName: String,
//  permissions: { type: Array }
});

// pre save - hash incoming password before saving to db
UserSchema.pre('save', async (next) => {
    const user = this;
    next();
});

UserSchema.methods.fullName = function() {
  return (this.firstName.trim() + " " + this.lastName.trim());
};

export default mongoose.model('User', UserSchema);