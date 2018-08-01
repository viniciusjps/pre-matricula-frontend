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
								<div class="sub header">
									{{ profile.enrollment }}
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
									Qtd aqui
								</h5>
							</div>
						</div>
						<br>
						<register></register>
						<br>
						<change-password></change-password>
						<br>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import NavbarAdmin from "./NavbarAdmin.vue";
import ChangePassword from "./ChangePassword.vue";
import RegisterCurricularComponent from "./RegisterCurricularComponent";

export default {
  name: "home-admin",
  components: {
    navbar: NavbarAdmin,
		changepasword: ChangePassword,
		register: RegisterCurricularComponent
  },
  data() {
    return {
      profile: {
        name: "",
        email: "",
        enrollment: "",
        url: ""
      }
    };
  },
  created() {
    Service.methods.reloadPage();
    this.setProfileData();
  },
  methods: {
    setProfileData() {
      this.profile.url = Service.methods.getUrl();
      this.profile.name = Service.methods.getName();
      this.profile.email = Service.methods.getEmail();
      this.profile.enrollment = Service.methods.getEnrollment();
    }
  }
};
</script>

<style>
</style>