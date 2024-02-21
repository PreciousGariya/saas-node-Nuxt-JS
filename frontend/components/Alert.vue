<template>
    <div v-if="data && data.success">
        <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Great 🤗🤗!</strong>  {{ data.message }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>
    <div v-if="data && !data.success">
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Opps 😤😤! </strong>  {{ data.message }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>

</template>

<script setup>
defineProps({
  data: {
    type: Object,
  }
});
</script>