<template>
	<div id="home-admin">
		<navbar></navbar>
		<br>
		<div class="ui container">
			<br>
			<div class="ui two column very relaxed stackable grid">
				<div class="six wide column">
					<div>
						<img class="ui centered align circular image" :src="profile.url">
						<h2 class="ui centered header">
							<div class="content">
								{{ profile.name }}
								<div class="sub header">
									{{ profile.email }}
								</div>
							</div>
						</h2>
					</div>
				</div>
				<div class="ten wide column">
					<div>
						<div class="ui segments">
							<div class="ui secondary segment">
								<h4 class="ui center aligned header">Qtd de solicitações</h4>
							</div>
							<div class="ui segment">
								<h5 class="ui center aligned header">
									{{requests}}
								</h5>
							</div>
						</div>
						<br>
						<register></register>
						<br>
						<search></search>
						<br>
						<changepassword></changepassword>
						<br>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ServiceAdmin from "./../ServiceAdmin.vue";
import NavbarAdmin from "./NavbarAdmin.vue";
import ChangePassword from "./ChangePassword.vue";
import RegisterCurricularComponent from "./RegisterCurricularComponent";
import SearchAllocation from "./SearchAllocation.vue";
import { request } from 'http';

export default {
  name: "home-admin",
  components: {
    navbar: NavbarAdmin,
    changepassword: ChangePassword,
    register: RegisterCurricularComponent,
    search: SearchAllocation
  },
  data() {
    return {
      profile: {
        name: "",
        email: "",
        url: ""
      },
      requests: ""
    };
  },
  created() {
    ServiceAdmin.methods.reloadPage();
    this.setProfileData();
    this.setRequests();
  },
  methods: {
    setProfileData() {
      this.profile.name = ServiceAdmin.methods.getName();
      this.profile.email = ServiceAdmin.methods.getEmail();
      ServiceAdmin.methods.getUrl(this.profile.email).then(json => {
        this.profile.url = json["entry"]["gphoto$thumbnail"]["$t"];
      });
    },
    setRequests() {
      fetch("http://api-sistema-pre-matricula.herokuapp.com/api/allocation")
        .then(d => d.json())
        .then(a => {
					this.requests = Object.keys(a).length;
					localStorage.setItem("requests", this.requests);
        });
    }
  }
};
</script>

<style>
</style>