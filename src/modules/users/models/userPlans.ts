
const mongoose = require('mongoose');

// Define the schema for the user model
const plansSchema = new mongoose.Schema({
  stripePlanId: {type: String,required: true},
  stripeCustomerId: {type: String},
  userId: {type: String},
  status: {type: String},
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Define the User model
const UserPlansModel = mongoose.model('UserPlans', plansSchema);

export {UserPlansModel}
