<template>
	<div id="disciplines" class="ui container">
		<br>
		<div class="ui grid">
			<div class="four wide column">
				<div class="ui vertical pointing menu">
					<a class="item active" @click="getEnrollments('http://analytics.ufcg.edu.br/pre/ciencia_da_computacao_i_cg/disciplinas'); setActive()">Grade Nova</a>
					<a class="item" @click="getEnrollments('http://analytics.ufcg.edu.br/pre/ciencia_da_computacao_d_cg/disciplinas'); setActive()">Grade Antiga</a>
				</div>
			</div>
			<div class="twelve wide column">
				<div class="ui segments">
					<div class="ui horizontal segments" v-for="(item, index) in enrollments" :key="index">
						<div class="ui segment">
							<h5> {{ item.disciplina }} </h5>
						</div>
						<div class="ui grey secondary inverted segment">
							<h5>{{ item.semestre }}</h5>
						</div>
						<div class="ui blue tertiary inverted segment" v-if="item.tipo == 'Obrigatória'">
							<h5>{{ item.tipo }}</h5>
						</div>
						<div class="ui yellow tertiary inverted segment" v-else>
							<h5>{{ item.tipo }}</h5>
						</div>
					</div>
				</div>
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
			activated: true
		}
	},
	methods: {
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
					this.enrollments = this.enrollments.sort((x,y) => x.periodo - y.periodo)
				})
		},
		setActive() {
			this.activated = !this.activated;
		}
	}
}

</script>

<style scoped>

</style>