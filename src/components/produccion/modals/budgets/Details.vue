<template>
<b-modal
v-if="budget_model"
size="lg"
:title="title"
id="budget-details"
hide-footer>
	<budget-data
	:budget="budget_model"></budget-data>
	<b-button
	block
	variant="primary"
	@click="update()">
		<btn-loader
		text="Actualizar datos"
		:loader="updating"></btn-loader>
	</b-button>
	<b-button
	block
	variant="primary"
	@click="confirm()">
		<btn-loader
		text="Confirmar presupuesto"
		:loader="loading_confirm"></btn-loader>
	</b-button>
</b-modal>
</template>
<script>
import budgets from '@/mixins/budgets'

import BudgetData from '@/components/produccion/modals/budgets/data/Index'
import BtnLoader from '@/components/common/BtnLoader'
export default {
	mixins: [budgets],
	components: {
		BudgetData,
		BtnLoader,
	},
	computed: {
		items() {
			let items = []
			items.push({name: 'productos'})
			items.push({name: 'fechas'})
			items.push({name: 'observaciones'})
			return items
		},
		title() {
			return 'Presupuesto N° '+this.numBudget(this.budget_model)
		},
	},
	data() {
		return {
			updating: false,
			loading_confirm: false,
		}
	},
	methods: {
		setSelected(item) {
			this.$router.push({name: this.route_name, params: {sub_view: item.name}})
		},
		update() {
			this.updating = true 
			this.$api.put('budgets', this.budget_model)
			.then(res => {
				this.updating = false 
				this.$toast.success('Presupuesto actualizado')
				this.$store.commit('produccion/budgets/update', res.data.budget)
				// this.$bvModal.hide('budget-details')
			})
			.catch(err => {
				this.updating = false 
				this.$toast.error('Error al actualizar Presupuesto')
				console.log(err)
			})
		},
		confirm() {
			this.loading_confirm = true 
			this.$api.post('order-productions', this.budget_model)
			.then(res => {
				this.loading_confirm = false 
				this.$toast.success('Orden de produccion creada')
				this.$store.commit('produccion/order_productions/add', res.data.order_production)
				this.$bvModal.hide('budget-details')
				this.$router.push({name: 'Produccion', params: {view: 'ordenes-de-produccion'}})
			})
			.catch(err => {
				this.loading_confirm = false 
				this.$toast.error('Error al crear orden de produccion')
				console.log(err)
			})
		},
	}
}
</script>