


const express = require('express');

const paymentRoutes = express.Router();
import { 
    createCheckoutSession,
    createStripeCustomer,
    checkSubscriptionStatus,
    listProducts,getPrice,createProductAndPlan, plans
} from '../controllers/StripeController';

paymentRoutes.post('/create-plan',createProductAndPlan);
paymentRoutes.post('/create-checkout-session',createCheckoutSession);
paymentRoutes.post('/create-stripe-customer',createStripeCustomer);
paymentRoutes.post('/check-subscription-status',checkSubscriptionStatus);
paymentRoutes.post('/list-products',listProducts);
paymentRoutes.post('/get-price',getPrice);
paymentRoutes.get('/plans', plans);


export {paymentRoutes}