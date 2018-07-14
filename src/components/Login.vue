<template>
	<div id="login" class="ui middle aligned center aligned grid">
		<div class="column" style="max-width: 450px">
			<br><br><br><br>
			<h2 class="ui grey image header">
				<i class="user icon"></i>
				<div class="content">
					Entre com a sua conta
				</div>
				<br>
			</h2>
			<form class="ui larg form">
				<div class="ui stacked blue segment">
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
					<div class="grouped fields">
						<label>Tipo de usuário:</label>
						<div class="field">
							<div class="ui radio checkbox">
								<input type="radio" name="aluno">
								<label>Aluno</label>
							</div>
							<div class="ui radio checkbox">
								<input type="radio" name="administrador">
								<label>Administrador</label>
							</div>
						</div>
					</div>
					<br>
					<button class="ui fluid blue button" @click="setMatriculation(matriculation.value); setPassword(password.value)">
						Entrar
					</button>
				</div>
			</form>
			<div class="ui grey message">
				Novo por aqui?
				<a href="#">Cadastre-se</a>
			</div>
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
</style>