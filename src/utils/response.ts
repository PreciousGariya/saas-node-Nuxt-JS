const success = (res, data, message = 'Success') => {
  res.status(200).json({
    status: 'success',
    message,
    data,
  });
};

const serverError = (res, message = 'Internal Server Error') => {
  res.status(500).json({
    status: 'error',
    message,
  });
};

const errorResponse = (message = 'Internal Server Error', statusCode = 500) => {
  return {
    success: false,
    error: {
      message,
      statusCode,
    },
  };
};

const error = (res, message = '') => {
  res.status(500).json({
    status: 'error',
    message,
  });
};

const notFound = (res, message = 'Not Found') => {
  res.status(404).json({
    status: 'error',
    message,
  });
};

const failedError = (res, message = '') => {
  res.status(403).json({
    status: 'error',
    message,
  });
};

const tokenExpired = (res, message = '') => {
  res.status(401).json({
    status: 'error',
    message,
  });
};

export = {
  success,
  error,
  serverError,
  notFound,
  failedError,
  tokenExpired
};
