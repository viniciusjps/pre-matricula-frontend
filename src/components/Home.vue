<template>
  <div id="home">
    <navbar></navbar>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'
import Disciplines from './Disciplines.vue';

export default {
  name: 'home',
  components: {
    'navbar': Navbar,
		'disciplines': Disciplines
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>
    
</style>