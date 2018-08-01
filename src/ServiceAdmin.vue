<script>
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
var router = new Router();

export default {
  data() {
      return {
        email: '',
        senha: '',
      }
  },
  methods: {
    getEmail() {
      return this.email
    },

    loggin(profile) {
      this.name = profile.name;
      this.email = profile.email;

      localStorage.setItem("isLogged", true);
      localStorage.setItem("name", this.name);
      localStorage.setItem("email", this.email);
    },
    loggout() {
      localStorage.setItem("isLogged", false);
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      location.reload();
    },
    reloadPage() {
      this.name = localStorage.getItem("name");
      this.email = localStorage.getItem("email");
    }
  }
}
</script>