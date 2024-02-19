<template>
  <div class="container content-space-3 content-space-t-lg-4 content-space-b-lg-3">
    <div class="card card-body flex-grow-1 mx-auto border-0 shadow-sm" style="max-width: 28rem;">
      <!-- Heading -->
      <div class="text-center mb-2 mb-md-7">
        <h6 class="h2">Please enter the one time password to verify your account</h6>
        <p><span>A code has been sent to </span> <small>{{ maskEmail(auth?.email) }}</small>.</p>
      </div>
      <!-- End Heading -->

      <!-- Form -->
      <form>
        <div id="otp" class="inputs d-flex flex-row justify-content-center mt-2"> 
          <input
            v-for="(input, index) in otpInputs"
            :key="index"
            class="m-2 text-center form-control rounded"
            type="text"
            :id="'otpInput' + index"
            v-model="otpInputs[index]"
            maxlength="1"
            @input="handleInput(index)"
            @keydown="handleKeyDown($event, index)"
          />
        </div>
        <div class="mt-4 text-center">
          <button class="btn btn-primary px-4 validate" @click.prevent="verifyEmailHandler">Verify Email</button>
          <a href="javascript:void(0)" class="btn btn-link link-secondary" @click.prevent="handleResendOtp">Resend OTP</a>
        </div>
        
      </form>
      <!-- End Form -->
    </div>
  </div>
</template>
<style scoped>
.form-control{
    height: 80px;
    font-weight: 600;
    font-size: 40px;
    color: #656565!important;
}
</style>
<script setup>
 definePageMeta({
    middleware:'auth-redirect'
  });
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth'; // import the auth store we just created

const { authenticateUser, verifyEmail,resendOtp } = useAuthStore(); // use authenticateUser action from  auth store

const { authenticated, auth, emailVerified } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs
// definePageMeta({
// middleware: 'auth',
// })
const router = useRouter();
const otpInputs = ref(['', '', '', '']); 

const maskEmail = (email) => {
  // Split the email address into local part and domain
  const [localPart, domain] = email.split('@');
  // Calculate the length of the local part
  const localPartLength = localPart.length;
  // Keep the first letter of the local part visible
  const maskedLocalPart = localPart.charAt(0) + '*'.repeat(localPartLength - 1) + localPart.charAt(localPartLength - 1);
  // Concatenate the masked local part with the domain
  return maskedLocalPart + '@' + domain;
};


const verifyEmailHandler = async () => {
  const otp = otpInputs.value.join('');
  if(!otp){
    Swal.fire(
          'Oh Oo!⚠️',
          'Please Enter One time password first',
          'error',
        )
        return false;
  }
  const data = { verification_code: parseInt(otp), email: auth.value?.email }

  await verifyEmail(data); // call authenticateUser and pass the user object
  // redirect to homepage if user is authenticated

  if (emailVerified.value != null) {
    Swal.fire({
      icon: 'success',
      title: 'Email verified successfully',
      showConfirmButton: false,
      timer: 1500
    });
    router.push('/user');
  }

};

const handleInput = (index) => {
      // If the input value is entered, move focus to the next input
      if (otpInputs.value[index] !== '') {
        if (index < 3) {
          document.getElementById(`otpInput${index + 1}`).focus();
        }
      }
    };

    const handleKeyDown = (event, index) => {
      const keyCode = event.keyCode;
      // Allow only numeric keys (0-9) and backspace (8)
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 8) {
        event.preventDefault();
        otpInputs.value[index] = ''; // Clear the input value if a non-numeric character is entered
      } else if (keyCode === 8 && index > 0 && otpInputs.value[index] === '') {
        // If backspace is pressed and the input is empty, move focus to the previous input
        document.getElementById(`otpInput${index - 1}`).focus();
      }
    };

    const handleResendOtp = async() => {
      await resendOtp(auth.value?.email);
    };

</script>