import express from 'express';
import { Stripe } from 'stripe';
import { stripeData } from '../../../utils/EnvData';
import { apiError, apiSuccess } from '../../../utils/helper';



const stripe = new Stripe(stripeData.secret);
const createStripeCustomer = async (data) => {
    try {
        const customer = await stripe.customers.create({
            email: data.email,
            name: data.name,
        });

        return customer.id;
    } catch (error) {
        console.error('Error creating customer:', error);
        return null;
    }
}
 const checkSubscriptionStatus= async(customerId: string)=>{
    try {
      // Retrieve the customer's subscriptions
      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
      });
  
      if (subscriptions.data.length === 0) {
        return null;
      }
  
      // Check if any of the subscriptions are active
      const hasActiveSubscription = subscriptions.data.some((subscription) => {
        return subscription.status === 'active';
      });
  
      if (hasActiveSubscription) {
        return "active";
      } else {
        // Check for other possible subscription statuses
        const nonActiveStatuses = subscriptions.data.map((subscription) => {
          switch (subscription.status) {
            case 'incomplete':
            case 'incomplete_expired':
              return "incomplete";
            case 'trialing':
              return "trialing";
            case 'past_due':
              return "past_due";
            case 'canceled':
              return "canceled";
            case 'unpaid':
              return "unpaid";
            default:
              return null;
          }
        });
  
        // Assuming there might be multiple statuses, returning the first non-null status
        return nonActiveStatuses.find(status => status !== null) || null;
      }
    } catch (error) {
      console.error('Error getting subscription status:', error);
      return null;
    }
  }


const listProducts = async (req, res) => {
    try {
        const products = await stripe.products.list();
        const list= products.data;
        return list.length > 0
        ? apiSuccess(res, { list }, 'Products listed successfully')
        : apiError(res, 400, 'No products found');
    } catch (error) {
        console.error('Error listing products:', error);
        return apiError(res, 500, 'Failed to list products');
    }
}

const getPrice = async (req, res) => {

    try {
        const { productId } = req.body
        if (!productId) {
            return apiError(res, 400, 'Product ID is required');
        }
        const prices = await stripe.prices.list({
            product: productId,
        });
        const priceData=prices.data;
        return apiSuccess(res, { priceData }, 'Prices listed successfully');
    } catch (error) {
        console.error('Error listing prices:', error);
        return apiError(res, 500, error.message);
    }
}
const createCheckoutSession = async (req, res) => {
    try {
        const { userId, priceId } = req.body;
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer: userId, // Assume userId is the Stripe Customer ID associated with the user
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: stripeData.success_url,
            cancel_url: stripeData.cancel_url,
        });

        return apiSuccess(res, { session }, "Checkout session created successfully");
    } catch (error) {
        console.error('Error creating checkout session:', error);
        return apiError(res, 500, "Failed to create checkout session");
    }
}



export { createCheckoutSession, createStripeCustomer,checkSubscriptionStatus, listProducts, getPrice }