<template>
	<div
	v-if="sellers.length"
	class="nav-clients">
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
		<b-button
		@click="printClients"
		variant="danger">
			<i class="icon-print"></i>
		</b-button>
	</div>
</template>
<script>
export default {
	name: 'SellersNav',
	computed: {
		sellers() {
			return this.$store.state.sellers.models
		},
		selected_seller() {
			return this.$store.state.clients.selected_seller
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
			this.$store.commit('clients/setSelectedSeller', seller)
			this.$store.commit('clients/setIndexToShow', 1)
			// this.$store.commit('sales/clients/setSelectedSeller', seller)
			// this.$store.commit('sales/clients/setIndexToShow', 1)
		},
		printClients() {
			let seller_id = this.isActive('mios') ? undefined : this.selected_seller.id
			let url = process.env.VUE_APP_API_URL+'/clients/pdf/'+seller_id
            window.open(url)
		}
	}
}
</script>
<style lang="sass">
.nav-clients
	display: flex
	align-items: center
	justify-content: space-between
	.nav-tabs
		width: 90%
</style>