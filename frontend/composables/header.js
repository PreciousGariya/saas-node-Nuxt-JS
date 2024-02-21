export const useHeaders = () => {
    const getHeaders = async () => {
        const tokan =useCookie('token');

        return {
            'Content-Type': 'application/json',
            'Authorization': tokan.value,
        }

        // return headers
    }
    

    return { getHeaders }
}