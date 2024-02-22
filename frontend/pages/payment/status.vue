<template>

</template>

<script setup>
definePageMeta({
    layout: 'user',
    middleware: 'auth'
  })
  const route = useRoute()
console.log('routes', route.query)
</script>