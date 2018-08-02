<template>
	<div id="disciplines">
		<navbar></navbar>
		<div class="ui container">
			<div class="ui two column very relaxed stackable grid">
				<div class="four wide column">
					<br>
					<div class="ui segments">
						<div class="ui red inverted segment" v-if="!checkEnrollment">
							<h4 class="ui center aligned header">Nº de créditos selecionados</h4>
							<h5 class="ui center aligned header"> {{ creditsSelected || '0' }} </h5>
						</div>
            <div class="ui green inverted segment" v-else>
							<h4 class="ui center aligned header">Nº de créditos selecionados</h4>
							<h5 class="ui center aligned header"> {{ creditsSelected }} </h5>
						</div>
						<div class="ui segment">
							<h4 class="ui center aligned header">Nº de disciplinas selecionadas</h4>
							<h5 class="ui center aligned header"> {{ selectedEnrollments.length || 0 }} </h5>
						</div>
					</div>
					<button class="ui blue fluid button" :disabled="!checkEnrollment" @click="setAllocation()">Realizar pré matrícula</button>
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
											<input type="checkbox" :id="item.code" @change="updateLimits()" :value="item" v-model="selectedEnrollments">
											<label></label>
										</div>
										<td>
											<h5 class="ui left header"> 
                        {{ item.name || '-' }} 
                        <i class="ui label"> {{ item.gridType || '-' }} </i>
                      </h5>
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
import Service from "./../Service.vue";

export default {
  name: "disciplines",
  components: {
    navbar: Navbar
  },
  data() {
    return {
      enrollments: [{ name: "Carregando disciplinas ..." }],
      selectedEnrollments: [],
      studentEnrollment: "",
      creditsSelected: "",
      checkEnrollment: false
    };
  },
  created() {
    Service.methods.reloadPage();
    this.getEnrollments(
      "http://api-sistema-pre-matricula.herokuapp.com/api/curricularComponent/"
    );
    this.setStudentEnrollment();
    this.editPreEnroll();
    this.checkLog();
  },
  methods: {
    checkLog() {
			let logged = JSON.parse(localStorage.getItem("isLogged"));
			if (!logged) {
				this.$router.push('/');
			}
		},
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
    setAllocation() {
      let disciplines = [];
      for (let index = 0; index < this.selectedEnrollments.length; index++) {
        const element = this.selectedEnrollments[index];
        disciplines.push({
          studentEnrollment: this.studentEnrollment,
          disciplineCode: element.code
        });
      }
      this.doAllocation(disciplines).then(data => {
        this.$router.push("/home");
        localStorage.removeItem("disciplines");
      });
    },
    doAllocation(data) {
      return fetch(
        "http://api-sistema-pre-matricula.herokuapp.com/api/allocation",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(data)
        }
      );
    },
    updateLimits() {
      this.checkEnrollment = false;
      if (this.selectedEnrollments.length == 0) {
        this.creditsSelected = 0;
      } else {
        let sum = 0;
        this.selectedEnrollments.map(a => {
          sum += a.credits;
        });
        this.creditsSelected = sum;
        if (sum >= 16 && sum <= 24) {
          this.checkEnrollment = true;
        }
      }
    },
    editPreEnroll() {
      if (localStorage.getItem("disciplines")) {
        let disciplines = [];
        let enroll = Service.methods.getEnrollment();
        this.getDisciplinesByEnrollment(enroll)
          .then(data => {
            this.disciplines = data;
          })
          .then(a => {
            this.disciplines.map(d => {
              this.getDisciplineByCode(d).then(res => {
                this.selectedEnrollments.push(res);
                this.updateLimits();
              });
            });
          });
      }
    },
    getDisciplineByCode(code) {
      return fetch(
        "http://api-sistema-pre-matricula.herokuapp.com/api/curricularComponent/" +
          code
      ).then(res => res.json());
    },
    getDisciplinesByEnrollment(enrollment) {
      return fetch(
        "http://api-sistema-pre-matricula.herokuapp.com/api/allocation/student/" +
          enrollment
      ).then(res => res.json());
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