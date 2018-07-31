<template>
    
</template>

<script>
import SuiVue from "semantic-ui-vue";
import Vue from "vue";
import Service from "./../Service.vue";

Vue.use(SuiVue);

export default {
  name: "consult-user",
  data() {
    return {};
	},
	created() {
		Service.methods.reloadPage();
	},
	methods: {

	}
};
</script>