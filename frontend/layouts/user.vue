<template>
    <div class="wrapper">
       <AdminSidebarMenu/>

        <div class="main">
            <AdminNavbar/>

            <main class="content">
                <slot />
            </main>

            <footer class="footer">
                <div class="container-fluid">
                    <div class="row text-muted">
                        <div class="col-6 text-start">
                            <p class="mb-0">
                                <NuxtLink class="text-muted" to="/"
                                    target="_blank"><strong>Node</strong></NuxtLink> - <a class="text-muted" target="_blank"><strong>SAAS Application</strong></a> &copy;
                            </p>
                        </div>
                        <div class="col-6 text-end">
                            <ul class="list-inline">
                                <li class="list-inline-item">
                                    <NuxtLink class="text-muted" to="/" target="_blank">Support</NuxtLink>
                                </li>
                                <li class="list-inline-item">
                                    <NuxtLink class="text-muted" to="/" target="_blank">Help Center</NuxtLink>
                                </li>
                                <li class="list-inline-item">
                                    <NuxtLink class="text-muted" to="/" target="_blank">Privacy</NuxtLink>
                                </li>
                                <li class="list-inline-item">
                                    <NuxtLink class="text-muted" to="/" target="_blank">Terms</NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
    </div>
</div>
</template>
  
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

const router = useRouter();


const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated, auth } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs
const user = ref(auth.value)
const logout = () => {
    logUserOut();
    router.push('/auth/login');
};
</script>