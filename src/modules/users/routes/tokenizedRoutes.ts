
import { JWTMiddleware } from '../../../middleware/JWTMiddleware';
const express = require('express');
const tokenizedRoutes = express.Router();
import { refreshToken, sendVerificationEmail ,verifyEmail} from '../controllers/userController';
tokenizedRoutes.post('/refresh-token', JWTMiddleware, refreshToken);
tokenizedRoutes.post('/send-verification-email',JWTMiddleware, sendVerificationEmail);
tokenizedRoutes.post('/verify-email', JWTMiddleware, verifyEmail);


export {tokenizedRoutes}