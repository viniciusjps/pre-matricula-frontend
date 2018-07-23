<template>
  <div id="home">
    <navbar></navbar>
    <br>
    <div class="ui container">
      <div class="ui grid">
        <div class="ten wide column">
        </div>
        <div class="six wide column">
          
        </div>
      </div>
    </div>
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
      user_image: ''

    }
  },
  methods: {
    getImageUrl() {
      var user_image_url = gapi.auth2.getAuthInstance().currentUser.Ab.w3.Paa;
      this.setUserImage(user_image_url);
    },
    setUserImage(value) {
      this.user_image = value;
    }
  }
}
</script>

<style scoped>
    
</style>