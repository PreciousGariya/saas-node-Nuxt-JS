
import express from 'express';
import { Stripe } from 'stripe';
import { stripeData } from '../../../utils/EnvData';
import { apiError, apiSuccess } from '../../../utils/helper';
import { createSubcription, updateSubscription, deleteSubscription } from './SubscriptionController';
const stripe = new Stripe(stripeData.secret);

// This is your Stripe CLI webhook secret for testing your endpoint locally.


const webhook = async (request, response) => {
    // console.log("$$$$$",request.body);
    let event = request.body;
    const data = event.data.object;
    switch (event.type) {
        case 'customer.subscription.deleted':
            console.log('customer.subscription.deleted');
            await deleteSubscription(data);
            // Then define and call a function to handle the event account.updated
            break;
        case 'customer.subscription.updated':
            console.log('customer.subscription.updated');
            await updateSubscription(data);
            break;
        case 'invoice.payment_succeeded':
            console.log('invoice.payment_succeeded');
            await createSubcription(data);
            break;
        // case 'invoice.paid':
        //     await createSubcription(data);
        //     break;
        // case 'invoice.payment_failed':
        //     await updateSubscription(data);
        //     break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.sendStatus(200);
}

export { webhook }


