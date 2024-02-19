import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
import { checkTokenExpiry } from '~/utils/checkTokenExpiry'
import Swal from 'sweetalert2'

export default defineNuxtRouteMiddleware((to) => {
    const router = useRouter();

    const { authenticated, emailVerified, auth, access_token } = storeToRefs(useAuthStore()); // make authenticated state reactive
    const token = useCookie('token'); // get token from cookies

    if(!checkTokenExpiry()){
        return navigateTo('/auth/login');
    }
    if (auth.value && auth.value.email !== null) {
        console.log('emailVerified___',checkTokenExpiry())
        authenticated.value = true; // update the state to authenticated

        if (emailVerified.value == null) {
            console.log('email must verify________')
            Swal.fire(
                'Hey!✅',
                'Please verify your email😉',
                'warning',
              );
            abortNavigation();
            return navigateTo('/auth/verify-email');
        }

        if (!to.fullPath.startsWith(`/${auth.value.role}`)) {
            return navigateTo(`/${auth.value.role}/`);
        }

    } else {
        return navigateTo('/auth/login');
    }
});