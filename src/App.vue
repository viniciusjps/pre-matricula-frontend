<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Login from './components/Login.vue';
import Home from './components/Home.vue';
import Navbar from './components/Navbar.vue';
import Service from './Service.vue';

export default {
  name: 'app',
  components: {
    Login,
    Home,
    Navbar,
    Service
  }
}
</script>
