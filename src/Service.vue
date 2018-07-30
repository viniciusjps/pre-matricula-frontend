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
        enrollment: ''
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
    loggin(profile) {
        this.name = profile.getName();
        this.email = profile.getEmail();
    },
  }
}
</script>
