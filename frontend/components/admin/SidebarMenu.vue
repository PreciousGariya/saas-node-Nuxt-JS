<template>
  <nav id="sidebar" class="sidebar js-sidebar">
    <div class="sidebar-content js-simplebar">
      <NuxtLink class="sidebar-brand" to="/">
        <span class="align-middle">
          <Icon name="logos:nuxt-icon" width="2em" height="2em" />
        AdminKit</span>
      </NuxtLink>

      <ul class="sidebar-nav">
        <li class="sidebar-header">
          Pages
        </li>
        <li class="sidebar-item">
          <NuxtLink class="sidebar-link" :to="`/${user.role}`">
            <i class="align-middle" data-feather="sliders"></i> <span class="align-middle">Dashboard</span>
          </NuxtLink>
        </li>

        <li class="sidebar-item">
          <NuxtLink :to="`/${user.role}/posts`" class="sidebar-link">
            <i class="align-middle" data-feather="user"></i> <span class="align-middle">Posts</span>
          </NuxtLink>
        </li>

        <li class="sidebar-item">
          <NuxtLink :to="`/${user.role}/plans`" class="sidebar-link">
            <i class="align-middle" data-feather="log-in"></i> <span class="align-middle">Plans</span>
          </NuxtLink>
        </li>

        <!-- <li class="sidebar-item">
          <a class="sidebar-link" href="pages-sign-up.html">
            <i class="align-middle" data-feather="user-plus"></i> <span class="align-middle">Sign Up</span>
          </a>
        </li>

        <li class="sidebar-item active">
          <a class="sidebar-link" href="pages-blank.html">
            <i class="align-middle" data-feather="book"></i> <span class="align-middle">Blank</span>
          </a>
        </li> -->

        <li class="sidebar-header">
          Tools & Components
        </li>

        <li class="sidebar-item">
          <a class="sidebar-link" href="ui-buttons.html">
            <i class="align-middle" data-feather="square"></i> <span class="align-middle">Buttons</span>
          </a>
        </li>

        <li class="sidebar-item">
          <a class="sidebar-link" href="ui-forms.html">
            <i class="align-middle" data-feather="check-square"></i> <span class="align-middle">Forms</span>
          </a>
        </li>

        <li class="sidebar-item">
          <a class="sidebar-link" href="ui-cards.html">
            <i class="align-middle" data-feather="grid"></i> <span class="align-middle">Cards</span>
          </a>
        </li>

        <li class="sidebar-item">
          <a class="sidebar-link" href="ui-typography.html">
            <i class="align-middle" data-feather="align-left"></i> <span class="align-middle">Typography</span>
          </a>
        </li>

        <li class="sidebar-item">
          <a class="sidebar-link" href="icons-feather.html">
            <i class="align-middle" data-feather="coffee"></i> <span class="align-middle">Icons</span>
          </a>
        </li>

        <li class="sidebar-header">
          Plugins & Addons
        </li>

        <li class="sidebar-item">
          <a class="sidebar-link" href="charts-chartjs.html">
            <i class="align-middle" data-feather="bar-chart-2"></i> <span class="align-middle">Charts</span>
          </a>
        </li>

        <li class="sidebar-item">
          <a class="sidebar-link" href="maps-google.html">
            <i class="align-middle" data-feather="map"></i> <span class="align-middle">Maps</span>
          </a>
        </li>
      </ul>

      <div class="sidebar-cta">
        <div class="sidebar-cta-content">
          <!-- <strong class="d-inline-block mb-2">Logout</strong> -->
          <div class="mb-3 text-sm">
            <!-- Are you looking for more components? Check out our premium version. -->
          </div>
          <div class="d-grid">
            <a href="javascript::voide(0)" @click.prevent="logout" class="btn btn-primary">Logout</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

const { auth } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs
const user = ref(auth.value)
const logout = () => {
  logUserOut();
  router.push('/auth/login');
};
</script>
