import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import EmailSender from '../../../utils/mailer';
import {
    apiSuccess,
    apiError,
    jwtGenerate,
    generateRefreshToken,
    validateRefreshToken,
    catchException,
  } from "../../../utils/helper";
const { body, validationResult } = require("express-validator");
const emailSender = new EmailSender();
import {createStripeCustomer, checkSubscriptionStatus} from '../../payment/controllers/StripeController';
import {verificationCodeModel} from '../models/verificationCodeModel';
import { generateUniqueCode } from "../../../utils/generateUniqueCode";
import {userModel} from "../models/userModel";
import { userResource } from "../resources/userResource";

const registerValidators = [
    body("firstName").trim().notEmpty().withMessage("FirstName is required"),
    body("lastName").trim().notEmpty().withMessage("LastName is required"),
    body("phone").trim().notEmpty().withMessage("Phone number is required"),
    body("email").trim().isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ];
  
  const loginValidators = [
    body("email").trim().isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
  
  const generateVerificationCode = (min, max) => {
    return Math.floor(min + Math.random() * (max - min + 1)).toString();
  };
  
  // Function to send email with verification code
  const addOtpTotable = async (user, verificationCode) => {
    try {
        const checkOtp = await verificationCodeModel.findOne({
            user_id: user._id,
            // code: verificationCode
        })
      if (checkOtp) {
        await await verificationCodeModel.updateOne(
            {user_id: user._id},
            {$set: {
                code: verificationCode
              }}
        );
      } else {
        const newCode =new verificationCodeModel({
          user_id: user._id,
          code: verificationCode
        });
        await newCode.save(); 
      }
      return true;
  
    } catch (error) {
  
    }
  }
  const sendVerificationEmail = async (req, res) => {
    try {
      const { email } = req.body;
      console.log("email", email);
      const user = await userModel.findOne({
          email: email
      });
      if (!user) {
        return apiError(res, 400, 'Email does not exist');
      }
      const verificationCode = generateVerificationCode(1000, 9999);
      await addOtpTotable(user, verificationCode);
      await emailSender.sendMail(email, 'Email Verification', { otp: verificationCode, name: user.name }, 'verification-code');
      return apiSuccess(res, 200, {
        success: true,
        message: "Email sent successfully",
      })
    } catch (error) {
      console.log("error", error);
      return apiError(res, 400, 'Unable to send verification email');
    }
  }
  
  const register = async (req, res) => {
    try {
      // Run validation
      await Promise.all(
        registerValidators.map((validation) => validation.run(req))
      );
  
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiError(res, 400, errors.array());
      }
  
      console.log("kk");
  
      // Continue with registration logic
      const { firstName, lastName , phone, email, password,  } = req.body;
      console.log("user body", req.body);
      const hashedPassword = await bcrypt.hash(password, 10);
      const code = await generateUniqueCode(8);
      console.log('uniqueCode', code);
      const checkEmail = await userModel.findOne({
        email: email
      });
      if (checkEmail) {
        console.log("email exists");
        return apiError(res, 400, "Email already exists", "Please tey with another email");
      }
      const customerId = await createStripeCustomer({ email: email, name: firstName +' '+ lastName  });
      const subStatus = await checkSubscriptionStatus(customerId);
  
      const user = new userModel({
            firstName :firstName,
            lastName:lastName,
            phone:phone,
            email: email,
            password: hashedPassword,
            stripeCustomerId: customerId || null,
            subscriptionStatus: subStatus || null,
      });
      await user.save();
     
      // Generate a verification code
      const verificationCode = generateVerificationCode(1000, 9999);
      await addOtpTotable(user, verificationCode);
      // Save the verification code in the database
      // Send the verification code via email

      await emailSender.sendMail(email, 'Email Verification', { otp: verificationCode, name: user.firstName + user.lastName }, 'verification-code');
    //   console.log("user", user);
      const token = jwtGenerate(user);

      apiSuccess(
        res,
        { user: await userResource(user), token },
        "Registration Success & Please check your email for verification code"
      );
    } catch (e) {
      catchException(res, e);
      return apiError(res, 400, 'error',  e.message);
    }
  };
  
  const login = async (req, res) => {
    try {
      // Run validation
      await Promise.all(loginValidators.map((validation) => validation.run(req)));
  
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiError(res, 422, {errors: errors.array()},"Validation error" );
      }
  
      // Continue with login logic
      const { email, password } = req.body;
      const user = await getUserbyEmail(email);
  
      if (!user) {
        return apiError(res, 401,'Invalid credentials', "user does not exist" );
        // throw new Exception('Invalid credentials', 401);
      }
  
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return apiError(res, 401,'Invalid credentials', "Credentials do not match" );
        // throw new Exception('Invalid credentials', 401);
      }
  
      const token = jwtGenerate(user);
      const refreshToken = generateRefreshToken(user);
      apiSuccess(
        res,
        { user: await userResource(user), token, refreshToken },
        "Login Success"
      );
    } catch (e) {
      catchException(res, e);
      return apiError(res, 400, 'server error',  e.message);
    }
  };
  
  
  const getUserbyEmail = async (email) => {
    return await userModel.findOne({
        email: String(email),
    });
    
  }
  const refreshToken = async (req, res) => {
    const token =
      req.body.token ||
      req.query.token ||
      req.params.token ||
      req.headers["x-access-token"];
    console.log("token", token);
  
    if (!token) {
      return apiError(res, 400, 'Refresh token missing', 'Please provide a valid refresh token');
      // catchException(res, "Refresh token missing");
      // throw new Exception('Token requireed', 401);
    }
    const decoded = validateRefreshToken(token);
    console.log("decoded", decoded);
  
    if (decoded == null) {
      catchException(res, "Token must be a valid refresh-token");
      // throw new Exception('Invalid Token', 401);
      return apiError(res, 400, 'Unauthorized', 'Token must be a valid refresh-token');
    }
    const user = await userModel.findOne({
       _id: decoded.userId
    });
    if (!user) {
      return apiError(res, 400, 'Invalid token', 'User not found');
      catchException(res, "Invalid Token");
      // throw new Exception('Invalid Token', 401);
    }
    const newToken = jwtGenerate(user);
    const refreshToken = generateRefreshToken(user);
    apiSuccess(
      res,
      { token: newToken, refreshToken: refreshToken },
      "Refresh Token validated successfully"
    );
  };
  
  const verifyEmail = async (req, res) => {
    try {
      const { email, verificationCode } = req.body;
  
      if (!email) {
        return apiError(res, 400,'validation error', "Email is required" );
      }
      if (!verificationCode) {
        return apiError(res, 400,'validation error', "Verification code is required" );
      }
  
      // Find user by email
      const user = await userModel.findOne({
        email: email
      });
      console.log("user", user);
      if (!user) {
        return apiError(res, 400,'User not found');
      }
  
      const verificationToken = await verificationCodeModel.findOne({
        user_id: user._id,
        code: verificationCode,
      });
  
      if (!verificationToken) {
        return apiError(res, 400,'Verification code is invalid or has expired', "Invalid verification code" );
      }
  
      // Update user status or perform any other necessary actions
      await userModel.updateOne(
        { _id: user._id},
        { $set: { emailVerified: new Date()}}
        );
      // For example, you can mark the user as verified
  
      // Clear the verification token since it's no longer needed
      await verificationCodeModel.deleteMany({
        user_id: user._id,
      });
      const newuser = await getUserbyEmail(email);
      
      return apiSuccess(res, await userResource(newuser), "Email verified successfully");
    } catch (error) {
      console.error(error);
      return apiError(res, 500,'Internal Server Error');
    }
  };
  
  
  export { login, register, refreshToken, verifyEmail, sendVerificationEmail };
  