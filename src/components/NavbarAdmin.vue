<template>
	<div id="navbar-admin">
		<div>
			<div class="ui menu">
				<router-link to="/admin" active-class="active">
					<a class="item">
						<i class="home icon"></i>
						Home
					</a>
				</router-link>
				<router-link to="/admin/disciplines" active-class="active">
					<a class="item">
						<i class="th icon"></i>
						Consultar disciplinas
					</a>
				</router-link>
				<div class="right menu">
					<router-link to="/admin/login" active-class="active">
						<a class="item" @click="signOutAdmin()">
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
import ServiceAdmin from "./../ServiceAdmin.vue";

Vue.use(Router);
var router = new Router();

export default {
  name: "navbarAdmin",
  data() {
    return {};
  },
  methods: {
    signOutAdmin() {
			ServiceAdmin.methods.loggout();
    }
  }
};
</script>

<style scoped>
</style>