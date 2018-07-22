<template>
	<div>
		<br><br><br><br><br>
		<div class="ui middle aligned center aligned grid">
			<img class="logo" src="./src/images/logo.png">		
		</div>
		<div id="google-signin-btn">
			<br><br><br><br> 
			<br><br>
			<g-signin-button @done="onSignIn"/>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import Router from 'vue-router'
import SignIn from './SigninButton.vue'

Vue.use(Router);
var router = new Router();

export default {
  name: "login",
  components: {
    'g-signin-button': SignIn
  },
  data() {
    return {
      token: ""
    };
  },
  methods: {
    setToken(value) {
      this.token = value;
    },
    validateDomain(email) {
      const regularExpression = /@ccc.ufcg.edu.br/;
      return regularExpression.exec(email) != null;
    },
    onSignIn(response) {
      var profile = response.getBasicProfile();
      var userEmail = profile.getEmail();
      if (this.verifyUser(userEmail)) {
        router.push({ path: '/home' })
        location.reload();
      } else {
        router.push({ path: '/404' })
        location.reload();
      };
    },
    verifyUser(email) { 
      var emails = [
        'geovane.silva@ccc.ufcg.edu.br',
        'vinicius.jorge.silva@ccc.ufcg.edu.br',
        'hemillainy.santos@ccc.ufcg.edu.br',
        'cassio.cordeiro@ccc.ufcg.edu.br'
      ];
      return emails.indexOf(email) >= 0;
    }
  }
};
</script>

<style>
.g-signin2 {
  width: 100%;
}

.g-signin2 > div {
  margin: 0 auto;
}

img.logo {
  width: auto;
  height: 200px;
}

</style>
