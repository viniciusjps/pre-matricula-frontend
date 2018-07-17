<template>
  <div id="app" class="ui container">
    <login></login>
  </div>
</template>

<script>
import Login from './components/Login.vue';

export default {
  name: 'app',
  components: {
    Login,
    Home,
    Navbar
  }
}
</script>
