<template>
	<div>
		<b-table
		v-if="brands.length"
		head-variant="dark"
		:fields="fields"
		:items="items">
			<template #cell(options)="data">
				<b-button
				@click="edit(items[data.index])"
				size="sm"
				variant="primary">
					Editar
				</b-button>
				<b-button
				@click="deleteBrand(items[data.index])"
				size="sm"
				class="m-l-10"
				variant="danger">
					<i class="icon-trash"></i>
				</b-button>
			</template>
		</b-table>
		<p
		v-else 
		class="text-with-icon">
			<i class="icon-not"></i>
			No hay marcas creadas
		</p>
	</div>
</template>
<script>
export default {
	computed: {
		brands() {
			return this.$store.state.brands.brands
		},
		items() {
			let items = []
			this.brands.forEach(brand => {
				items.push({
					id: brand.id,
					name: brand.name,
				})
			})
			return items
		},
		fields() {
			return [
				{ key: 'name', label: 'Nombre', class: 'text-center'},
				{ key: 'options', label: 'Opciones', class: 'text-center'},
			]
		},
	},
	data() {
		return {
			last_category_id: 0,
		}
	},
	methods: {
		edit(item) {
			this.$store.commit('brands/setEdit', item)
			this.$bvModal.show('edit-brand')

		},
		deleteBrand(item) {
			this.$store.commit('brands/setDelete', item)
			this.$bvModal.show('delete-brand')
		},
	}
}
</script>
<style scoped lang="sass">
.category-item
	display: flex
	justify-content: space-between
</style>