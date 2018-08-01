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
        enrollment: '',
        url: '',
        gridType: ''
      }
  },
  methods: {
    getName() {
      return this.name;
    },
    getEmail() {
      return this.email
    },
    setEnrollment(value) {
      this.enrollment = value;
    },
    getEnrollment() {
      return this.enrollment
    },
    getUrl() {
      return this.url;
    },
    getGridType() {
			return this.gridType;
		},

    loggin(profile, grid, value) {
      this.name = profile.getName();
      this.email = profile.getEmail();
      this.url = profile.getImageUrl();
      
      this.enrollment = value;
      this.gridType = grid;

      localStorage.setItem("isLogged", true);
      localStorage.setItem("name", this.name);
      localStorage.setItem("enrollment", value);
      localStorage.setItem("email", this.email);
      localStorage.setItem("url", this.url);
      localStorage.setItem("gridType", this.gridType);
    },
    loggout() {
      localStorage.setItem("isLogged", false);
      localStorage.removeItem("name");
      localStorage.removeItem("enrollment");
      localStorage.removeItem("email");
      localStorage.removeItem("url");
      localStorage.removeItem("gridType");
      location.reload();
    },
    reloadPage() {
      this.name = localStorage.getItem("name");
      this.enrollment = localStorage.getItem("enrollment");
      this.email = localStorage.getItem("email");
      this.url = localStorage.getItem("url");
      this.gridType = localStorage.getItem("gridType");
    }
  }
}
</script>