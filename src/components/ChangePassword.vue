<template>
  <div id="change-password">
    <sui-button fluid @click.native="toggle">Alterar senha</sui-button>
    <sui-modal v-model="open">
      <sui-modal-header>Alterar senha</sui-modal-header>
      <sui-modal-content>
        <sui-modal-description>
            <div class="field">
							<div class="ui labeled fluid icon input">
								<div id="btn" class="ui label">Senha atual</div>
									<input type="password" v-model="oldPassword">
							</div>
						</div>
            <br>
            <div class="field">
							<div class="ui labeled fluid icon input">
								<div id="btn" class="ui label">Nova senha</div>
									<input type="password" v-model="newPassword">
							</div>
						</div>
            <br>
            <button class="ui fluid button" @click="changePass()">Alterar</button>
        </sui-modal-description>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button @click.native="toggle">
          Fechar
        </sui-button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>
import SuiVue from "semantic-ui-vue";
import Vue from "vue";
import Service from "./../Service.vue";

Vue.use(SuiVue);

export default {
  name: "change-password",
  data() {
    return {
      open: false,
      name: "",
      enrollment: "",
      email: "",
      oldPassword: '',
      newPassword: ''
    };
  },
  created() {
    Service.methods.reloadPage();
    this.setUserData();
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    setUserData() {
      this.name = Service.methods.getName();
      this.enrollment = Service.methods.getEnrollment();
      this.email = Service.methods.getEmail();
    },
    changePass() {
      this.setPassword().then(a => {
        this.toggle()
      });
    },
    setPassword() {
      return fetch("http://api-sistema-pre-matricula.herokuapp.com/api/coordinator/password", {
        method: "UPDATE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: [this.oldPassword, this.newPassword]
      });
    }
  }
};
</script>