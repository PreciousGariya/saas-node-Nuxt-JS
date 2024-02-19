import { defineStore } from 'pinia';
import Swal from 'sweetalert2'

interface UserPayloadInterface {
  email: string;
  password: string;
}

interface UseRegisterDataInterface {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    emailVerified: null,
    loading: false,
    access_token: null,
    refresh_token: null,
    auth: {
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      role: null,
      subscriptionStatus: null,
      stripeCustomerId: null,
      isActive: null,
      created_at: null

    },
  }),
  persist: true,
  actions: {
    async authenticateUser({ email, password }: UserPayloadInterface) {
      // useFetch from nuxt 3
      const apiUrl = process.env.API_URL;

      const { data, pending }: any = await useFetch(`/api/login`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          email,
          password,
        },
      });
      this.loading = pending;
      const response = data._rawValue;
      // console.log('response data', response);
      if (!response.success) {
        Swal.fire(
          'ohhh oo!🤒',
          response.errors,
          'error',
        );
        return;
      }
      console.log(response.data.user)
      // const token = useCookie('token'); // useCookie new hook in nuxt 3
      // token.value = response.data.token; // set token to cookie
      // this.access_token = response.data.token;
      const token = useCookie('token', { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) }); // Set expiry for 1 day (in milliseconds)
      token.value = response.data.token; // Set token value
      this.refresh_token = response.data.refreshToken;
      const refresh_token = useCookie('refresh_token', { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }); // Set expiry for 7 days (in milliseconds)
      refresh_token.value = response.data.refreshToken; // Set token value
      this.authenticated = true; // set authenticated  state value to true
      this.setUser(response.data.user)
      Swal.fire(
        'Great!✅',
        'Logged in successfully😉',
        'error',
      );

    },
    async register(
      { firstName,
        lastName,
        email,
        phone,
        password,
        confirmPassword,
      }: UseRegisterDataInterface) {

      if (password !== confirmPassword) {
        Swal.fire(
          'ohhh oo!🤒 𐐘💥╾━╤デ╦︻ඞා',
          'passwords do not match',
          'error',
        );
        return;
      }
      const { data, pending }: any = await useFetch(`/api/register`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          firstName,
          lastName,
          phone,
          email,
          password,
          confirmPassword
        },
      });
      this.loading = pending;
      const response = data._rawValue;
      if (!response.success) {
        Swal.fire(
          'ohhh oo!🤒',
          response.errors,
          'error',
        );
        return;
      }
      console.log(response.data.user)
      // const token = useCookie('token'); // useCookie new hook in nuxt 3
      // token.value = response.data.token; // set token to cookie
      
      // 
      const token = useCookie('token', { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) }); // Set expiry for 1 day (in milliseconds)
      token.value = response.data.token; // Set token value
      // refresh token

      const refresh_token = useCookie('refresh_token', { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }); // Set expiry for 7 days (in milliseconds)
      refresh_token.value = response.data.refreshToken; // Set token value


      this.authenticated = true; // set authenticated  state value to true
      this.setUser(response.data.user)
      Swal.fire(
        'Great!✅',
        'Registered successfully! please verify your email😉',
        'success',
      );
    },
    setUser(data:any) {
      this.auth.id = data.id;
      this.auth.firstName = data.firstName;
      this.auth.lastName = data.lastName;
      this.auth.email = data.email;
      this.auth.phone = data.phone;
      this.auth.role = data.role;
      this.auth.subscriptionStatus = data.subscriptionStatus;
      this.auth.stripeCustomerId = data.stripeCustomerId;
      this.auth.isActive = data.isActive;
      this.auth.created_at = data.created_at;
      this.emailVerified = data.emailVerified;
    },
   
    async verifyEmail (user:any) {
      const { data, pending }: any = await useFetch(`/api/verify-email`, {
        method: 'post',
        headers: await this.tokenizedHeader(),
        body: {
          email: user.email,
          verificationCode: user.verification_code
        },
      });
      this.loading = pending;
      const response = data._rawValue;
      if (response.success) {
        this.emailVerified = response.data.emailVerified;
        this.authenticated = true;
        Swal.fire(
          'Great!✅',
          'Email verified successfully😉',
          'success',
        )
        return;

      }else{
        Swal.fire(
          'Oh Oo!⚠️',
          response.message,
          'error',
        )
      }
    },
    async resendOtp(email:string){
      const { data, pending }: any = await useFetch(`/api/resend-otp`, {
        method: 'post',
        headers: await this.tokenizedHeader(),
        body: {
          email
        },
      });
      this.loading = pending;
      const response = data._rawValue;
      if (!response.success) {
        Swal.fire(
          'ohhh oo!🤒',
          response.errors??response.message,
          'error',
        );
        return;
      }else{
        Swal.fire(
          'Great!✅',
          'OTP sent successfully😉',
          'success',
        );
      }
    },
    async tokenizedHeader() {
      return {
        'Content-Type' : 'application/json',
        'Authorization': useCookie('token').value,
      };
    },
    logUserOut() {
      const token = useCookie('token'); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
      this.auth.id = null;
      this.auth.firstName = null;
      this.auth.lastName = null;
      this.auth.email = null;
      this.auth.phone = null;
      this.auth.role = null;
      this.auth.subscriptionStatus = null;
      this.auth.stripeCustomerId = null;
      this.auth.isActive = null;
      this.auth.created_at = null;
      return navigateTo('/auth/login');
    },

  },
});