<template>
	<b-row
	class="m-b-15">
		<b-col
		cols="12">
			<horizontal-nav
			:items="items"
			prop_name="name"
			:set_view="true"></horizontal-nav>
		</b-col>
	</b-row>
</template>
<script>
import HorizontalNav from '@/components/common/horizontal-nav/Index'
export default {
	name: 'NavProduccion',
	components: {
		HorizontalNav,
	},
	computed: {
		items() {
			let items = []
			if (this.can('order_production.index')) {
				items.push({name: 'ordenes de produccion', action: 'order_production/getModels'})
			}
			items.push({name: 'recetas', action: 'recipe/getModels'})
			return items
		}
	},
	methods: {
		setSelected(item) {
			if (item.name == 'ordenes-de-produccion') {
				this.$store.dispatch('order_production/getModels')
			}
			if (item.name == 'recetas') {
				this.$store.dispatch('recipe/getModels')
			}
		},
		// setView(view) {
		// 	if (this.view != view) {
		// 		console.log('set view')
		// 		this.$router.push({name: 'Produccion', params: {view: view}})
		// 	}
		// },
		// isActive(name) {
		// 	return this.view == name
		// },
	}
}
</script>