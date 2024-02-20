import { apiResponse, apiErrorResponse, handleError } from "~/utils/response";
import axios, { AxiosResponse } from 'axios';

const runtimeConfig = useRuntimeConfig()

export default defineEventHandler(async (event) => {
    // const data = await readBody(event)
    const header = getHeaders(event)
    // axos post
    try {
        const response: AxiosResponse = await axios.get(
            `${runtimeConfig.public.API_URL}/stripe/plans`,
            { headers : header }
          );
        return response.data; //apiResponse(response.data, response.statusText, response.status);
    } catch (error) {
        return handleError(error);
    }
})
