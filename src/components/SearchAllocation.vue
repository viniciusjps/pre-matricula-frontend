<template>
  <div id="search-allocation">
		<sui-button fluid @click.native="toggle">Realizar consultas</sui-button>
		<sui-modal v-model="open">
			<sui-modal-header v-if="this.exibitor == 'all'">Consultar todas as alocações</sui-modal-header>
			<sui-modal-header v-else-if="this.exibitor == 'disciplines'">Consultar matricula por disciplina</sui-modal-header>
			<sui-modal-header v-else>Consultar as disciplinas por meio da matricula</sui-modal-header>
			<sui-modal-content>
				<sui-modal-description>
					<div class="ui fluid buttons">
						<button class="ui green button" @click="updateUsers(); setExibitor('all')">Todos</button>
						<button class="ui button" @click="setExibitor('disciplines')">Disciplina</button>
						<button class="ui button" @click="setExibitor('enroll')">Matricula</button>
					</div>
					<br><br>
					<div class="ui icon input fluid loading" v-if="this.exibitor == 'disciplines'">
  					<input type="text" v-on:keydown="searchByDiscipline()" v-model="codeInputDiscipline" placeholder="Informe o código da disciplina ...">
  					<i class="search icon"></i>
					</div>
					<div class="ui icon input fluid loading" v-else-if="this.exibitor == 'enroll'">
  					<input type="text" v-on:keydown="searchByEnrollment()" v-model="codeInputEnrollment" placeholder="Informe o número da matricula ...">
  					<i class="search icon"></i>
					</div>
					<table class="ui table" v-if="this.exibitor == 'all'">
							<thead>
								<tr>
									<th>Aluno</th>
									<th>Email</th>
									<th>Matricula</th>
								</tr>
							</thead>
							<tbody>
								<tr class="" v-for="(item, index) in students" :key="index">
									<td>
										<h5 class="ui left header"> {{ item.name || '-' }} </h5>
									</td>
									<td>
										<h5 class="ui left header"> {{ item.email || '-' }} </h5>
									</td>
									<td>
										<h5 class="ui left header"> {{ item.enrollment || '-' }} </h5>
									</td>
								</tr>
							</tbody>
						</table>
						<table class="ui table" v-else-if="this.exibitor == 'discipline'">
							<thead>
								<tr>
									<th>Matriculas</th>
								</tr>
							</thead>
							<tbody>
								<tr class="" v-for="(item, index) in enrollmentsByDiscipline" :key="index">
									<td>
										<h5 class="ui left header"> {{ item || '-' }} </h5>
									</td>
								</tr>
							</tbody>
						</table>
						<table class="ui table" v-else>
							<thead>
								<tr>
									<th>Disciplinas</th>
								</tr>
							</thead>
							<tbody>
								<tr class="" v-for="(item, index) in disciplinesByEnrollment" :key="index">
									<td>
										<h5 class="ui left header"> {{ item || '-' }} </h5>
									</td>
								</tr>
							</tbody>
						</table>
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
  name: "search-allocation",
  data() {
    return {
      exibitor: "all",
      open: false,
      students: {},
			allocations: {},
      enrollmentsByDiscipline: [],
      disciplinesByEnrollment: [],
			
			codeInputDiscipline: "",
			codeInputEnrollment: ""
    };
  },
  created() {
    this.updateUsers();
    this.getAllocations().then(data => {
      this.allocations = data;
    });
    this.getStudentsAllocations().then(data => {
      this.students = data;
    });
  },
  methods: {
    toggle() {
      this.open = !this.open;      
      this.codeInputDiscipline = '';
      this.codeInputEnrollment = '';
    },
    setExibitor(value) {
      this.exibitor = value;
    },
    setStudents(value) {
      this.students = value;
    },
    searchByEnrollment() {
      if (window.event.keyCode == 13) {
        this.disciplinesByEnrollment = this.students[this.codeInputDiscipline];
      }
    },
    searchByDiscipline() {
      if (window.event.keyCode == 13) {
        this.enrollmentsByDiscipline = this.allocations[
          this.codeInputDiscipline
        ];
      }
    },
    getAllocations() {
      return fetch(
        "http://api-sistema-pre-matricula.herokuapp.com/api/allocation"
      ).then(d => d.json());
    },
    getUsers() {
      return fetch(
        "http://api-sistema-pre-matricula.herokuapp.com/api/user"
      ).then(d => d.json());
    },
    updateUsers() {
      this.getUsers().then(data => {
        this.students = data;
      });
    },
    setDisciplinesStudent(enroll) {
      this.getDisciplinesByEnrollment(enroll).then(data => {
        //this.disciplinesCodeByStudent = data;
      });
    },
    getDisciplinesByEnrollment(enroll) {
      return this.getDisciplinesCodeByEnrollment(enroll);
    },
    getDisciplinesCodeByEnrollment(enroll) {
      return fetch(
        "http://api-sistema-pre-matricula.herokuapp.com/api/allocation/student/" +
          enroll
      ).then(res => res.json());
    },
    getDisciplineByCode(code) {
      return fetch(
        "http://api-sistema-pre-matricula.herokuapp.com/api/curricularComponent/" +
          code
      ).then(res => res.json());
    },
    getStudentsAllocations() {
      return fetch(
        "http://api-sistema-pre-matricula.herokuapp.com/api/allocation/student"
      ).then(d => d.json());
    }
  }
};
</script>

<style>
</style>

