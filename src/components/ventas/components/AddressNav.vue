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
import moment from 'moment'

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
		selected_day() {
			return this.$store.state.sales.previus_days.selected_day
		},
		selected_address() {
			return this.$store.state.sales.selected_address
		},
		current_sales() {
			return this.$store.state.sales.models
		},
		from_date() {
			return this.$store.state.sales.from_date
		},
	},
	watch: {
		selected_day() {
			this.$store.commit('sales/setSelectedAddress', {street: 'todas'})
			this.$router.push({name: this.route_name, params: {view: 'todas'}})
		},
	},
	methods: {
		setSelected(address) {
			this.$store.commit('sales/setSelectedAddress', address)
			this.setSales()
		},
		setSales() {
			let sales
			let sales_to_filter
			if (this.date(this.selected_day) == moment().format('DD/MM/YY')) {
				sales_to_filter = this.current_sales
			} else {
				sales_to_filter = this.from_date
			}
			if (this.selected_address.street == 'todas') {
				sales = sales_to_filter 
			} else {
				sales = sales_to_filter.filter(sale => {
					return sale.address_id == this.selected_address.id
				})
			}
			console.log(sales)
			this.$store.commit('sales/setToShow', sales)
			this.$store.commit('sales/setTotal')
		},
	}
}
</script>