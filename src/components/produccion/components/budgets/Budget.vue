<template>
	<div
	@click="budgetDetails()"
	class="model card-moderna c-p apretable">
		<div 
		:class="status_class"
		class="status">
			{{ status_text }}
		</div>
		<div
		class="title">
			<p>
				{{ budget.client.name }} {{ budget.client.surname }}
			</p>
		</div>
		<div class="data">
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
	</div>
</template>
<script>
import budgets from '@/mixins/budgets'
export default {
	mixins: [budgets],
	props: ['budget'],
	computed: {
		status_class() {
			if (this.budget.order_production) {
				return 'bg-primary'
			}
			if (this.budget.status == 'unconfirmed') {
				return 'bg-danger'
			}
			if (this.budget.status == 'confirmed') {
				return 'bg-success'
			}
		},
		status_text() {
			if (this.budget.order_production) {
				return this.budget.order_production.status.name
			}
			if (this.budget.status == 'unconfirmed') {
				return 'Sin confirmar'
			}
			if (this.budget.status == 'confirmed') {
				return 'Confirmado'
			}
		},
	},
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