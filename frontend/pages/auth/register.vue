<template>
  <div class="container content-space-3 content-space-t-lg-4 content-space-b-lg-3">
    <div class="card card-body flex-grow-1 mx-auto border-0 shadow-sm" style="max-width: 28rem;">
      <!-- Heading -->
      <div class="text-center mb-5 mb-md-7">
        <h1 class="h2">Welcome back</h1>
        <p>Login to manage your account.</p>
      </div>
      <!-- End Heading -->

      <!-- Form -->
      <form class="js-validate needs-validation">
        <!-- Form -->
        <!--  -->
        <div class="mb-3">
          <label class="form-label" for="name">Your first name</label>
          <input type="text" class="form-control form-control-lg" v-model="user.firstName" name="firstName" id="firstName"
            @change="v$.firstName.$touch" placeholder="Jhon Deo" aria-label="Jhon Deo" :class="{ 'border-danger': v$.firstName.$errors.length }">
            <div class="error-msg invalid-feedback d-block" v-for="error of v$.firstName.$errors" :key="error.$uid">{{ error.$message }}</div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="name">Your last name</label>
          <input type="text" class="form-control form-control-lg" v-model="user.lastName" name="lastName" id="lastName"
            @change="v$.lastName.$touch" placeholder="Jhon Deo" aria-label="Jhon Deo" :class="{ 'border-danger': v$.lastName.$errors.length }">
            <div class="error-msg invalid-feedback d-block" v-for="error of v$.lastName.$errors" :key="error.$uid">{{ error.$message }}</div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="signupSimpleSignupEmail">Your email</label>
          <input type="email" class="form-control form-control-lg" @change="v$.email.$touch" v-model="user.email"
            name="email" id="signupSimpleSignupEmail" placeholder="email@site.com" aria-label="email@site.com"
            required="" :class="{ 'border-danger': v$.email.$errors.length }">
            <div class="error-msg invalid-feedback d-block" v-for="error of v$.email.$errors" :key="error.$uid">{{ error.$message }}</div>
        </div>
        <!-- End Form -->
        <div class="mb-3">
          <label class="form-label" for="name">Phone</label>
          <input type="text" class="form-control form-control-lg" v-model="user.phone" name="phone" id="phone"
            @change="v$.phone.$touch" placeholder="Jhon Deo" aria-label="8923626424" :class="{ 'border-danger': v$.phone.$errors.length }">
            <div class="error-msg invalid-feedback d-block" v-for="error of v$.phone.$errors" :key="error.$uid">{{ error.$message }}</div>
        </div>
        <!-- Form -->
        <div class="mb-3">
          <label class="form-label" for="signupSimpleSignupPassword">Password</label>
          <div class="input-group input-group-merge" >
            <input :type="inputType" class="js-toggle-password form-control form-control-lg" :class="{ 'border-danger': v$.password.$errors.length }"
             v-model="user.password" name="password" id="signupSimpleSignupPassword" placeholder="8+ characters required"
              @change="v$.password.$touch" aria-label="8+ characters required">
            <a class="js-toggle-password-target-1 input-group-append input-group-text" href="javascript:;" @click="togglePassword">
              <Icon v-if="passwordShow" name="ri:eye-off-fill" />
              <Icon v-else name="mdi:eye" />
            </a>
          </div>
            <div class="error-msg invalid-feedback d-block" v-for="error of v$.password.$errors" :key="error.$uid">{{ error.$message }}</div>
        </div>
        <!-- End Form -->

        <!-- Form -->
        <div class="mb-3" >
          <label class="form-label" for="signupSimpleSignupConfirmPassword">Confirm password</label>

          <div class="input-group input-group-merge">
            <input :type="inputType" class="js-toggle-password form-control form-control-lg" v-model="user.confirmPassword"
              name="confirmPassword" id="signupSimpleSignupConfirmPassword" placeholder="8+ characters required"
              @change="v$.confirmPassword.$touch" aria-label="8+ characters required" :class="{ 'border-danger': v$.confirmPassword.$errors.length }">
            <a class="js-toggle-password-target-2 input-group-append input-group-text" href="javascript:;" @click="togglePassword">
              <Icon v-if="passwordShow" name="ri:eye-off-fill" />
              <Icon v-else name="mdi:eye" />
            </a>
          </div>
            <div class="error-msg invalid-feedback d-block" v-for="error of v$.confirmPassword.$errors" :key="error.$uid">{{ error.$message }}</div>
        </div>
        <!-- End Form -->

        <!-- Check -->
        <div class="form-check mb-3" :class="{ error: v$.terms.$errors.length }">
          <input type="checkbox" v-model="user.terms" class="form-check-input" id="signupHeroFormPrivacyCheck"
            name="signupFormPrivacyCheck" @change="handlePrivacyChange" :checked="privacyChecked">
          <label class="form-check-label small" for="signupHeroFormPrivacyCheck"><a href="./page-privacy.html">Privacy Policy</a></label>
            <div class="invalid-feedback d-block" v-for="error of v$.terms.$errors" :key="error.$uid">{{ error.$message }}</div>
        </div>
        <!-- End Check -->
        <div class="d-grid mb-3">
          <button type="submit" class="btn btn-primary btn-lg" @click.prevent="authRegister" :disabled="pending">Register 
            <Icon v-if="pending" name="svg-spinners:6-dots-rotate" />
          </button>
        </div>

        <div class="text-center">
          <p>Already have an account? <NuxtLink to="/auth/login" class="link">Log in here</NuxtLink>
          </p>
        </div>
      </form>
      <!-- End Form -->
    </div>
  </div>
