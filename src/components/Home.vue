<template>
	<div id="home">
		<navbar></navbar>
		<br>
		<div class="ui container">
			<br>
			<div class="ui two column very relaxed stackable grid">
				<div class="six wide column">
					<div>
						<div class="ui middle aligned center aligned grid">
							<img class="logo" src="https://i.imgur.com/qOSejI1.png">		
						</div>
					</div>
					<hr>
					<div>
						<img class="ui centered align circular image" :src="userUrlImage">
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
								<h4 class="ui center aligned header">Status da Pré Matricula</h4>
							</div>
							<div class="ui segment">
								<h5 class="ui center aligned header" v-if="checkEnrollment">
									<i class="green check icon" ></i>
								</h5>
                <h5 class="ui center aligned header" v-else>
									<i class="red times icon" ></i>
                </h5>
							</div>
						</div>
						<button class="ui fluid button">Consultar Pré Matricula</button>
						<br>
						<button class="ui fluid button">Editar Pré Matricula</button>
						<br>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Navbar from "./Navbar.vue";
import Service from "./../Service.vue";

export default {
  name: "home",
  components: {
    navbar: Navbar
  },
  data() {
    return {
      userUrlImage: "",
      profile: {
        name: "",
        email: "",
        enrollment: ""
      },
      checkEnrollment: false
    };
  },
  created() {
    this.getProfile();
    this.setCheckEnrollment(Service.methods.getEnrollment());
  },
  methods: {
    getProfile() {
      var profileData = gapi.auth2.getAuthInstance().currentUser.Ab.w3;
      this.setUserImage(profileData.Paa);
      this.setProfileData(profileData.ofa, profileData.U3);
    },
    setUserImage(value) {
      this.userUrlImage = value;
    },
    setProfileData(name, email) {
      this.profile.name = name;
      this.profile.email = email;
    },
    setCheckEnrollment(enrollment) {
      this.getAllocationsByEnrollment(enrollment).then(data => {
        if (data.length == 0) {
          this.checkEnrollment = false;
        } else {
          this.checkEnrollment = true;
        }
      });
    },
    getAllocationsByEnrollment(value) {
      return fetch(
        "http://api-sistema-pre-matricula.herokuapp.com/api/allocation/student/" +
          value
      ).then(res => res.json());
    }
  }
};
</script>

<style scoped>
img.logo {
  width: auto;
  height: 120px;
}
</style>