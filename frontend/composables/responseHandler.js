export const useResponsehandler = () => {
    // const response = ref([]);

    const handleSucceess = async (data) => {
    //    console.log('data', data)
        if((data.statusCode==401) || (data.statusCode==498)) {
            localStorage.removeItem('auth');
            const token= useCookie('token');
            token.value = null;
            navigateTo('/auth/login');
        }

        return data;
    }
    

    return { handleSucceess }
}