</template>

<script setup>
 definePageMeta({
    middleware:'auth-redirect'
  });
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth'; // import the auth store we just created
import { required, email, sameAs, minLength, maxLength, numeric, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import Swal from 'sweetalert2'

const { register } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated, auth, email_verified } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs
const router = useRouter();
const pending = ref(false);
const passwordShow= ref(false);
const inputType = computed(() => passwordShow.value ? 'text' : 'password');
const rules = computed(() => {
  return {
    firstName: {
      required: helpers.withMessage('The first name field is required', required),
      maxLength: maxLength(10),
    },
    lastName: {
      required: helpers.withMessage('The last name field is required', required),
      maxLength: maxLength(10),
    },
    phone: {
      required: helpers.withMessage('The Phone field is required', required),
      maxLength: maxLength(11),
      minLength: minLength(10),
      numeric: helpers.withMessage('The Phone field must be a number', required),
    },
    email: {
      required: helpers.withMessage('The email field is required', required),
      email: helpers.withMessage('Invalid email format', email),
    },
    password: {
      required: helpers.withMessage('The password field is required', required),
      minLength: minLength(6),
    },
    confirmPassword: {
      required: helpers.withMessage('The password confirmation field is required', required),
      sameAs: helpers.withMessage("Passwords don't match", sameAs(user.value.password)),
    },
    terms: {
      required: helpers.withMessage('The terms and conditions field is required', required),
      sameAs: helpers.withMessage("The terms and conditions must be accepted", sameAs(true)),
    },
  };
});
const user = ref({
  email: '',
  phone: '',
  password: '',
  firstName: '',
  lastName: '',
  confirmPassword: '',
  terms: false
});
const v$ = useVuelidate(rules, user);
const privacyChecked = ref(false);
const handlePrivacyChange = () => {
  privacyChecked.value = !privacyChecked.value;
  if(privacyChecked.value){
    user.value.terms = true;
  }else{
    user.value.terms = false;
  }
}

const togglePassword = () => {
  passwordShow.value = !passwordShow.value;
}
const authLogin = () => {
  router.push('/admin')
}

const authRegister = async () => {
  pending.value = true;
  v$.value.$validate();
  
  if (v$.value.$error) {
    Swal.fire('ohhh oo!🤒','Please fix the errors in the form','error');
    pending.value = false;
    return;
  }
  await register(user.value); // call authenticateUser and pass the user object
  // redirect to homepage if user is authenticated

  if (authenticated.value) {
    pending.value = true;
    // router.push('/auth/verify-email');
    // return navigateTo('/auth/verify-email')
    if ((auth.value != null) && (auth.value.role == 'user')) {
      console.log('push');
      router.push('/user');
    } else {
      router.push('/admin');
    }
  }
};
</script>