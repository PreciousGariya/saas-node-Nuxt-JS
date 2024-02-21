const tokenHeader = async () => {
    // Retrieve token from cookie or localStorage
    const token = await useCookie('token'); // Assuming useCookie is a custom hook to get cookie value

    // Check if token exists
    if (token && typeof token.value === 'string') {
        // Check if token is expired
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        const tokenExpirationTime = parseInt(token.value.split('.')[1], 10); // Extract expiration time from the token (assuming it's a JWT token)

        if (tokenExpirationTime < currentTime) {
            // Token is expired
            // Handle token expiration, e.g., redirect to login page or refresh token
            console.log('Token is expired');
            // You may want to handle token expiration based on your application's requirements
        }

        // Token is valid, return headers with authorization token
        return {
            'Content-Type': 'application/json',
            'Authorization': token.value,
        };
    } else {
        // Token does not exist
        // Handle case where token is not available, e.g., redirect to login page
        console.log('Token does not exist');
        // You may want to handle this case based on your application's requirements
        return {
            'Content-Type': 'application/json',
        };
    }
};


export {tokenHeader}