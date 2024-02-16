// subscriptionHasProductModel.js

const mongoose = require('mongoose');

const subscriptionHasProductSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  productId: { type: String },
  productName: { type: String }
});

const SubscriptionHasProductModel = mongoose.model('SubscriptionHasProduct', subscriptionHasProductSchema);

export {SubscriptionHasProductModel}