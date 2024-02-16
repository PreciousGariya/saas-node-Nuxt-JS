// axios-client.ts

// Import the necessary modules and types
import { defineNuxtPlugin } from '#app';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

// Define the options for the Axios client
interface AxiosClientOptions {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

// Define the Nuxt plugin
export default defineNuxtPlugin((nuxtApp) => {
  // Set default options for the Axios client
  const options: AxiosClientOptions = {
    baseURL: nuxtApp.env.API_URL || 'https://your-api.com',
    timeout: 5000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  // Create an Axios instance with the provided options
  const instance: AxiosInstance = axios.create(options);

  // Define a request handler function
  const requestHandler = async <T = any, D = any>(
    type: 'get' | 'post' | 'put' | 'patch' | 'delete',
    url: string,
    data?: D,
    options?: AxiosClientOptions
  ): Promise<AxiosResponse<T>> => {
    const fullUrl = url.startsWith('/')
      ? `${options?.baseURL || instance.defaults.baseURL}${url}`
      : url;

    try {
      switch (type.toLowerCase()) {
        case 'get':
          return await instance.get<T>(fullUrl, options);
        case 'post':
          return await instance.post<T>(fullUrl, data, options);
        case 'put':
          return await instance.put<T>(fullUrl, data, options);
        case 'patch':
          return await instance.patch<T>(fullUrl, data, options);
        case 'delete':
          return await instance.delete<T>(fullUrl, options);
        default:
          throw new Error(`Unsupported HTTP method: ${type}`);
      }
    } catch (error: unknown) {
      // Handle errors gracefully
      if (error instanceof AxiosError) {
        // Handle axios-specific errors (e.g., network errors, status codes)
        console.error('Axios error:', error.response?.data, error.config);
      } else {
        // Handle other errors
        console.error('Unknown error:', error);
      }
      throw error; // Re-throw for component handling
    }
  };

  // Expose the request handler function as a provider
  nuxtApp.provide('axiosClient', requestHandler);
});
