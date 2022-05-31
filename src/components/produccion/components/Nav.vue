<template>
	<b-row
	class="m-b-0">
		<b-col
		cols="12"
		md="8">
			<horizontal-nav
			:items="items"
			prop_name="name"
			:set_view="true"
			@setSelected="setSelected"></horizontal-nav>
		</b-col>
	</b-row>
</template>
<script>
import HorizontalNav from '@/components/common/HorizontalNav'
export default {
	name: 'NavProduccion',
	components: {
		HorizontalNav,
	},
	computed: {
		items() {
			let items = []
			if (this.can('production.budgets')) {
				items.push({name: 'presupuestos'})
			}
			if (this.can('production.order_productions')) {
				items.push({name: 'ordenes-de-produccion'})
			}
			return items
		}
	},
	methods: {
		setSelected(item) {
			if (item.name == 'presupuestos') {
				this.$store.dispatch('produccion/budgets/getModels')
			}
			if (item.name == 'ordenes-de-produccion') {
				this.$store.dispatch('produccion/order_productions/getModels')
			}
		},
		setView(view) {
			if (this.view != view) {
				console.log('set view')
				this.$router.push({name: 'Produccion', params: {view: view}})
			}
		},
		isActive(name) {
			return this.view == name
		},
	}
}
</script>