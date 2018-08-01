<template>
	<div id="register">
		<sui-button fluid @click.native="toggle">Cadastrar disciplinas</sui-button>
		<sui-modal v-model="open">
			<sui-modal-header>Adicionar nova disciplina</sui-modal-header>
			<sui-modal-content>
				<sui-modal-description>
					<div id="register" class="ui middle aligned center aligned grid">
						<div class="column" style="max-width: 450px">
							<form class="ui larg form">
								<div class="ui stacked segment">
									<div class="field">
										<div class="ui labeled icon input">
											<div class="ui label">Código &nbsp;&nbsp;&nbsp;</div>
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
											<div class="ui label">Créditos</div>
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
									<button class="ui fluid button" @click="registerDiscipline()">
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
      code: "",
      name: "",
      credits: "",
      type: "",
      gridType: "",
      period: ""
    };
  },
  methods: {
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
</style>