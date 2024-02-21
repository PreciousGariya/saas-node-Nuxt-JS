<template>
  <div class="d-flex justify-content-between mb-4">
    <h1 class="h3 ">Plans</h1>
    <NuxtLink to="/admin/plans/create" class="btn btn-primary">Create
      <Icon name="majesticons:plus" />
    </NuxtLink>
  </div>
  <div v-if="plans" class="row">
    <Alert v-if="status" :data="plan" />

    <div class="col-12 col-md-3" v-for="plan in plans.data" :key="plan.id">
      <div class="card">
        <img class="card-img-top" src="https://demo-basic.adminkit.io/img/photos/unsplash-1.jpg" alt="Unsplash">
        <div class="card-header" :id="plan.id">
          <h5 class="card-title mb-0">{{ plan.title }}</h5>
        </div>
        <div class="card-body">
          <p class="card-text">{{ plan.description }}</p>
          <a href="#" class="card-link">{{ plan.price }}</a>
          <a href="#" class="card-link" @click.prevent="BuyPlan(plan.stripe_price_id, user.auth.stripeCustomerId)">Buy</a>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>No Plans Available</p>
  </div>
</template>
  
<script setup>
import { useAuthStore } from '~/store/auth';
import { usePlans } from "~/composables/plans";

definePageMeta({
  layout: 'user',
  middleware: 'auth'
})


const status = computed(() => plan);

const user = useAuthStore();

const { plan, plans, getPlans, buyPlan } = usePlans();

onMounted(async () => {
  await getPlans()
})


const BuyPlan = async (pr_id, user_id) => {
  plan.value = [];
  await buyPlan(pr_id, user_id)

  console.log('plan',plan.value)
  handleRedirect(plan.value);

}

const handleRedirect = (plan) =>{
  const url = plan.data.session.url;
  console.log('url',url);
  window.open(url, '_blank');
}

</script>