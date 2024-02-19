import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
import { checkTokenExpiry } from '~/utils/checkTokenExpiry'
const { authenticated, emailVerified, auth } = storeToRefs(useAuthStore()); // make authenticated state reactive
export default defineNuxtRouteMiddleware((to) => {

    if (!checkTokenExpiry()) {
        if (to.fullPath == "/auth/verify-email") {
            return navigateTo("/auth/login")
        }

        console.log('first')
        return navigateTo("/auth/login")
            
    } else {
        // not expired
        if(emailVerified.value !=null && to.fullPath=="/auth/verify-email"){
        console.log('2')

            return navigateTo(`/${auth.value?.role}/`)
        }
        else if (auth.value?.role !=null && (to.fullPath == "/auth/login" || to.fullPath == "/auth/register")) {
            // dashboard
        console.log('3')

            return navigateTo(`/${auth.value?.role}/`)
        }
        console.log('4')


        // if (auth.value && auth.value.email == null) {
        //     //need verify
        //     console.log('first')
        //     return navigateTo("auth/verify-email")
        // } 
    }

});