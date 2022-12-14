const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // name: { type: String, require: [true, 'Please enter your name'] },
  email: {
    type: String,
    require: [true, 'Please enter your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    require: [true, 'Please enter your password'],
    minLength: 6,
    unique: true,
    select: false, //never show up in output
  },
  // passwordConfirm: {
  //   type: String,
  //   require: [true, 'Please confirm your password'],
  //   minLength: 6,
  //   unique: true,
  //   validate: {
  //     //it only works on CREATE and SAVE!!!
  //     validator: function (el) {
  //       return el === this.password;
  //     },
  //     message: 'Passwords do not match.',
  //   },
  // },
  passwordChangedAt: Date,
});

//MIDDLEWARE: runs before .save() and .create()
//before saving user info, encrypt the password. (password must not be shown in database) for SIGNUP PAGE
userSchema.pre('save', async function (next) {
  // only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  //encrypting password. Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete passwordConfirm field
  // this.passwordConfirm = undefined;
  next();
});

//compare saved password and logged password for LOGIN PAGE
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(changedTimeStamp, JWTTimestamp);
    return JWTTimestamp < changedTimeStamp;
  }

  //FALSE means password NOT changed
  return false;
};
const User = mongoose.model('User', userSchema);

module.exports = User;
