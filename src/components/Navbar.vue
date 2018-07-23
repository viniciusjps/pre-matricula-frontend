<template>
	<div id="navbar">
		<div>
			<div class="ui secondary pointing menu">
				<router-link to="/home" active-class="active">
					<a class="item">
						<i class="home icon"></i>
						Home
					</a>
				</router-link>
				<router-link to="/disciplinas" active-class="active">
					<a class="item">
						<i class="th icon"></i>
						Disciplinas
					</a>
				</router-link>
				<div class="right menu">
					<router-link to="/" active-class="active">
						<a class="ui item" @click="signOut()">
							Sair
						</a>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
var router = new Router();

export default {
  name: "navbar",
  data() {
    return {};
  },
  methods: {
    signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        console.log("User signed out.");
      }).then(a => {this.$router.push("/");});
    }
  }
};
</script>



<style scoped>
</style>