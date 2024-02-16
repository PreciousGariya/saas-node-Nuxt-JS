import { Stripe } from 'stripe';
import { stripeData } from '../../../utils/EnvData';
import { checkSubscriptionStatus } from './StripeController';
import {userModel} from "../../../modules/users/models/userModel";
import {SubscriptionModel} from "../models/subscriptionModel";
import {SubscriptionHasInvoiceModel} from "../models/subscriptionHasInvoiceModel";
import {SubscriptionHasProductModel} from "../models/subscriptionHasProductModel";
import { apiError } from '../../../utils/helper';
const stripe = new Stripe(stripeData.secret);

const createSubcription = async (data) => {
    const { id, charge, customer, customer_email, total, status, amount_paid, invoice_pdf, payment_intent, period_end, period_start, subscription, lines } = data;
    const planDescription = lines.data[0].description;
    const priceId = lines.data[0].price.id;
    const productId = lines.data[0].price.product;
    const priceAmount = amount_paid / 100;
    const periodEndDateTime = new Date(period_end * 1000);
    const periodStartDateTime = new Date(period_start * 1000);
    const subdetails = await checkSubscriptionStatus(customer);
    const invoice_id = id;

    // Find or create user
    let user = await userModel.findOne({ email: customer_email, stripeCustomerId: customer });
    if (!user) {
        user = await userModel.create({ email: customer_email, stripeCustomerId: customer });
    }

    // Update user subscription status
    user.subscriptionStatus = subdetails;
    await user.save();

    // Find existing subscription
    let existingSubscription = await SubscriptionModel.findOne({ subscriptionId: subscription });
    if (existingSubscription) {
        // Update existing subscription
        existingSubscription.status = subdetails;
        existingSubscription.startDate = periodStartDateTime;
        existingSubscription.endDate = periodEndDateTime;
        existingSubscription.amount = priceAmount;
        await existingSubscription.save();
    } else {
        // Create new subscription
        existingSubscription = await SubscriptionModel.create({
            subscriptionId: subscription,
            status: subdetails,
            startDate: periodStartDateTime,
            endDate: periodEndDateTime,
            amount: priceAmount,
            userId: user._id
        });
    }

    // Create invoice and product records for the subscription
    await SubscriptionHasInvoiceModel.create({
        userId: user._id,
        amount: amount_paid,
        pdf: invoice_pdf,
        status: status,
        invoiceId: invoice_id
    });

    await SubscriptionHasProductModel.create({
        userId: user._id,
        productId: productId,
        productName: planDescription
    });

    console.log('User and subscription updated/created successfully');
}

const updateSubscription = async (data) => {
    const { id, customer, plan, items } = data;
    const stripeProductId = plan.product;
    const subscriptionStatus = await checkSubscriptionStatus(customer);
    const sId = items.data[0].id;
    const checkSubscriptionHasProductQty = await checkSubscriptionTotalProduct(sId);

    // Find subscription
    const subscription = await SubscriptionModel.findOne({ subscriptionId: id });

    if (subscription) {
        // Update user subscription status
        await userModel.updateOne(
            { stripeCustomerId: customer },
            { subscriptionStatus: subscriptionStatus }
        );

        // Update subscription status
        await SubscriptionModel.updateOne(
            { subscriptionId: id },
            { status: subscriptionStatus }
        );

        // Update subscription product quantity
        await SubscriptionHasProductModel.updateOne(
            { productId: stripeProductId },
            { qty: checkSubscriptionHasProductQty }
        );

        console.log('Subscription updated successfully');
    } else {
        console.error('Subscription not found in the database.');
        // Handle this scenario gracefully, e.g., throw an error or log a message.
    }
}

const deleteSubscription = async (data) => {
    const { id, customer, status } = data;
    console.log('customer subscriptionStatus', status);

    // Update user subscription status and subscription status
    await userModel.updateOne(
        { stripeCustomerId: customer },
        { subscriptionStatus: status }
    );

    // Update subscription status
    await SubscriptionHasInvoiceModel.updateOne(
        { subscriptionId: id },
        { status: status }
    );

    console.log('Subscription deleted successfully');
}

const checkSubscriptionTotalProduct = async (subscriptionId) => {
    try {
        // Find the subscription in the database
        const subscription = await SubscriptionModel.findById(subscriptionId);
        
        // Check if the subscription is found
        if (!subscription) {
            throw new Error('Subscription not found');
        }
        // Retrieve the quantity of the subscription's product
        return subscription.qty;
    } catch (error) {
        console.error('Error checking subscription total product:', error);
        return 0;
    }
};

const getStripeSubscription = async (subscriptionId) => {
    try {
        console.log('getting subscription')
        const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
            expand: ['items.data.price.product', 'latest_invoice.payment_intent'],
        });
        return subscription;
    } catch (error) {
        console.error('Error retrieving subscription:', error);
        return null;
    }
}
const getCharge = async (chargeId) => {
    try {
        const charge = await stripe.charges.retrieve(chargeId);
        return charge;
    } catch (error) {
        console.error('Error retrieving charge:', error);
        console.log('Error retrieving charge:', error);
        return null
    }
}



export { createSubcription, updateSubscription, deleteSubscription }