<template>
  <div id="app" class="ui container">
    <hello></hello>
    <login></login>
  </div>
</template>

<script>
import Hello from './components/Hello.vue'
import Dropdown from './components/Dropdown.vue'
import Login from './components/Login.vue';

export default {
  name: 'app',
  components: {
    Hello,
    Dropdown,
    Login
  }
}
</script>
