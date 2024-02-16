<template>
  <h1>{{user }}Admin Dashboard </h1>
 
</template>

<script setup>
import { useAuthStore } from '~/store/auth'; 
const user= useAuthStore();
definePageMeta({
layout: 'user',
middleware: 'auth',
})
</script>