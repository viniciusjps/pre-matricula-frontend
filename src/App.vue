<template>
  <div id="app" class="ui container">
    <login></login>
  </div>
</template>

<script>
import Dropdown from './components/Dropdown.vue'
import Login from './components/Login.vue';

export default {
  name: 'app',
  components: {
    Dropdown,
    Login
  }
}
</script>
