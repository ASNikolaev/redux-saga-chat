import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt-as-promised';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  login: {
    type: String,
    unique: true,
    lowercase: true,
    index: true
  },
  password: String,
  admin: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
  next();
});

UserSchema.methods.comparePasswords = function(password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model('User', UserSchema);
