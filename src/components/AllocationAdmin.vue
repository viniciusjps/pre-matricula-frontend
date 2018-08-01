<template>
	<div id="allocations">
        <button @click="searchAll()">Todas</button>
        <input id="discipline" type="text" placeholder="disciplina" v-on:keydown="searchByDiscipline()" v-model="discipline">
        <input id="enrollment" type="text" placeholder="matricula" v-on:keydown="searchByEnrollment()" v-model="enrollment">
		<div>
        {{find}}
        </div>
	</div>
</template>

<script>
export default {
  name: "allocation",
  data() {
    return {
      allocations: {},
      students: {},
      find: {},
      discipline: "",
      enrollment: ""
    };
  },
  created() {
    this.getAllocationsBack().then(a => this.setAllocations(a));
    this.getStudentsBack().then(a => this.setStudents(a));
  },
  methods: {
    setAllocations(value) {
      this.allocations = value;
    },
    setStudents(value) {
      this.students = value;
    },
    getAllocationsBack() {
      return fetch(
        "http://api-sistema-pre-matricula.herokuapp.com/api/allocation"
      ).then(d => d.json());
    },
    getStudentsBack() {
      return fetch(
        "http://api-sistema-pre-matricula.herokuapp.com/api/allocation/student"
      ).then(d => d.json());
    },
    searchByEnrollment() {
      if (window.event.keyCode == 13) {
        this.find = this.students[this.enrollment];
      }
    },
    searchByDiscipline() {
      if (window.event.keyCode == 13) {
        this.find = this.allocations[this.discipline];
      }
    },
    searchAll() {
      this.find = this.allocations;
    }
  }
};
</script>
