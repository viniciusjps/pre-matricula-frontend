<template>
	<div id="disciplines-admin">
		<navbar-admin></navbar-admin>
		<div class="ui container">
			<div class="ui two column very relaxed stackable grid">
				<div class="four wide column">
					<br>
					<div class="ui segments">
						<div class="ui blue secondary segment">
							<h4 class="ui center aligned header">Nº de solicitações</h4>
							<h5 class="ui center aligned header">  </h5>
						</div>
						<div class="ui segment">
							<h4 class="ui center aligned header">Nº de disciplinas cadastradas</h4>
							<h5 class="ui center aligned header">  </h5>
						</div>
					</div>
					<button class="ui blue fluid button">Cadastrar disciplina</button>
					<button class="ui blue fluid button">Editar disciplina</button>
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
										<button class="ui negative button" @click="deleteDiscipline(item.code)">Apagar</button>
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
import NavbarAdmin from "./NavbarAdmin.vue";
import Service from "./../Service.vue";

export default {
  name: "disciplines-admin",
  components: {
    navbar: NavbarAdmin
  },
  data() {
    return {
      enrollments: [{ name: "Carregando disciplinas ..." }],
      selectedEnrollments: [],
      studentEnrollment: ""
    };
  },
  created() {
    Service.methods.reloadPage();
    this.getEnrollments(
      "http://api-sistema-pre-matricula.herokuapp.com/api/curricularComponent/"
    );
    this.setStudentEnrollment();
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
    },
    setStudentEnrollment() {
      this.studentEnrollment = Service.methods.getEnrollment();
		},
		deleteDiscipline(value) {

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