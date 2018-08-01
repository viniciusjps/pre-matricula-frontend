<template>
	<div id="register">
		<sui-button fluid @click.native="toggle">Cadastrar disciplinas</sui-button>
		<sui-modal v-model="open">
			<sui-modal-header>Adicionar nova disciplina</sui-modal-header>
			<sui-modal-content>
				<sui-modal-description>
					<div id="register" class="ui middle aligned center aligned grid">
						<div class="column">
							<form class="ui larg form">
								<div class="ui segment">
									<div class="field">
										<div class="ui labeled icon input">
											<div class="ui label">Código &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
											<input type="text" placeholder="Digite o código da disciplina" v-model="code">
										</div>
									</div>
									<div class="field">
										<div class="ui labeled icon input">
											<div class="ui label">Nome &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
											<input type="text" v-model="name" placeholder="Digite o nome">
										</div>
									</div>
									<div class="field">
										<div class="ui labeled icon input">
											<div class="ui label">Créditos &nbsp;&nbsp;&nbsp;&nbsp;</div>
											<input type="text" v-model="credits" placeholder="Digite a quatidade de créditos">
										</div>
									</div>
									<div class="field">
										<div class="ui labeled icon input">
											<div class="ui label">Tipo &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
											<input type="text" v-model="type" placeholder="Tipo da disciplina">
										</div>
									</div>
									<div class="field">
										<div class="ui labeled icon input">
											<div class="ui label">Grade &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
											<input type="text" v-model="gridType" placeholder="Digite o tipo de PCC">
										</div>
									</div>
									<div class="field">
										<div class="ui labeled icon input">
											<div class="ui label">Semestre &nbsp;</div>
											<input type="text" v-model="period" placeholder="Digite o semestre da qual faz parte">
										</div>
									</div>
									<br>
									<button id="add" class="ui fluid button" @click="registerDiscipline()">
										Cadastrar
									</button>
								</div>
							</form>
						</div>
					</div>
				</sui-modal-description>
			</sui-modal-content>
			<sui-modal-actions>
				<sui-button negative @click.native="toggle">
					Fechar
				</sui-button>
			</sui-modal-actions>
		</sui-modal>
	</div>
</template>

<script>
import SuiVue from "semantic-ui-vue";
import Vue from "vue";

Vue.use(SuiVue);

export default {
  name: "registerCurricularComponent",
  data() {
    return {
      open: false,
      code: "",
      name: "",
      credits: "",
      type: "",
      gridType: "",
      period: ""
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    registerDiscipline() {
      let data = {
        code: this.code,
        name: this.name,
        credits: this.credits,
        type: this.type,
        gridType: this.gridType,
        period: this.period
      };
      return fetch(
        "http://api-sistema-pre-matricula.herokuapp.com/api/curricularComponent",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(data)
        }
      );
    }
  }
};
</script>

<style>
#add {
  color: #ffffff;
  background-color: #74accb;
}
</style>