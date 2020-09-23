const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Please add your firstname'],
    trim: true,
    lowercase: true,
  },
  lastname: {
    type: String,
    required: [true, 'Please add your lastname'],
    trim: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: [true, 'Please add a username'],
    trim: true,
    lowercase: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please add your email'],
    trim: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
  },
  travels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Travel',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash Password before saving in DB
UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', UserSchema);
