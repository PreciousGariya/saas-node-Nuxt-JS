import { defineStore } from 'pinia';
import Swal from 'sweetalert2'
import axios from '../plugins/axios'
const $axios = axios().provide.axios;

interface UserPayloadInterface {
  email: string;
  password: string;
}

export const useProfileStore = defineStore('profile', {
  state: () => ({
    loading: false,
    profile: null,
  }),
  actions: {
    async profileData({ email, password }: UserPayloadInterface) {
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
      // if (!response.success) {
      //   Swal.fire(
      //     'ohhh oo!🤒 𐐘💥╾━╤デ╦︻ඞා',
      //     response.errors,
      //     'error',
      //   );
      //   return;
      // }
      // const token = useCookie('token'); // useCookie new hook in nuxt 3
      // token.value = response.data.token; // set token to cookie
      // this.authenticated = true; // set authenticated  state value to true
      // this.user= response.data.user;
      // Swal.fire(
      //   'Great!✅',
      //   'Logged in successfully😉',
      //   'error',
      // );
      
    },
  
    persist: true
  },
});