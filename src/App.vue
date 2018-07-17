<template>
  <div id="app" class="ui container">
    <router-view/>
  </div>
</template>

<script>
import Login from './components/Login.vue';
import Home from './components/Home.vue';
import Navbar from './components/Navbar.vue'

export default {
  name: 'app',
  components: {
    Login,
    Home,
    Navbar
  }
}
</script>
