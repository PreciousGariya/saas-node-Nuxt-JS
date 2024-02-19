const jwt = require('jsonwebtoken');

const jwtSecret = "ae2c3a9bd522450d86d7e7a786ec4f3a"; // replace with a strong, unique secret

const jwtGenerate = (user) => {
  console.log('user',user);
 try {
    const token = jwt.sign({ user_id: user.id, email: user.email }, jwtSecret, {
      expiresIn: '1h',
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};
const generateRefreshToken = (user) => {
  try{
    const refreshToken = jwt.sign({ type:'refreshtoken',user_id: user.id }, jwtSecret, {
      expiresIn: '7d', // Longer expiration time for the refresh token
    });
    return refreshToken;
  }catch(error){
    console.log(error);
    return null
  }
};


const validateRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    if(decoded.type !== 'refreshtoken') {
      return null;
    }
    return decoded;
  } catch (error) {
    console.log(error);
    return null; // Token is invalid or expired
  }
};
const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const apiSuccess = (res, data, message) => {
  res.status(200).json({
    success: true,
    data: data,
    message: message,
  });
};

const apiError = (res,code,error,message='') =>{
  return res.status(200).json({ statusCode: code, success:false, errors:error, message: message?message:error });
}

const catchException = (res, error) => {
  console.error(error);
  res.status(500).json({
    success: false,
    error: error,
  });
};
export {
  jwtSecret,
  jwtGenerate,
  apiSuccess,
  apiError,
  catchException,
  generateRefreshToken,
  validateRefreshToken,
  validateToken
};
