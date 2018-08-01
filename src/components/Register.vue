<template>
	<div id="register" class="ui middle aligned center aligned grid">
		<div class="column" style="max-width: 450px">
			<br><br><br><br><br>
			<h2 class="ui grey image header">
				<i class="user icon"></i>
				<div class="content">
					Primeiro acesso
				</div>
				<br>
			</h2>
			<form class="ui larg form">
				<div class="ui stacked segment">
					<div class="field">
						<div class="ui labeled icon input">
							<div class="ui label">Nome &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
							<input type="text" :value="profile.name" disabled>
						</div>
					</div>
					<div class="field">
						<div class="ui labeled icon input">
							<div class="ui label">Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
							<input type="text" :value="profile.email" disabled>
						</div>
					</div>
					<div class="field">
						<div class="ui labeled icon input">
							<div class="ui label">Matricula</div>
							<input type="text" placeholder="Digite sua matricula" v-model="profile.enrollment">
						</div>
					</div>
					<br>
					<button class="ui fluid button" @click="registerUser()">
						Entrar
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import Service from "./../Service.vue";

export default {
  name: "register",
  data() {
    return {
			profile: {
				enrollment: "",
      	name: "",
				email: "",
				url: "",
				getName() {
					return this.name;
				},
				getEmail() {
					return this.email;
				},
				getImageUrl() {
					return this.url;
				},
				getEnrollment() {
					return this.enrollment;
				}
			}
    };
  },
  created() {
		this.profile.name = Service.methods.getName();
    this.profile.email = Service.methods.getEmail();
		Service.methods.reloadPage();
  },
  methods: {
    registerUser() {
			Service.methods.setEnrollment(this.profile.enrollment);
			this.url = Service.methods.getUrl();
			Service.methods.loggin(this.profile, this.profile.enrollment);
			this.addNewUser()
				.then(data => {
					this.$router.push("/home");
				});
    },
    addNewUser() {
      return fetch("http://api-sistema-pre-matricula.herokuapp.com/api/user", {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          enrollment: Service.methods.getEnrollment(),
          name: Service.methods.getName(),
          email: Service.methods.getEmail()
        })
      });
    }
  }
};
</script>
<style scoped>
.ui.label {
  color: #ffffff;
  background-color: #74accb;
}

.ui.fluid.button {
  color: #ffffff;
  background-color: #74accb;
}
.ui.stacked.segment {
  border-top: 2px solid #74accb !important;
}
</style>