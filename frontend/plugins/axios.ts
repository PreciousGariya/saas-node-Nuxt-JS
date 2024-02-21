import axios from 'axios';
export default defineNuxtPlugin((NuxtApp) => {
    const defaultUrl = process.env.API_URL;
    const token = useCookie('token');
    // Create the Axios instance
    const api = axios.create({
        baseURL: defaultUrl,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token.value,
        },
    });
    return {
        provide: {
            axios: axios,
        },
    }
})