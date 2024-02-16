import express from "express";
import dotenv from "dotenv";
import { mongoDB } from './config/mongo';
import {authRoutes} from "./modules/users/routes/userRoutes";
import {tokenizedRoutes} from "./modules/users/routes/tokenizedRoutes";
import {paymentRoutes} from './modules/payment/routes/paymentRoutes';
import {webhook} from './modules/payment/controllers/StripeWebhookController';
import {JWTMiddleware} from './middleware/JWTMiddleware';
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
mongoDB();

app.use('/users', authRoutes);
app.post('/stripe/webhook', webhook);

app.use(JWTMiddleware);
// payment routes
app.use('/user',tokenizedRoutes)
app.use('/stripe', paymentRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});