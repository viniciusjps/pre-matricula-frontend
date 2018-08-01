<template>
  <div id="consult-enrollment">
    <sui-button fluid @click.native="toggle">Consultar pré matricula</sui-button>
    <sui-modal v-model="open">
      <sui-modal-header>Intenção de matrícula</sui-modal-header>
      <sui-modal-content>
        <sui-modal-description>
          <div class="ui segments">
            <div class="ui segment" v-for="(item, index) in disciplinesList" :key="index">
              <h4>{{ item.name }}</h4>
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
  name: "consult-enrollment",
  data() {
    return {
      open: false,
      name: "",
      enrollment: "",
      email: "",
      disciplinesList: []
    };
  },
  created() {
    Service.methods.reloadPage();
    this.setUserData();
    this.getUserDisciplines(Service.methods.getEnrollment());
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    getUserDisciplines(enrollment) {
      let disciplines = [];
      this.getDisciplinesByEnrollment(enrollment)
        .then(data => {
          this.disciplines = data;
        })
        .then(a => {
          this.disciplines.map(d => {
            this.getDisciplineByCode(d).then(res => {
              this.disciplinesList.push(res);
            });
          });
        });
    },
    getDisciplinesByEnrollment(enrollment) {
      return this.getDisciplinesCodeByEnrollment(enrollment);
    },
    setUserData() {
      this.name = Service.methods.getName();
      this.enrollment = Service.methods.getEnrollment();
      this.email = Service.methods.getEmail();
    },
    getDisciplineByCode(code) {
      return fetch(
        "http://api-sistema-pre-matricula.herokuapp.com/api/curricularComponent/" +
          code
      ).then(res => res.json());
    },
    getDisciplinesCodeByEnrollment(enrollment) {
      return fetch(
        "http://api-sistema-pre-matricula.herokuapp.com/api/allocation/student/" +
          enrollment
      ).then(res => res.json());
    }
  }
};
</script>
<style>
ui.button {
  color: #ffffff;
  background-color: #74accb;
}
</style>