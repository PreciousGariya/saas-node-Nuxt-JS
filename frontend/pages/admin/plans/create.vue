<template>
  <div>
    <div class="d-flex justify-content-between mb-4">
      <h1 class="h3 ">{{  $t('Plan Create') }} </h1>
      <NuxtLink to="/admin/plans/" class="btn btn-primary">{{  $t('List') }}
        <Icon name="majesticons:plus" />
      </NuxtLink>
    </div>

    <div class="row">
      <div class="col-12 col-md-12">
        <div class="card">
          <form id="post-create-form" class="p-4" @submit.prevent="planCreate">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-2">
                  <label id="name-label" for="name">{{  $t('title') }}</label>
                  <input type="text" v-model="plan.title" @change="v$.title.$touch" name="title" id="name"
                    placeholder="Enter your plan title" class="form-control"
                    :class="{ 'border-danger': v$.title.$errors.length }" required>
                  <div class="error-msg invalid-feedback d-block" v-for="error of v$.title.$errors" :key="error.$uid">{{
                    error.$message }}</div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-2">
                  <label id="price" for="price">{{  $t('price') }}</label>
                  <input type="text" name="price" v-model="plan.price" @change="v$.price.$touch" id="price"
                    :class="{ 'border-danger': v$.price.$errors.length }" placeholder="Please Enter Price"
                    class="form-control" required>
                  <div class="error-msg invalid-feedback d-block" v-for="error of v$.price.$errors" :key="error.$uid">{{
                    error.$message }}</div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="form-group mb-2">
                  <label>{{  $t('description') }}</label>
                  <textarea v-model="plan.description" id="comments" @change="v$.description.$touch" class="form-control"
                    name="comment" placeholder="Enter your comment here..."
                    :class="{ 'border-danger': v$.description.$errors.length }"></textarea>
                  <div class="error-msg invalid-feedback d-block" v-for="error of v$.description.$errors"
                    :key="error.$uid">{{ error.$message }}</div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <button type="submit" id="submit" class="btn btn-primary btn-block">{{  $t('Submit') }}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})
import Swal from 'sweetalert2'
import { useVuelidate } from '@vuelidate/core';

import { required, minLength, maxLength, numeric, helpers } from '@vuelidate/validators';
const rules = computed(() => {
  return {
    title: {
      required: helpers.withMessage('The first name field is required', required),
      // maxLength: maxLength(10),
    },
    price: {
      required: helpers.withMessage('The Price field is required', required),
      numeric: helpers.withMessage('The Price field must be a number', numeric),
    },
    description: {
      required: helpers.withMessage('The Price field is required', required),
      // minValue: maxLength(10),
      // maxValue: minLength(9999),
    },
  };
});
const plan = ref({
  title: '',
  price: '',
  description: ''
})
const v$ = useVuelidate(rules, plan);
const resetValues = () => {
  plan.value = {
    title: '',
    price: '',
    description: ''
  }
}
const planCreate = async () => {
  v$.value.$validate();
  if (v$.value.$error) {
    Swal.fire('ohhh oo!🤒', 'Please fix the errors in the form', 'error');
    return;
  }
  const token = await useCookie('token');
  const header = {
    'Content-Type': 'application/json',
    'Authorization': token.value,
  }
  const { data, pending } = await useFetch(`/api/plan`, {
    method: 'post',
    headers: header,
    body: plan.value,
  });
  let response = data._rawValue;
  if (response.success) {
    resetValues();
    Swal.fire('Great✅', 'Plan Created Successfully Created', 'success');
  } else {
    Swal.fire('ohhh oo!🤒', response.message, 'error');
  }
}
</script>