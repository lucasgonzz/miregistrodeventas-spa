<template>
	<b-row>
		<b-col
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
	components: {
		HorizontalNav,
	},
	computed: {
		items() {
			let items = []
			items.push({name: 'lista'})
			items.push({name: 'pedidos'})
			return items
		}
	},
	methods: {
		setSelected(item) {
			if (item.name == 'lista') {
				this.$store.dispatch('providers/getModels')
			}
			if (item.name == 'pedidos') {
				this.$store.dispatch('providers/orders/getModels')
			}
		},
	}
}
</script>