<template>
	<div
	@click="budgetDetails()"
	class="shadow-1 model budget b-r-1 c-p apretable">
		<div
		class="client">
			<p>
				{{ budget.client.name }} {{ budget.client.surname }}
			</p>
		</div>
		<p>
			N° {{ numBudget(budget) }}
		</p>
		<p>
			<strong>{{ getTotal(budget) }}</strong>
		</p>
		<p class="sice"> 
			{{ date(budget.created_at) }}
		</p>
		<p 
		v-if="budget.order_production"
		class="text-primary"> 
			En produccion hace {{ since(budget.order_production.created_at) }}
		</p>
	</div>
</template>
<script>
import budgets from '@/mixins/budgets'
export default {
	mixins: [budgets],
	props: ['budget'],
	methods: {
		budgetDetails() {
			this.$store.commit('produccion/budgets/setEdit', this.budget)
			this.$router.push({name: this.route_name, params: {sub_view: 'productos'}})
			setTimeout(() => {
				this.$bvModal.show('budget-details')
			}, 100)
		}
	}
}
</script>
<style lang="sass">
.budget 
	padding-bottom: 0 !important 
	height: min-content
	.client
		width: 100%
		padding-top: 100%
		position: relative
		display: flex
		justify-content: center
		align-items: center
		p 
			position: absolute
			top: 50%
			transform: translatey(-50%)
			font-size: 2em
			font-weight: bold
			text-align: center
</style>