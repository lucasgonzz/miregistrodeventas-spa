<template>
	<div
	@click="details()"
	class="shadow-1 model card-moderna b-r-1 c-p apretable">
		<div 
		class="status bg-primary">
			{{ order_production.status.name }}
		</div>
		<div
		class="title">
			<p>
				{{ order_production.budget.client.name }} {{ order_production.budget.client.surname }}
			</p>
		</div>
		<div class="data">
			<p>
				{{ getTotal(order_production.budget) }}
			</p>
			<p class="sice"> 
				{{ since(order_production.created_at) }}
			</p>
		</div>
	</div>
</template>
<script>
import budgets from '@/mixins/budgets'
export default {
	mixins: [budgets],
	props: ['order_production'],
	methods: {
		details() {
			this.$store.commit('produccion/order_productions/setEdit', this.order_production)
			this.$router.push({name: this.route_name, params: {sub_view: 'productos'}})
			setTimeout(() => {
				this.$bvModal.show('order-production-details')
			}, 100)
		}
	}
}
</script>
