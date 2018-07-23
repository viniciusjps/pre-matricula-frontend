<template>
	<div id="disciplines" class="ui container">
		<div class="ui two column very relaxed stackable grid">
			<div class="four wide column">
				<br><br>
				<div class="ui vertical menu">
					<a class="item active" @click="getEnrollments('http://analytics.ufcg.edu.br/pre/ciencia_da_computacao_i_cg/disciplinas'); setGradeType('grade_nova');">Grade Nova</a>
					<a class="item" @click="getEnrollments('http://analytics.ufcg.edu.br/pre/ciencia_da_computacao_d_cg/disciplinas'); setGradeType('grade_antiga');">Grade Antiga</a>
				</div>
			</div>
			<div class="twelve wide column">
				<br>
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
									<input type="checkbox" name="item.codigo_disciplina">
									<label></label>
								</div>
								<td>
									<h5 class="ui left header"> {{ item.disciplina }} </h5>
								</td>
							</td>
							<td>
								<h5 class="ui center aligned header"> {{ item.creditos || '-' }} </h5>
							</td>
							<td id="semestre">
								<h5 class="ui center aligned inverted header"> {{ item.semestre || '-' }} </h5>
							</td>
							<td id="tipo_obrigatoria" v-if="item.tipo == 'Obrigatória'">
								<h5 class="ui center aligned inverted header"> {{ item.tipo }} </h5>
							</td>
							<td id="tipo_optativa" v-else>
								<h5 class="ui center aligned inverted header"> {{ item.tipo }} </h5>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'disciplines',
	data () {
		return {
			enrollments: [{ disciplina: 'Carregando disciplinas ...' }],
			type: ''
		}
	},
	methods: {
		setGradeType(value) {
			this.type = value
		},
		updateDisciplines(link) {
			return fetch(link)
				.then(res => res.json());
		},
		getEnrollments(link) {
			this.updateDisciplines(link)
				.then(data => {
					this.enrollments = data
				})
				.then(a => {
					this.enrollments = this.enrollments.sort((x,y) => x.semestre - y.semestre);
				});
		}
	}
}

</script>

<style scoped>

#tipo_obrigatoria{
	background-color: #77b0e1; 
}

#tipo_optativa{
	background-color: #fdd365;
}

#semestre {
	background-color: #919191;
}

#check_box {
	align: center;
	position: fixed;
}


</style>