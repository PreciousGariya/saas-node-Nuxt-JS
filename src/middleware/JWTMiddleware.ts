const jwt = require("jsonwebtoken");
import { catchException,validateToken,apiError } from "../utils/helper";

const JWTMiddleware = (req, res, next) => {
  // const token = req.body.token || req.query.token || req.params.token || req.headers["x-access-token"]|| req.headers["authorization"]||req.headers["Authorization"];
  const token= getTokenFromRequest(req);
  console.log('token', token);
  if (!token || token === '') {
    return apiError(res, 422, false, "A token is required for authentication");
    // You may want to return a response or throw an error here
  }

  try {
    const decoded = validateToken(token);
    console.log('___________________decoded________________', decoded);
    if(decoded==null){
        return apiError(res, 422, false,"Token has expired please login again");
    }
    if(!decoded) {
      return apiError(res, 422, false,'Invalid token or may be Token has expired');
      // return catchException(res, 'Invalid token or may be Token has expired');
    }
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return apiError(res, 422, false,"Token has expired");
      // return catchException(res, 'Token has expired');
      // You may want to return a response or throw an error here
    } else if (error.name === 'JsonWebTokenError') {
      return apiError(res, 422,false, "Invalid token");
      // return catchException(res, 'Invalid token');
      // You may want to return a response or throw an error here
    } else {
      return apiError(res, 422,false,"Authentication error");
      // return catchException(res, 'Authentication error');
      // You may want to return a response or throw an error here
    }
  }
};
const getTokenFromRequest = (req) => {
  // Check the request body
  if (req.body && req.body.token) {
    return req.body.token;
  }
  // Check the query parameters
  if (req.query && req.query.token) {
    return req.query.token;
  }
  // Check the route parameters
  if (req.params && req.params.token) {
    return req.params.token;
  }
  // Check the "x-access-token" header
  if (req.headers && req.headers["x-access-token"]) {
    return req.headers["x-access-token"];
  }
  // Check the "authorization" header (Bearer token)
  if (req.headers && req.headers["authorization"]) {
    // console.log('req.headers["authorization"]',req.headers["authorization"])
    return req.headers["authorization"];
  }
  return null; // Return null if no token is found
};
export { JWTMiddleware };
