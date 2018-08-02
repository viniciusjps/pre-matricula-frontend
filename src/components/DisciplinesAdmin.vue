<template>
	<div id="disciplines-admin">
		<navbar></navbar>
		<div class="ui container">
			<div class="ui two column very relaxed stackable grid">
				<div class="four wide column">
					<br>
					<div class="ui segments">
						<div class="ui blue secondary segment">
							<h4 class="ui center aligned header">Nº de solicitações</h4>
							<h5 class="ui center aligned header"> {{requests}} </h5>
						</div>
						<div class="ui segment">
							<h4 class="ui center aligned header">Nº de disciplinas cadastradas</h4>
							<h5 class="ui center aligned header"> {{ enrollments.length }} </h5>
						</div>
					</div>
					<register></register>
					<br>
          <search></search>
				</div>
				<div class="twelve wide column">
					<br>
					<div>
						<table class="ui table">
							<thead>
								<tr>
									<th>Opções</th>
									<th>Disciplina</th>
                  <th>Código</th>
									<th>Créditos</th>
									<th>Semestre</th>
									<th>Tipo</th>
                  <!--th>Qtd. de pedidos</th-->
								</tr>
							</thead>
							<tbody>
								<tr class="" v-for="(item, index) in enrollments" :key="index">
									<td class="center aligned">
                    <div title="Apagar" id="delete_button" class="ui red label" @click="deleteDiscipline(item.code)"><i class="trash alternate icon"></i></div>
										<td>
											<h5 class="ui left header"> 
                        {{ item.name || '-' }} 
                        <i class="ui label"> {{ item.gridType || '-' }} </i>
                      </h5>
										</td>
									</td>
                  <td id="codigo">
										<h5 class="ui center aligned inverted header"> {{ item.code || '-' }} </h5>
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
                  <!--td id="quantidade">
										<h5 class="ui center aligned inverted header"> {{ getAmoutRequest(item.code) || '-' }} </h5>
									</td-->
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
import Service from "./../ServiceAdmin.vue";
import RegisterCurricularComponent from "./RegisterCurricularComponent";
import SearchAllocation from './SearchAllocation.vue';

export default {
  name: "disciplines-admin",
  components: {
    navbar: NavbarAdmin,
    register: RegisterCurricularComponent,
    search: SearchAllocation
  },
  data() {
    return {
      enrollments: [{ name: "Carregando disciplinas ..." }],
      studentEnrollment: "",
      requests: ''
    };
  },
  created() {
    Service.methods.reloadPage();
    this.getEnrollments(
      "http://api-sistema-pre-matricula.herokuapp.com/api/curricularComponent/"
    );
    this.setRequests();
    this.setStudentEnrollment();
    this.checkLog();
  },
  methods: {
    checkLog() {
			if (!localStorage.getItem("isAdminLogged")) {
				this.$router.push('/admin/login');
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
    deleteDiscipline(value) {
      this.delete(value).then(a => {
        this.getEnrollments(
          "http://api-sistema-pre-matricula.herokuapp.com/api/curricularComponent/"
        );
      });
    },
    delete(value) {
      return fetch(
        "http://api-sistema-pre-matricula.herokuapp.com/api/curricularComponent/" +
          value,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "DELETE"
        }
      );
    },
    getNumberOfRequest(code) {
      return fetch(
        "http://api-sistema-pre-matricula.herokuapp.com/api/allocation/discipline/" + code
      ).then(res => res.json());
    },
    getAmoutRequest(code) {
      let amount = 0;
      this.getNumberOfRequest(code)
      .then(a => {
        amount = a.length;
        console.log(amount);
      });
      return amount;
    },
    setRequests() {
      this.requests = localStorage.getItem("allocations");
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
  background-color: #a8a8a8;
}

#creditos {
  background-color: #c2c2c2;
}

#codigo {
  background-color: #d8d8d8;
}

#check_box {
  position: fixed;
}

#delete_button {
  cursor: pointer;
}
</style>