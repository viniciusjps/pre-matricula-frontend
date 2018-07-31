<template>
  <div id="register" class="ui middle aligned center aligned grid">
    <div class="column" style="max-width: 450px">
      <br><br><br><br><br>
      <h2 class="ui grey image header">
        <i class="user icon"></i>
        <div class="content">
          Cadastrar Componente Curricular
        </div>
        <br>
      </h2>
      <form class="ui larg form">
        <div class="ui stacked segment">
          <div class="field">
            <div class="ui labeled icon input">
              <div class="ui label">Codigo &nbsp;&nbsp;&nbsp;</div>
              <input type="text" v-model="code">
            </div>
          </div>
          <div class="field">
            <div class="ui labeled icon input">
              <div class="ui label">Nome &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
              <input type="text" v-model="name">
            </div>
          </div>
          <div class="field">
            <div class="ui labeled icon input">
              <div class="ui label">Creditos</div>
              <input type="text" v-model="credits">
            </div>
          </div>
          <div class="field">
            <div class="ui labeled icon input">
              <div class="ui label">Tipo &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
              <input type="text" v-model="type">
            </div>
          </div>
          <div class="field">
            <div class="ui labeled icon input">
              <div class="ui label">Grade &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
              <input type="text" v-model="gridType">
            </div>
          </div>
          <div class="field">
            <div class="ui labeled icon input">
              <div class="ui label">Periodo &nbsp;</div>
              <input type="text" v-model="period">
            </div>
          </div>
          <br>
          <button class="ui fluid button" @click="registerCurricularComponent()">
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Service from "./../Service.vue";

export default {
  name: "registerCurricularComponent",
  data() {
    return {
      code: "",
      name: "",
      credits: "",
      type: "",
      gridType: "",
      period: ""
    };
  },
  methods: {

    registerCurricularComponent() {
      let dados = {
        code: this.code,
        name: this.name,
        credits: this.credits,
        type: this.type,
        gridType: this.gridType,
        period: this.period
      };
      return fetch("http://api-sistema-pre-matricula.herokuapp.com/api/curricularComponent", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(dados)
      });
    }
  }
};
</script>
<style scoped>
</style>