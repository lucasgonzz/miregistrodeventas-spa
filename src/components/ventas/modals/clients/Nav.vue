<template>
	<b-nav tabs class="m-b-10">
		<b-nav-item 
		:active="isActive('mios')"
		@click="setSelectedSeller(null)">Mios</b-nav-item>
		<b-nav-item
		@click="setSelectedSeller(seller)"
		:active="isActive(seller)"
		v-for="seller in sellers"
		:key="seller.id">
			{{ seller.name }}
		</b-nav-item>
	</b-nav>
</template>
<script>
export default {
	name: 'SellersNav',
	computed: {
		sellers() {
			return this.$store.state.sellers.sellers
		},
		selected_seller() {
			return this.$store.state.sales.clients.selected_seller
		},
	},
	methods: {
		isActive(seller) {
			if (!this.selected_seller && seller == 'mios') {
				return true
			} 
			if (this.selected_seller && this.selected_seller.id == seller.id) {
				return true
			}
			return false
		},
		setSelectedSeller(seller) {
			this.$store.commit('sales/clients/setSelectedSeller', seller)
		}
	}
}
</script>