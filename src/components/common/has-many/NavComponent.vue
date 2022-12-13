<template>
	<div
	class="j-start has-many-nav">
	    <b-form-datepicker
	    class="date-picker"
	    placeholder="Fecha inicio"
	    v-model="$store.state[model_name].from_date"></b-form-datepicker>
	    <b-form-datepicker
	    placeholder="Fecha fin"
	    class="date-picker"
	    v-model="$store.state[model_name].until_date"></b-form-datepicker>
	    <b-button
	    @click="search"
	    variant="primary">
	    	Buscar
	    </b-button>
	</div>
</template>
<script>
export default {
	props: {
		model_name: String,
	},
	methods: {
		search() {
			this.$store.dispatch(this.model_name+'/getModels')
		}
	}
}
</script>
<style lang="sass">
.has-many-nav
	.date-picker 
		width: 400px
		margin-right: 15px
</style>