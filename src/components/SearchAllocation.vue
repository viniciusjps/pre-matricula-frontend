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
                  <th>Disciplinas</th>
								</tr>
							</thead>
							<tbody>
								<tr class="" v-for="(item, index) in allocations" :key="index">
									<td>
										{{ item.name || '-' }}
									</td>
									<td>
										{{ item.email || '-' }}
									</td>
									<td>
										{{ item.enrollment || '-' }}
									</td>
                  <td>
										 {{ item.disciplines.join(" - ") || '-' }}
									</td>
								</tr>
							</tbody>
						</table>
						<table class="ui table" v-else-if="this.exibitor == 'disciplines'">
							<thead>
								<tr>
									<th>Matriculas</th>
								</tr>
							</thead>
							<tbody>
								<tr class="" v-for="(item, index) in enrollmentsByDiscipline" :key="index">
									<td>
										{{ item.name || '-' }}
									</td>
								</tr>
							</tbody>
						</table>
						<table class="ui table" v-else-if="this.exibitor == 'enroll'">
							<thead>
								<tr>
									<th>Disciplinas</th>
								</tr>
							</thead>
							<tbody>
								<tr class="" v-for="(item, index) in disciplinesByEnrollment" :key="index">
									<td>
										{{ item || '-' }}
									</td>
								</tr>
							</tbody>
						</table>
				</sui-modal-description>
			</sui-modal-content>
			<sui-modal-actions>
				<sui-button positive @click="exportTableToCSV('alocacoes.csv')">
          <i class="download icon"></i>
					Download
				</sui-button>
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
      allocations: [],
      enrollmentsByDiscipline: [],
      disciplinesByEnrollment: [],

      codeInputDiscipline: "",
      codeInputEnrollment: ""
    };
  },
  created() {
    /*
    this.updateUsers();
    this.getAllocations().then(data => {
      this.allocations = data;
    });
    this.getStudentsAllocations().then(data => {
      this.students = data;
    });*/
    this.newGetAllocations();
  },
  methods: {
    toggle() {
      this.open = !this.open;
      this.codeInputDiscipline = "";
      this.codeInputEnrollment = "";
    },
    setExibitor(value) {
      this.exibitor = value;
    },
    setStudents(value) {
      this.students = value;
    },
    searchByEnrollment() {
      if (window.event.keyCode == 13) {
        let enrollment = this.codeInputEnrollment;
        this.disciplinesByEnrollment = this.allocations.filter(
          e => e.enrollment === enrollment
        )[0].disciplines;
      }
    },
    searchByDiscipline() {
      if (window.event.keyCode == 13) {
        let code = this.codeInputDiscipline;
        this.enrollmentsByDiscipline = this.allocations.filter(e =>
          e.disciplines.includes(code)
        );
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
    },
    newGetAllocations() {
      let urlBase = "http://api-sistema-pre-matricula.herokuapp.com/api";
      fetch(urlBase + "/allocation/student")
        .then(d => d.json())
        .then(estudantes => Object.keys(estudantes))
        .then(a =>
          a.map(e => {
            let temp = {};
            temp.enrollment = e;
            fetch(urlBase + "/allocation/student/" + e)
              .then(disciplinas => disciplinas.json())
              .then(disc => {
                temp.disciplines = disc;
              })
              .then(b => this.allocations.push(temp))
              .then(
                fetch(urlBase + "/user")
                  .then(usuarios => usuarios.json())
                  .then(users =>
                    users.map(u => {
                      if (u.enrollment === e) {
                        temp.name = u.name;
                        temp.email = u.email;
                      }
                    })
                  )
              )
              .then(aux => {
                localStorage.setItem("allocations", this.allocations.length);
              });
          })
        );
    },
    downloadCSV(csv, filename) {
      var csvFile;
      var downloadLink;

      // CSV file
      csvFile = new Blob([csv], { type: "text/csv" });

      // Download link
      downloadLink = document.createElement("a");

      // File name
      downloadLink.download = filename;

      // Create a link to the file
      downloadLink.href = window.URL.createObjectURL(csvFile);

      // Hide download link
      downloadLink.style.display = "none";

      // Add the link to DOM
      document.body.appendChild(downloadLink);

      // Click download link
      downloadLink.click();
    },
    exportTableToCSV(filename) {
      var csv = [];
      var rows = document.querySelectorAll("table tr");

      for (var i = 0; i < rows.length; i++) {
        var row = [],
          cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++) row.push(cols[j].innerText);

        csv.push(row.join(","));
      }

      // Download CSV file
      this.downloadCSV(csv.join("\n"), filename);
    }
  }
};
</script>

<style>
</style>

