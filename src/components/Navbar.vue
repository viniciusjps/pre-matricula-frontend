<template>
	<div id="navbar">
		<div>
			<div class="ui menu">
				<router-link to="/home" active-class="active">
					<a class="item" @click="resetDisciplines()">
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
						<a class="item" @click="signOut()">
							<i class="sign out icon"></i>
							Logout
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
import Service from "./../Service.vue";

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
      auth2
        .signOut()
        .then(function() {
          console.log("User signed out.");
					Service.methods.loggout();
        })
        .then(a => {
					this.$router.push("/");
        });
		},
		resetDisciplines() {
			localStorage.removeItem("disciplines");
		}
  }
};
</script>

<style scoped>
</style>