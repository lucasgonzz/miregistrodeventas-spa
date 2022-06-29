<template>
	<b-row 
	class="m-b-15 j-start">
		<b-col
		md="8">
			<b-form-input
			@keyup="search"
			placeholder="Buscar pedidos de un proveedor"
			v-model="query"></b-form-input>
		</b-col>
	</b-row>
</template>
<script>
export default {
	data() {
		return {
			query: '',
		}
	},
	computed: {
		orders() {
			return this.$store.state.providers.orders.models
		},
	},
	methods: {
		search() {
			if (this.query.length < 3) {
				this.$store.commit('providers/orders/setToShow')
			} else {
				let orders = this.orders.filter(item => {
					return item.provider.name.toLowerCase().includes(this.query.toLowerCase())
				})
				this.$store.commit('providers/orders/setToShow', orders)
			}
		}
	}
}
</script>