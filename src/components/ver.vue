   setAllocation() {
      let disciplines = [];
      let disciplinesOld = [];
      let deleteDisciplines = [];
      let updateDisciplines = [];
      let enrollment = Service.methods.getEnrollment();

      this.getDisciplinesByEnrollment(enrollment).then(data => {
        disciplinesOld = data;
        deleteDisciplines = disciplinesOld.filter(a => this.selectedEnrollments.indexOf(a) < 0);
        updateDisciplines = this.selectedEnrollments.filter(a => disciplinesOld.indexOf(a) < 0);

        for (let index = 0; index < this.selectedEnrollments.length; index++) {
          const element = this.selectedEnrollments[index];
          disciplines.push({
            studentEnrollment: this.studentEnrollment,
            disciplineCode: element.code
          });
        }
      });