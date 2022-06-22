<template>
	<b-row
	v-if="show">
		<b-col
		cols="12">
			<horizontal-nav
			:items="items"
			prop_name="street"
			:set_view="true"
			@setSelected="setSelected"></horizontal-nav>
		</b-col>
	</b-row>
</template>
<script>
import HorizontalNav from '@/components/common/HorizontalNav'
export default {
	name: 'AddressNav',
	components: {
		HorizontalNav,
	},
	computed: {
		show() {
			return this.user.addresses.length >= 2
		},
		items() {
			let items = []
			items.push({street: 'todas'})
			items = items.concat(this.user.addresses)
			return items
		},
		sales() {
			return this.$store.state.sales.sales
		},
	},
	methods: {
		setSelected(item) {
			let sales 
			if (item.street == 'todas') {
				sales = this.sales
			} else {
				sales = this.sales.filter(sale => {
					return sale.address_id == item.id
				})
			}
			this.$store.commit('sales/setSalesToShow', sales)
			this.$store.commit('sales/setTotal')
		},
	}
}
</script>