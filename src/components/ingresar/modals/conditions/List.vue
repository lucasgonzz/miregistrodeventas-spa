<template>
	<div>
		<b-table
		v-if="conditions.length"
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
				@click="deleteCondition(items[data.index])"
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
			No hay condiciones creadas
		</p>
	</div>
</template>
<script>
export default {
	computed: {
		conditions() {
			return this.$store.state.conditions.conditions
		},
		items() {
			let items = []
			this.conditions.forEach(condition => {
				items.push({
					id: condition.id,
					name: condition.name,
					description: condition.description,
				})
			})
			return items
		},
		fields() {
			return [
				{ key: 'name', label: 'Nombre', class: 'text-center'},
				{ key: 'description', label: 'Descripcion', class: 'text-center'},
				{ key: 'options', label: 'Opciones', class: 'text-center'},
			]
		},
	},
	methods: {
		edit(item) {
			this.$store.commit('conditions/setEdit', item)
			this.$bvModal.show('edit-condition')

		},
		deleteCondition(item) {
			this.$store.commit('conditions/setDelete', item)
			this.$bvModal.show('delete-condition')
		},
	}
}
</script>
<style scoped lang="sass">
.category-item
	display: flex
	justify-content: space-between
</style>