<template>
	<div id="login" class="ui middle aligned center aligned grid">
		<div class="column" style="max-width: 450px">
			<br><br><br><br><br><br><br><br><br><br>
			<div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark" data-width="370" data-height="50" data-longtitle="true" data-lang="pt-BR"></div>
			<h2 class="ui grey image header">
				<i class="user icon"></i>
				<div class="content">
					Entre com a sua conta
				</div>
				<br>
			</h2>
			<form class="ui larg form">
				<div class="ui stacked segment">
					<div class="field">
						<div class="ui labeled icon input">
							<div class="ui label">Matricula</div>
							<input v-model="matriculation" type="text" placeholder="Digite sua matricula" id="matriculation">
							<i class="user icon"></i>
						</div>
					</div>
					<div class="field">
						<div class="ui labeled icon input">
							<div class="ui label">Senha</div>
							<input v-model="password" type="password" placeholder="Digite sua senha" id="password">
							<i class="lock icon"></i>
						</div>
					</div>
					<br>
					<button class="ui fluid button" @click="setMatriculation(matriculation.value); setPassword(password.value)">
						Entrar
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      matriculation: "",
      password: "",
      type_user: ""
    };
  },
  methods: {
    setMatriculation(value) {
      this.matricula = value;
    },
    setPassword(value) {
      this.password = value;
    },
    setTypeUser(value) {
      this.type_user = value;
    }
  }
};
</script>
<style scoped>
.ui.fluid.button {
	color: #FFFFFF;
	background-color: #74accb
}

.ui.stacked.segment {
	border-top: 2px solid #74accb!important
}

</style>