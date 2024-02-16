const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  subscriptionId: { type: String, required: true },
  status: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  amount: { type: Number },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const SubscriptionModel = mongoose.model('Subscription', subscriptionSchema);

export {SubscriptionModel}