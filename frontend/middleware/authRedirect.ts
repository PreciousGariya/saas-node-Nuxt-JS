import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
import { checkTokenExpiry } from '~/utils/checkTokenExpiry'
const { authenticated, emailVerified, auth } = storeToRefs(useAuthStore()); // make authenticated state reactive
export default defineNuxtRouteMiddleware((to) => {

    if (!checkTokenExpiry()) {
        if (to.fullPath == "/auth/verify-email") {
            return navigateTo("/auth/login")
        }
            
    } else {
        // not expired
        if(emailVerified !=null && to.fullPath=="/auth/verify-email"){
            return navigateTo(`/${auth.value?.role}/`)
        }else if (to.fullPath == "/auth/login" || to.fullPath == "/auth/register") {
            // dashboard
            return navigateTo(`/${auth.value?.role}/`)
        }


        // if (auth.value && auth.value.email == null) {
        //     //need verify
        //     console.log('first')
        //     return navigateTo("auth/verify-email")
        // } 
    }

});