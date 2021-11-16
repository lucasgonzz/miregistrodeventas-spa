<template>
	<div>
		<b-table
		responsive
		head-variant="dark" 
		v-if="providers.length"
		striped
		:fields="fields"
		:items="items">
			<template #cell(delete)="data">
				<b-button
				@click="deleteProvider(providers[data.index])"
				size="sm"
				variant="danger">
					<i class="icon-trash-3"></i>
				</b-button>
			</template>
		</b-table>
		<p 
		v-else 
		class="text-with-icon">
			<i class="icon-user-delete"></i>
			No hay proveedores ingresados
		</p>
	</div>
</template>
<script>
export default {
	data() {
		return {
			provider: {
				name: ''
			},
			saving_provider: false,
			deleting_provider: 0,
		}
	},
	computed: {
		providers() {
			return this.$store.state.providers.providers
		},
		fields() {
			return [
				{ key: 'name', label: 'Nombre' },
				{ key: 'address', label: 'Direccion' },
				{ key: 'delete', label: 'Eliminar' },
			]
		},
		items() {
			let items = []
			this.providers.forEach(item => {
				items.push({
					name: item.name,
					address: item.address,
				})
			})
			return items
		}
	},
	methods: {
		deleteProvider(provider) {
			this.$store.commit('providers/setDelete', provider)
			this.$bvModal.show('delete-provider')
		},
	}
}
</script>