<template>
    <h1>Admin Dashboard </h1>
    <p>{{ user }}</p>
</template>

<script setup>
import { useAuthStore } from '~/store/auth';
const user= useAuthStore();
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})
</script>