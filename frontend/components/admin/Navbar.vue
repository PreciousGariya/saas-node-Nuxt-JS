<template>
  <!--  -->
  <nav class="navbar navbar-expand navbar-light navbar-bg">
    <a class="sidebar-toggle js-sidebar-toggle" @click="handleToggleSideBar">
      <!-- <i class="hamburger align-self-center"></i> -->
      <Icon name="heroicons-solid:menu-alt-1" height="2rem" width="2rem"/>
    </a>

    <div class="navbar-collapse collapse">
      <ul class="navbar-nav navbar-align">
        <li class="nav-item dropdown">
          <NuxtLink class="nav-icon dropdown-toggle" to="/" id="alertsDropdown" data-bs-toggle="dropdown">
            <div class="position-relative">
              <!-- <i class="align-middle" data-feather="bell"></i> -->
              <Icon name="mdi:bell-outline"/>
              <span class="indicator">4</span>
            </div>
          </NuxtLink>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0" aria-labelledby="alertsDropdown">
            <div class="dropdown-menu-header">
              4 New Notifications
            </div>
            <div class="list-group">
              <a href="#" class="list-group-item">
                <div class="row g-0 align-items-center">
                  <div class="col-2">
                    <i class="text-danger" data-feather="alert-circle"></i>
                  </div>
                  <div class="col-10">
                    <div class="text-dark">Update completed</div>
                    <div class="text-muted small mt-1">Restart server 12 to complete the update.
                    </div>
                    <div class="text-muted small mt-1">30m ago</div>
                  </div>
                </div>
              </a>
              <a href="#" class="list-group-item">
                <div class="row g-0 align-items-center">
                  <div class="col-2">
                    <Icon name="mdi:bell-outline"/>
                  </div>
                  <div class="col-10">
                    <div class="text-dark">Lorem ipsum</div>
                    <div class="text-muted small mt-1">Aliquam ex eros, imperdiet vulputate
                      hendrerit et.</div>
                    <div class="text-muted small mt-1">2h ago</div>
                  </div>
                </div>
              </a>
              <a href="#" class="list-group-item">
                <div class="row g-0 align-items-center">
                  <div class="col-2">
                    <Icon name="mdi:bell-outline"/>
                  </div>
                  <div class="col-10">
                    <div class="text-dark">Login from 192.186.1.8</div>
                    <div class="text-muted small mt-1">5h ago</div>
                  </div>
                </div>
              </a>
              <a href="#" class="list-group-item">
                <div class="row g-0 align-items-center">
                  <div class="col-2">
                    <!-- <i class="text-success" data-feather="user-plus"></i> -->
                    <Icon name="mdi:bell-outline"/>
                  </div>
                  <div class="col-10">
                    <div class="text-dark">New connection</div>
                    <div class="text-muted small mt-1">Christina accepted your request.</div>
                    <div class="text-muted small mt-1">14h ago</div>
                  </div>
                </div>
              </a>
            </div>
            <div class="dropdown-menu-footer">
              <a href="#" class="text-muted">Show all notifications</a>
            </div>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-icon dropdown-toggle" href="#" id="messagesDropdown" data-bs-toggle="dropdown">
            <div class="position-relative">
              <i class="align-middle" data-feather="message-square"></i>
              <Icon name="material-symbols:chat-outline"/>
            </div>
          </a>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0" aria-labelledby="messagesDropdown">
            <div class="dropdown-menu-header">
              <div class="position-relative">
                4 New Messages
              </div>
            </div>
            <div class="list-group">
              <a href="#" class="list-group-item">
                <div class="row g-0 align-items-center">
                  <div class="col-2">
                    <img src="https://demo-basic.adminkit.io/img/avatars/avatar-5.jpg"
                      class="avatar img-fluid rounded-circle" alt="Vanessa Tucker">
                  </div>
                  <div class="col-10 ps-2">
                    <div class="text-dark">Vanessa Tucker</div>
                    <div class="text-muted small mt-1">Nam pretium turpis et arcu. Duis arcu
                      tortor.</div>
                    <div class="text-muted small mt-1">15m ago</div>
                  </div>
                </div>
              </a>
              <a href="#" class="list-group-item">
                <div class="row g-0 align-items-center">
                  <div class="col-2">
                    <img src="https://demo-basic.adminkit.io/img/avatars/avatar-2.jpg"
                      class="avatar img-fluid rounded-circle" alt="William Harris">
                  </div>
                  <div class="col-10 ps-2">
                    <div class="text-dark">William Harris</div>
                    <div class="text-muted small mt-1">Curabitur ligula sapien euismod vitae.
                    </div>
                    <div class="text-muted small mt-1">2h ago</div>
                  </div>
                </div>
              </a>
              <a href="#" class="list-group-item">
                <div class="row g-0 align-items-center">
                  <div class="col-2">
                    <img src="https://demo-basic.adminkit.io/img/avatars/avatar-4.jpg"
                      class="avatar img-fluid rounded-circle" alt="Christina Mason">
                  </div>
                  <div class="col-10 ps-2">
                    <div class="text-dark">Christina Mason</div>
                    <div class="text-muted small mt-1">Pellentesque auctor neque nec urna.</div>
                    <div class="text-muted small mt-1">4h ago</div>
                  </div>
                </div>
              </a>
              <a href="#" class="list-group-item">
                <div class="row g-0 align-items-center">
                  <div class="col-2">
                    <img src="https://demo-basic.adminkit.io/img/avatars/avatar-3.jpg"
                      class="avatar img-fluid rounded-circle" alt="Sharon Lessman">
                  </div>
                  <div class="col-10 ps-2">
                    <div class="text-dark">Sharon Lessman</div>
                    <div class="text-muted small mt-1">Aenean tellus metus, bibendum sed,
                      posuere ac, mattis non.</div>
                    <div class="text-muted small mt-1">5h ago</div>
                  </div>
                </div>
              </a>
            </div>
            <div class="dropdown-menu-footer">
              <a href="#" class="text-muted">Show all messages</a>
            </div>
          </div>
        </li>
        <ThemeChanger />
        <LangSwitcher />
        <li class="nav-item dropdown">
          <a class="nav-icon dropdown-toggle d-inline-block d-sm-none" href="#" data-bs-toggle="dropdown">
            <i class="align-middle" data-feather="settings"></i>
          </a>

          <a class="nav-link dropdown-toggle d-none d-sm-inline-block" href="#" data-bs-toggle="dropdown">
            <img src="https://demo-basic.adminkit.io/img/avatars/avatar.jpg" class="avatar img-fluid rounded me-1"
              alt="Charles Hall" /> <span class="text-dark"> {{ `${user.firstName} ${user.lastName}` }}</span>
          </a>
          <div class="dropdown-menu dropdown-menu-end">
            <NuxtLink class="dropdown-item" to="/auth/profile"><i class="align-middle me-1" data-feather="user"></i>
              Profile</NuxtLink>
            <a class="dropdown-item" href="#"><i class="align-middle me-1" data-feather="pie-chart"></i>
              Analytics</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="index.html"><i class="align-middle me-1" data-feather="settings"></i> Settings
              & Privacy</a>
            <a class="dropdown-item" href="#"><i class="align-middle me-1" data-feather="help-circle"></i> Help Center</a>
            <div class="dropdown-divider"></div>
            <NuxtLink class="dropdown-item" href="#" @click="logout">Log out</NuxtLink>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth'; // import the auth store we just created

