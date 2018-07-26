<template>
	<div id="home">
		<navbar></navbar>
		<br>
		<div class="ui container">
			<br>
			<div class="ui grid">
				<div class="six wide column">
					<div>
						<h2 class="ui header">
							<img class="ui massive circular image" :src="userUrlImage">
							<div class="content">
								Nome do usuario
								<div class="sub header">
									Matricula
								</div>
							</div>
						</h2>
					</div>
				</div>
				<div class="ten wide column">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Navbar from './Navbar.vue'

export default {
  name: 'home',
  components: {
    'navbar': Navbar
  },
  data () {
    return {
      userUrlImage: '',
      profile: {

      }
    }
  },
  created() {
    this.getImageUrl();
  },
  methods: {
    getImageUrl() {
      var url = gapi.auth2.getAuthInstance().currentUser.Ab.w3.Paa;
      this.setUserImage(url);
    },
    setUserImage(value) {
      this.userUrlImage = value;
    }
  }
}
</script>

<style scoped>
    
</style>