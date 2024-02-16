const mongoose = require('mongoose');

const subscriptionHasInvoiceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number },
  pdf: { type: String },
  status: { type: String },
  invoiceId: { type: String }
});

const SubscriptionHasInvoiceModel = mongoose.model('SubscriptionHasInvoice', subscriptionHasInvoiceSchema);

export {SubscriptionHasInvoiceModel}