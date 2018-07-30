<template>
	<div id="disciplines">
		<navbar></navbar>
		<div class="ui container">
			<div class="ui two column very relaxed stackable grid">
				<div class="four wide column">
					<br>
					<div class="ui segments">
						<div class="ui blue secondary segment">
							<h4 class="ui center aligned header">Nº de créditos selecionados</h4>
							<h5 class="ui center aligned header"> {{ creditsSelected }} </h5>
						</div>
						<div class="ui segment">
							<h4 class="ui center aligned header">Nº de disciplinas selecionadas</h4>
							<h5 class="ui center aligned header"> {{ selectedEnrollments.length || 0 }} </h5>
						</div>
					</div>
					<button class="ui blue fluid button">Realizar pré matrícula</button>
				</div>
				<div class="twelve wide column">
					<br>
					<div>
						<table class="ui table">
							<thead>
								<tr>
									<th></th>
									<th>Disciplina</th>
									<th>Créditos</th>
									<th>Semestre</th>
									<th>Tipo</th>
								</tr>
							</thead>
							<tbody>
								<tr class="" v-for="(item, index) in enrollments" :key="index">
									<td class="center aligned">
										<div class="ui checkbox">
											<input type="checkbox" :id="item.code" :value="item.code" v-model="selectedEnrollments">
											<label></label>
										</div>
										<td>
											<h5 class="ui left header"> {{ item.name || '-' }} </h5>
										</td>
									</td>
									<td id="creditos">
										<h5 class="ui center inverted aligned header"> {{ item.credits || '-' }} </h5>
									</td>
									<td id="semestre">
										<h5 class="ui center aligned inverted header"> {{ item.period || '-' }} </h5>
									</td>
									<td id="tipo_obrigatoria" v-if="item.type == 'Obrigatória'">
										<h5 class="ui center aligned inverted header"> {{ item.type || '-' }} </h5>
									</td>
									<td id="tipo_optativa" v-else>
										<h5 class="ui center aligned inverted header"> {{ item.type || '-' }} </h5>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Navbar from "./Navbar.vue";

export default {
  name: "disciplines",
  components: {
    navbar: Navbar
  },
  data() {
    return {
      enrollments: [{ name: "Carregando disciplinas ..." }],
			selectedEnrollments: [],
			creditsSelected: 0
    };
	},
	created () {
		this.getEnrollments("http://api-sistema-pre-matricula.herokuapp.com/api/curricularComponent/")
	},
  methods: {
    updateDisciplines(link) {
      return fetch(link).then(res => res.json());
    },
    getEnrollments(link) {
      this.updateDisciplines(link)
        .then(data => {
          this.enrollments = data;
        })
        .then(a => {
          this.enrollments = this.enrollments.sort(
            (x, y) => x.period - y.period
          );
      	});
    }
  }
};
</script>

<style scoped>
#tipo_obrigatoria {
  background-color: #77b0e1;
}

#tipo_optativa {
  background-color: #fdd365;
}

#semestre {
  background-color: #919191;
}

#creditos {
  background-color: #c2c2c2;
}

#check_box {
  position: fixed;
}
</style>