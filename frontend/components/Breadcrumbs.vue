<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <NuxtLink :to="`/${user.role}`">{{user.role}}</NuxtLink>
        </li>
        <li v-for="(crumb, index) in crumbs" :key="index" class="breadcrumb-item active text-capitalize" aria-current="page">{{ crumb.name }}</li>
      </ol>
    </nav>
    <!-- <pre>{{ crumbs }}</pre> -->
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

const { auth } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs
const user= ref(auth.value)

  const route = useRoute();
  const router = useRouter();
  const i18n = useI18n();

  const crumbs = computed(() => {
    const crumbs = []
    route.matched.forEach((item, i, { length }) => {
      console.log(i, 'ddd')
      const crumb = {}
      crumb.path = item.path
      crumb.name = item.name.substr()
      crumbs.push(crumb)
    })

    return crumbs
    /*const pathArray = route.path.split('/')
    pathArray.shift()
    const breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
      breadcrumbArray.push({
        to: breadcrumbArray[idx - 1] ? '/' + breadcrumbArray[idx - 1].path + '/' + path : '/' + path,
        title: path
      })
      return breadcrumbArray
    }, [])
    return breadcrumbs*/
  })
</script>

<style scoped>

</style>