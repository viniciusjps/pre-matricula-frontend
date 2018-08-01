<script>
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
var router = new Router();

export default {
  data() {
      return {
        name: '',
        email: '',
        url: ''
      }
  },
  methods: {
    getEmail() {
      return this.email;
    },
    getName() {
      return this.name;
    },
    getUrl() {
      return this.url;
    },
    loggin(profile) {
      this.name = profile.name;
      this.email = profile.email;
      this.url = this.getUrl(profile.email);

      localStorage.setItem("isLogged", true);
      localStorage.setItem("name", this.name);
      localStorage.setItem("email", this.email);
      localStorage.setItem("url", this.url);
    },
    loggout() {
      localStorage.setItem("isLogged", false);
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("url");
    },
    reloadPage() {
      this.name = localStorage.getItem("name");
      this.email = localStorage.getItem("email");
      this.url = localStorage.getItem("url");
    },
    getUrl(email) {
    return fetch('http://picasaweb.google.com/data/entry/api/user/' + email + '?alt=json')
      .then(response => response.json());
  }
  }
}
</script>