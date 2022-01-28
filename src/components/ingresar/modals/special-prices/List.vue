<template>
	<div>
		<b-table
		responsive
		head-variant="dark" 
		v-if="special_prices.length"
		striped
		:fields="fields"
		:items="items">
			<template #cell(delete)="data">
				<b-button
				@click="deleteSpecialPrice(special_prices[data.index])"
				size="sm"
				variant="danger">
					<i class="icon-trash"></i>
				</b-button>
			</template>
		</b-table>
		<p 
		v-else 
		class="text-with-icon">
			<i class="icon-not"></i>
			No hay precios especiales
		</p>
	</div>
</template>
<script>
export default {
	computed: {
		special_prices() {
			return this.$store.state.special_prices.special_prices
		},
		fields() {
			return [
				{ key: 'name', label: 'Nombre' },
				{ key: 'delete', label: 'Eliminar' },
			]
		},
		items() {
			let items = []
			this.special_prices.forEach(item => {
				items.push({
					name: item.name,
				})
			})
			return items
		}
	},
	methods: {
		deleteSpecialPrice(special_price) {
			this.$store.commit('special_prices/setDelete', special_price)
			this.$bvModal.show('delete-special-price')
		},
	}
}
</script>