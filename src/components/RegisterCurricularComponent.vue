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
											<div id="btn" class="ui label">Código &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
											<input type="text" placeholder="Digite o código da disciplina" v-model="code">
										</div>
									</div>
									<div class="field">
										<div class="ui labeled icon input">
											<div id="btn" class="ui label">Nome &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
											<input type="text" v-model="name" placeholder="Digite o nome">
										</div>
									</div>
									<div class="field">
										<div class="ui labeled icon input">
											<div id="btn" class="ui label">Créditos &nbsp;&nbsp;&nbsp;&nbsp;</div>
											<input type="text" v-model="credits" placeholder="Digite a quatidade de créditos">
										</div>
									</div>
									<sui-dropdown fluid placeholder="Tipo" selection :options="typeOptions" v-model="type" />
									<br>
									<sui-dropdown fluid placeholder="Tipo de PCC" selection :options="gridOptions" v-model="gridType" />
									<br>
									<sui-form>
										<sui-form-fields inline>
											<label>Semestre: </label>
											<sui-form-field>
												<sui-checkbox label="1" radio value="1" v-model="period" />
											</sui-form-field>
											<sui-form-field>
												<sui-checkbox label="2" radio value="2" v-model="period" />
											</sui-form-field>
											<sui-form-field>
												<sui-checkbox label="3" radio value="3" v-model="period" />
											</sui-form-field>
											<sui-form-field>
												<sui-checkbox label="4" radio value="4" v-model="period" />
											</sui-form-field>
											<sui-form-field>
												<sui-checkbox label="5" radio value="5" v-model="period" />
											</sui-form-field>
											<sui-form-field>
												<sui-checkbox label="6" radio value="6" v-model="period" />
											</sui-form-field>
											<sui-form-field>
												<sui-checkbox label="7" radio value="7" v-model="period" />
											</sui-form-field>
											<sui-form-field>
												<sui-checkbox label="8" radio value="8" v-model="period" />
											</sui-form-field>
											<sui-form-field>
												<sui-checkbox label="9" radio value="9" v-model="period" />
											</sui-form-field>
										</sui-form-fields>
									</sui-form>
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
      type: null,
      gridType: null,
      period: "",
      typeOptions: [
        {
          text: "Complementar",
          value: "Complementar"
        },
        {
          text: "Obrigatória",
          value: "Obrigatória"
        },
        {
          text: "Optativa Específica",
          value: "Opt. Específica"
        },
        {
          text: "Optativa Geral",
          value: "Opt. Geral"
        }
      ],
      gridOptions: [
        {
          text: "Grade Nova",
          value: "Nova"
        },
        {
          text: "Grade Antiga",
          value: "Antiga"
        }
      ]
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
      ).then(a => {
        this.toggle();
      });
    }
  }
};
</script>

<style>
#add {
  color: #ffffff;
  background-color: #74accb;
}

#btn {
	color: #ffffff;
	background-color: #74accb;
}
</style>