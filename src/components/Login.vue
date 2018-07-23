<template>
	<div>
		<br><br><br><br><br>
		<div class="ui middle aligned center aligned grid">
			<img class="logo" src="./src/images/logo.png">		
		</div>
		<g-signin-button
      :params="googleSignInParams"
      @success="onSignInSuccess"
      @error="onSignInError">
      Entrar com Google
  </g-signin-button>
	</div>
</template>

<script>

import GSignInButton from 'vue-google-signin-button'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
var router = new Router();
Vue.use(GSignInButton)

export default {
  data () {
    return {
      /**
       * The Auth2 parameters, as seen on
       * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
       * As the very least, a valid client_id must present.
       * @type {Object}
       */
      googleSignInParams: {
        client_id: '425992078532-o6usuafa3rganc10vkkae4oe4othp51j.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    onSignInSuccess (googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile() // etc etc
      this.$router.push('/home');
    },
    onSignInError (error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
    }
  }
}
</script>

<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>
