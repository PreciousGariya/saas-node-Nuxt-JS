import Swal from 'sweetalert2'

const checkTokenExpiry = () => {
    const token = useCookie('token');
    
    // Check if the token exists
    if (!token) {
        console.log('token not exist')
        Swal.fire(
            'Login Again!✅',
            'token has been expired',
            'warning',
          );
        return false;
    }

    // Check if token has an expiry date
    // if (!token.expires) {
    //     console.log('token expired')
    //     Swal.fire(
    //         'Login Again!✅',
    //         'token has been expired',
    //         'warning',
    //       );
    //     return false;
    // }

    const expiryDate = new Date(token.expires);
    // Check if the current time is past the expiry date
    const isExpired = Date.now() > expiryDate.getTime();
    console.log('isExpired', isExpired)
    console.log('!isExpired', !isExpired)

    return !isExpired;
}

export { checkTokenExpiry };
