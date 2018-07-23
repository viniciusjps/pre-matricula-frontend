<template>
	<div id="navbar">
		<div>
			<div class="ui secondary pointing menu">
				<a class="item">
					<i class="home icon"></i>
					<router-link to="/home" active-class="active">Home</router-link>
				</a>
				<a class="item">
					<i class="th icon"></i>
					<router-link to="/disciplinas" active-class="active">Disciplinas</router-link>
				</a>
				<div class="right menu">
					<a class="ui item" @click="signOut()">
						<router-link to="/" active-class="active">Sair</router-link>
					</a>
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