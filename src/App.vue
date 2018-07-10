<template>
  <div id="app">
    <br>
    <dropdown class="ui container"></dropdown>
    <hello></hello>
  </div>
</template>

<script>
import Hello from './components/Hello.vue'
import Dropdown from './components/Dropdown.vue'

export default {
  name: 'app',
  components: {
    Hello,
    Dropdown
  }
}
</script>
