<template>
	<div id="login" class="ui middle aligned center aligned grid">
		<div class="column" style="max-width: 450px">
			<br><br><br><br><br><br><br><br><br><br>
			<div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark" data-width="370" data-height="50" data-longtitle="true" data-lang="pt-BR"></div>
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