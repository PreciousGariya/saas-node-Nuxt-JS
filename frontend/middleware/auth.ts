import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware((to) => {
    const { authenticated , emailVerified, auth } = storeToRefs(useAuthStore()); // make authenticated state reactive
    const token = useCookie('token'); // get token from cookies

    if(emailVerified==null) {
        console.log('email must verify')
        abortNavigation();
        return navigateTo('/auth/verify-email');
    }
    if (token.value) {
        // check if value exists
        // todo verify if token is valid, before updating the state
        authenticated.value = true; // update the state to authenticated
    }
    console.log(to, 'to to')
    // if token exists and url is /login redirect to homepage
    if (token.value && to?.name === 'auth-login') {
        abortNavigation();
        return navigateTo('/');
    }

    if(token.value) {
        if (auth.value.role === 'user') {
            // If role is user, prepend '/user/' prefix to all routes
            to.path = `/user${to.path}`;
          } else if (auth.value.role === 'admin') {
            // If role is admin, prepend '/admin/' prefix to all routes
            to.path = `/admin${to.path}`;
          }
        abortNavigation();
        return navigateTo(to.path);
    }
    // if token doesn't exist redirect to log in
    if (!token.value && to?.name !== 'auth-login') {
        abortNavigation();
        return navigateTo('/auth/login');
    }
});