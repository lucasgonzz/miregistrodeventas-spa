<template>
<b-table
:fields="fields"
:items="items">
	<template #cell(options)="data">
		<b-button
		size="sm"
		@click="edit(discounts[data.index])"
		variant="primary">
			Editar
		</b-button>
	</template>
</b-table>
</template>
<script>
export default {
	name: 'DiscountsList',
	computed: {
		discounts() {
			return this.$store.state.discounts.discounts
		},
		fields() {
			return [
				{ key: 'name', label: 'Nombre', class: 'text-center' },
				{ key: 'percentage', label: 'Descuento', class: 'text-center' },
				{ key: 'options', label: 'Opciones', class: 'text-center' },
			]
		},
		items() {
			let items = []
			this.discounts.forEach(discount => {
				items.push({
					name: discount.name,
					percentage: discount.percentage+'%',
				})
			})
			return items
		}
	},
	methods: {
		edit(discount) {
			this.$store.commit('discounts/setEdit', discount)
			this.$bvModal.show('edit-discount')
		}
	}
}
</script>