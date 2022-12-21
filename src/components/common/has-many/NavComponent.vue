<template>
	<div>
		<div
		class="has-many-nav">
			<div class="date-picker">
				<p>
					Desde
				</p>
			    <b-form-datepicker
			    class="input-date-picker"
			    placeholder="Fecha inicio"
			    v-model="$store.state[model_name].from_date"></b-form-datepicker>
			</div>
			<div class="date-picker">
			    <p>
			    	Hasta
			    </p>
			    <b-form-datepicker
			    placeholder="Fecha fin"
			    class="input-date-picker"
			    v-model="$store.state[model_name].until_date"></b-form-datepicker>
			</div>
		    <b-button
		    @click="search"
		    variant="primary">
		    	Buscar
		    </b-button>
		</div>
		<hr>
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
	display: flex
	align-items: flex-end
	@media screen and (max-width: 768px)
		flex-direction: column
	@media screen and (min-width: 768px)
		justify-content: flex-start 
	.date-picker
		p 
			margin-bottom: 0
		@media screen and (max-width: 768px) 
			width: 100%
			margin-bottom: 15px
		@media screen and (min-width: 768px) 
			width: 400px
			margin-right: 15px
</style>