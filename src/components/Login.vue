<template>
	<div id="login">
		<br>
		<h2 class="ui icon center aligned header">
			<i class="user icon"></i>
			<div class="content">Log in</div>
		</h2>
		<form class="ui form warning">
			<div class="field">
				<label>Matricula</label>
				<div class="ui left icon input">
					<input v-model="matriculation" type="text" placeholder="Digite sua matricula" id="matriculation">
					<i class="users icon"></i>
				</div>
				<div class="ui warning message" v-if="matriculation.length < 9">
    			<div class="header">Matricula inválida</div>
  			</div>
			</div>
			<div class="field">
				<label>Senha</label>
				<div class="ui left icon input">
					<input v-model="password" type="password" placeholder="Digite sua senha" id="password">
					<i class="lock icon"></i>
				</div>
				<div class="ui warning message" v-if="password.length == 0">
    			<div class="header">Senha inválida</div>
  			</div>
			</div>
			<br>
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
			<button class="ui blue button" @click="setMatriculation(matriculation.value); setPassword(password.value)">
				Entrar
			</button>
		</form>
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