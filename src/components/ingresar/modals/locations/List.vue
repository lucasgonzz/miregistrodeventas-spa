<template>
	<div
	class="m-t-15">
		<b-table
		v-if="locations.length"
		class="shadow-2 b-r-1 m-b-0"
		:fields="fields"
		:items="items"
		head-variant="dark">
			<template #cell(options)="data">
				<b-button
				class="m-r-10"
				@click="edit(locations[data.index])"
				size="sm"
				variant="primary">
					<i class="icon-edit"></i>
				</b-button>
				<b-button
				@click="deleteModel(locations[data.index])"
				size="sm"
				variant="danger">
					<i class="icon-trash"></i>
				</b-button>
			</template>
		</b-table>
		<p 
		v-else
		class="text-with-icon">
			<i class="icon-eye-slash"></i>
			No hay localidades	
		</p>
	</div>
</template>
<script>
export default {
	computed: {
		fields() {
			return [
				{key: 'name', label: 'Nombre', class: 'text-center'},
				{key: 'options', label: 'Opciones', class: 'text-center'},
			]
		},
		items() {
			let items = []
			this.locations.forEach(item => {
				items.push({
					name: item.name 
				})
			})
			return items
		},
		locations() {
			return this.$store.state.locations.models
		}
	},
	methods: {
		edit(model) {
			this.$store.commit('locations/setModel', model)
			this.$bvModal.show('location')
		},
		deleteModel(model) {
			this.$store.commit('locations/setDelete', model)
			this.$bvModal.show('delete-location')
		},
	}
}
</script>