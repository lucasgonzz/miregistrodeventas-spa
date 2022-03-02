<template>
	<b-col 
	class="j-start"
	cols="12"
	md="6">
		<b-button-group class="btn-group-totales">
			<b-button
			v-intro-step="3"
			v-intro="'Total vendido en el día'"
			variant="success">
				<span v-show="loading">
					<span class="spinner-border spinner-border-sm"></span>
					Calculando...
				</span>
				<span v-show="!loading">
					Total: {{ price(total) }}
				</span>
			</b-button>
			<b-button
			v-if="total_cost != 0 && can('articles.cost')"
			variant="danger">
				<span v-show="loading">
					<span class="spinner-border spinner-border-sm"></span>
					Calculando...
				</span>
				<span v-show="!loading">
					Total costos: {{ price(total_cost) }}
				</span>
			</b-button>
		</b-button-group>
	</b-col>
	
</template>
<script>
export default {
	computed: {
		loading() {
			return this.$store.state.sales.loading
		},
		total_cost() {
			return this.$store.state.sales.total_cost
		},
		total() {
			return this.$store.state.sales.total
		},
	}
}
</script>