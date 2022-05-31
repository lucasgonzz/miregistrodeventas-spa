<template>
	<div
	@click="details()"
	class="shadow-1 model order-production b-r-1 c-p apretable">
		<div
		class="client">
			<p>
				{{ order_production.budget.client.name }} {{ order_production.budget.client.surname }}
			</p>
		</div>
		<p
		class="status text-primary">
			{{ order_production.status.name }}
		</p>
		<p>
			{{ getTotal(order_production.budget) }}
		</p>
		<p class="sice"> 
			{{ since(order_production.created_at) }}
		</p>
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
<style lang="sass">
.order-production 
	padding: 0
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
	.status
		text-align: center
		font-size: 1.5em
		font-weight: bold
</style>