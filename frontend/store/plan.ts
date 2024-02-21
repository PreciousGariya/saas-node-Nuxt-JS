import { defineStore } from 'pinia';
import Swal from 'sweetalert2'

interface UserPayloadInterface {
  user_id: string;
  price_id: string;
}

export const usePlanStore = defineStore('plan', {
  state: () => ({
    loading: false,
    plan: null,
  }),
  actions: {
    async purchasePlan({ user_id, price_id }: UserPayloadInterface) {
      // useFetch from nuxt 3
      const apiUrl = process.env.API_URL;

      const { data, pending }: any = await $fetch(`/api/buy/plan`, {
        method: 'post',
        body: {
          user_id, price_id 
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
      return response;
    },

    async getPlans() {
      // useFetch from nuxt 3
      const apiUrl = process.env.API_URL;

      const { data, pending }: any = await $fetch(`/api/plans`, {
        method: 'get',
        headers: await this.tokenizedHeader(),
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
      }
      return response;
    },

  async tokenizedHeader() {
      return {
        'Content-Type' : 'application/json',
        'Authorization': useCookie('token').value,
      };
    },
  
    persist: true
  },
});