const router = useRouter();

const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated, auth } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const user = ref(auth.value)
const logout = () => {
  logUserOut();
  router.push('/auth/login');
};

const handleToggleSideBar = () =>{
  // localStorage.setItem('sidebar', 'collapsed');
  let sidebar = document.getElementById('sidebar');
  if(sidebar.classList.contains('collapsed')){
    sidebar.classList.remove('collapsed')
  }else{
    sidebar.classList.add('collapsed')
  }
  
}

const storedTheme = localStorage.getItem('theme');
const selectedTheme = ref(storedTheme ?? 'dark');

onMounted(() => {
  setTheme(getPreferredTheme())
})

const getPreferredTheme = () => {
  if (storedTheme) {
    return storedTheme
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const changeAppTheme = (theme) => {
  setTheme(theme)
  selectedTheme.value = theme

  localStorage.setItem('theme', theme)
  setTheme(theme)
  showActiveTheme(theme)
}

const setTheme = (theme) => {
  if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-bs-theme', 'dark')
  } else {
    document.documentElement.setAttribute('data-bs-theme', theme)
  }
}

const showActiveTheme = theme => {
  const activeThemeIcon = document.querySelector('.theme-icon-active use')
  const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
  const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')

  document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
    element.classList.remove('active')
  })

  btnToActive.classList.add('active')
  activeThemeIcon.setAttribute('href', svgOfActiveBtn)
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (storedTheme !== 'light' || storedTheme !== 'dark') {
    setTheme(getPreferredTheme())
  }
})

</script>

