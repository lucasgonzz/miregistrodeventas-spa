<template>
	<b-form-group
	label="Direcciones"
	class="j-start">
		<b-table
		head-variant="dark" 
		v-if="user.addresses.length"
		striped
		:fields="fields"
		:items="items">
			<template #cell(delete)="data">
				<b-button
				@click="deleteAddress(user.addresses[data.index])"
				size="sm"
				variant="danger">
					<i class="icon-trash-3"></i>
				</b-button>
			</template>
		</b-table>
		<p
		v-else>
			Sin direcciones
		</p>
		<b-button
		variant="primary"
		:to="{name: 'Maps'}">
			Agregar direccion
		</b-button>
	</b-form-group>
</template>
<script>
export default {
	data() {
		return {
			loading: 0
		}
	},
	computed: {
		fields() {
			return [
				{ key: 'street', label: 'Calle' },
				{ key: 'street_number', label: 'Numero' },
				{ key: 'depto', label: 'Depto' },
				{ key: 'description', label: 'Descripcion' },
				{ key: 'delete', label: 'Eliminar' },
			]
		},
		items() {
			let items = []
			this.user.addresses.forEach(address => {
				items.push({
					street: address.street,
					street_number: address.street_number,
					depto: address.depto,
					description: address.description,
				})
			})
			return items
		}
	},
	methods: {
		deleteAddress(address) {
			this.loading = address.id
			this.$api.delete('addresses/'+address.id)
			.then(() => {
				this.$toast.success('Direccion eliminada')
				this.$store.commit('auth/deleteAddress', address)
			})
			.catch(err => {
				console.log(err)
				this.$toast.error('Error al eliminar direccion')
			})
		}
	}
}
</script>