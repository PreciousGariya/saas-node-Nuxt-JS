
import { JWTMiddleware } from '../../../middleware/JWTMiddleware';
const express = require('express');
const authRoutes = express.Router();
import { login, register, refreshToken, sendVerificationEmail ,verifyEmail} from '../controllers/userController';

authRoutes.post('/login',login);
authRoutes.post('/register', register);

authRoutes.post('/refresh-token', JWTMiddleware, refreshToken);
authRoutes.post('/send-verification-email',JWTMiddleware, sendVerificationEmail);
authRoutes.post('/verify-email', JWTMiddleware, verifyEmail);
export {authRoutes}