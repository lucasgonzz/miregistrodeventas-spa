<template>
	<b-row
	class="m-b-15">
		<b-col
		cols="12"
		xl="10">
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
			if (this.can('order_production.index')) {
				items.push({name: 'ordenes-de-produccion'})
			}
			// items.push({name: 'recetas'})
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