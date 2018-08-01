<template>
  <div id="change-password">
    <sui-button fluid @click.native="toggle">Alterar senha</sui-button>
    <sui-modal v-model="open">
      <sui-modal-header>Pesquisar</sui-modal-header>
      <sui-modal-content>
        <sui-modal-description>
          <div class="ui segments">
            <div class="ui segment">
              <h4>{{ name }}</h4>
            </div>
          </div>
        </sui-modal-description>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button @click.native="toggle">
          Ok
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
      email: ""
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
	}
};
</script>