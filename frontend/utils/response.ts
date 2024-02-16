import { useError } from '#app'
import { Context } from '@nuxt/types';

import axios, { AxiosResponse, AxiosError } from 'axios';

const apiResponse = (data: any, message: string, code: number) => {
 
 return data;
  return {
    statusCode: code,
    data: data||null,
    message: message||null,
  };
};

const apiErrorResponse = (data: any, message: string, code: number) => {
  return data;
  // throw createError({
  //   statusCode: code,
  //   statusMessage: message,
  //   data: null,
  //   fatal: false,
  // })
};

const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const axiosError: AxiosError = error;
    if (axiosError.response) {
      const { status, data } = axiosError.response;
      switch (status) {
        case 400:
          return data; // Type assertion here
        case 401:
          return apiErrorResponse(null, 'Unauthorized', status);
        case 403:
          return apiErrorResponse(null, 'Forbidden', status);
        case 404:
          return apiErrorResponse(null, 'Not Found', status);
        case 422:
          return apiErrorResponse(null, 'Unprocessable Entity', status);
        case 500:
          return apiErrorResponse(null, 'Internal Server Error', status);
        default:
          return apiErrorResponse(null, 'Unknown Error', status);
      }
    } else {
      console.error('Network error:', axiosError.message);
      return apiErrorResponse(null, 'Network Error', 500);
    }
  } else {
    console.error('General error:', (error as Error).message);
    return apiErrorResponse(null, 'Internal Server Error', 500);
  }
};


export { apiResponse, apiErrorResponse, handleError }