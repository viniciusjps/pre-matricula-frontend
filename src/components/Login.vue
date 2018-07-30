<template>
	<div>
		<br><br><br><br><br>
		<div class="ui middle aligned center aligned grid">
			<img class="logo" src="https://i.imgur.com/qOSejI1.png">		
		</div>
    <div class="ui middle aligned center aligned grid">
      <br><br>
      <g-signin-button
        :params="googleSignInParams"
        @success="onSignInSuccess"
        @error="onSignInError">
        <i class="google icon"></i>
        <!--img id="google" src="https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png"-->
        &nbsp; &nbsp; Entrar com o Google
      </g-signin-button>
    </div>
	</div>
</template>

<script>
import GSignInButton from 'vue-google-signin-button';
import Vue from 'vue';
import Router from 'vue-router';

import Service from './../Service.vue';

Vue.use(Router);
var router = new Router();
Vue.use(GSignInButton);

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
      const profile = googleUser.getBasicProfile();

      let enrollment = '';
      this.getEnrollmentByEmail(profile.getEmail())
        .then(data => {
          enrollment = data.enrollment;
        });

      if (!enrollment) {
        this.$router.push('/register');
        Service.methods.loggin(profile);
      } else {
        this.$router.push('/home');
      }
    },
    onSignInError (error) {
      console.log('OH NOES', error);
    },
    getUserByEmail(link_email) {
      return fetch('http://api-sistema-pre-matricula.herokuapp.com/api/user/searchByEmail/' + link_email).then(res => res.json());
    },
    getEnrollmentByEmail(email) {
      return this.getUserByEmail(email);
    },
  }
}
</script>

<style>
.g-signin-button {
  width: 200px;
  outline: none;
  display: inline-block;
  padding: 4px 8px;
  border-radius: 5px;
  border: 2px solid #f5f5f5;
  background-color: #f5f5f5;
  color: rgb(119, 119, 119);
  box-shadow: 0px 5px 4px #c6c6c6;
  margin: 0px 0 5px 0;  
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  text-align: center;
  vertical-align: middle;
}

.g-signin-button:hover {
  background-color: #3c82f7;
  border: 2px solid #3c82f7;
  box-shadow: 0px 5px 4px #0d54ce;
  color: #fff;
}

#google {
  width: 20px;
}

img.logo {
  width: auto;
  height: 250px;
}

</style>
