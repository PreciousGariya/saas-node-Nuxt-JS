<template>
  <div>
    <div class="d-flex justify-content-between mb-4">
    <h1 class="h3 ">{{  $t('Plans') }}</h1>
    <NuxtLink to="/admin/plans/create" class="btn btn-primary">{{  $t('Create') }}
      <Icon name="majesticons:plus" />
    </NuxtLink>
  </div>
  <div class="row" v-if="plans">
    <div class="col-12 col-md-3" v-for="plan in plans" :key="plan.id">
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
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const plans = ref(null)
onMounted(async () => {
  const token = await useCookie('token');
  const header = {
    'Content-Type': 'application/json',
    'Authorization': token.value,
  }
  const { data, pending } = await useFetch(`/api/plans`, {
    method: 'get',
    headers: header,
  });

  plans.value = data._rawValue.data;

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