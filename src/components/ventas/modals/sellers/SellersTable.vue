<template>
	<b-table
	head-variant="dark" 
	:items="items"
	:fields="fields"></b-table>
</template>
<script>
export default {
	computed: {
		fields() {
			return [
				{ key: 'name', label: 'Nombre' },
				{ key: 'surname', label: 'Apellido' },
				{ key: 'commission', label: 'Comision' },
			]
		},
		items() {
			let items = []
			this.sellers.forEach(seller => {
				items.push({
					name: seller.name,
					surname: seller.surname,
					commission: seller.commission,
				})
			})
			return items
		},
		sellers() {
			return this.$store.state.sellers.sellers
		}
	}
}
</script>