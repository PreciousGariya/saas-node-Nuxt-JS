<template>
  <div>
    <div class="d-flex justify-content-between mb-4">
    <h1 class="h3 ">{{  $t('Plans') }}</h1>
    <NuxtLink to="/admin/plans/create" class="btn btn-primary">{{  $t('Create') }}
      <Icon name="majesticons:plus" />
    </NuxtLink>
  </div>
  <div class="row" v-if="plans">
    <div class="col-12 col-md-3" v-for="plan in plans.data" :key="plan.id">
      <div class="card">
        <img class="card-img-top" src="https://demo-basic.adminkit.io/img/photos/unsplash-1.jpg" alt="Unsplash">
        <div class="card-header" :id="plan.id">
          <h5 class="card-title mb-0">{{ plan.title }}</h5>
        </div>
        <div class="card-body">
          <p class="card-text">{{ plan.description }}</p>
          <a href="#" class="card-link">{{ plan.price }}</a>
          <a href="#" class="card-link">Edit</a>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>No Plans Available</p>
  </div>
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


/*const {
  data: users,
  pending: fetchUsers,
  error: fetchUsersError,
    refresh,
} = useAsyncData('get-users', async () => {
  let response
  try {
    response = await getUsers()
  } catch (error){}
  return response;
})*/

</script>