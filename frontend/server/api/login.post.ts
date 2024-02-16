import { apiResponse, apiErrorResponse, handleError } from "~/utils/response";
import axios, { AxiosResponse } from 'axios';
const runtimeConfig = useRuntimeConfig()


export default defineEventHandler(async (event) => {
  
    const data = await readBody(event)
    // axos post
    try {
        const response: AxiosResponse = await axios.post(`${runtimeConfig.public.API_URL}/users/login`, data);
        return response.data; //apiResponse(response.data, response.statusText, response.status);
    } catch (error) {
        return handleError(error);
    }
})
