<template>
	<div id="register" class="ui middle aligned center aligned grid">
		<div class="column" style="max-width: 450px">
			<br><br><br><br><br>
			<h2 class="ui grey image header">
				<i class="user plus icon"></i>
				<div class="content">
					Login
				</div>
				<br>
			</h2>
			<form class="ui larg form">
				<div class="ui stacked segment">
					<div class="field">
						<div class="ui labeled icon input">
							<div class="ui label">Email&nbsp;&nbsp;</div>
							<input type="text" placeholder="Digite o seu email" v-model="profile.email">
						</div>
					</div>
					<div class="field">
						<div class="ui labeled icon input">
							<div class="ui label">Senha</div>
							<input type="password" placeholder="Digite sua senha" v-model="profile.password">
						</div>
					</div>
					<div :hidden="!this.error" class="ui mini red message"> {{errorMsg}} </div>
					<br>
					<button class="ui fluid button" @click="loginAdmin()">
						Entrar
					</button>
				</div>
			</form>
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
  name: "login-admin",
  data() {
    return {
      profile: {
        name: "",
        password: "",
        email: ""
      },
			urlBase: "http://api-sistema-pre-matricula.herokuapp.com/api/coordinator",
			error: false,
			errorMsg: ''
    };
  },
  methods: {
    loginAdmin() {
      let email = this.profile.email || "-";
      fetch(this.urlBase + "/validateEmail/" + email)
        .then(d => d.json())
        .then(a => {
					if (a) {
      			let password = this.profile.password || "-";
            fetch(this.urlBase + "/validatePassword/" + password)
              .then(pass => pass.json())
              .then(e => {
								if (e) {
									//AQUI CHAMA O LOGIN DO SERVICE
									ServiceAdmin.methods.loggin(this.profile);
									this.$router.push("/admin");
								}
								else {
									this.errorMsg = 'Senha incorreta';
									this.error = true;
								}
							});
					}
					else {
						this.errorMsg = 'Email incorreto';
						this.error = true;
					}
        });
    }
  }
};
</script>

<style>
</style>

