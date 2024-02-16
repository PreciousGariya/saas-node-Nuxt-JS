const mongoose = require('mongoose');

// Define the schema for the user model
const userSchema = new mongoose.Schema({
  email: {type: String,required: true,unique: true},
  password: {type: String,required: true},
  firstName: {type: String},
  lastName: {type: String, required: true},
  phone: {type: String, required: true},
  stripeCustomerId: {type: String},
  emailVerified: {type: Date, default: null},
  subscriptionStatus:{type: String,default: null},
  role: {type: String,enum: ['admin','user'],default: 'user'},
  isActive: {type: Boolean,default: true},
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Define the User model
const userModel = mongoose.model('User', userSchema);

export {userModel}