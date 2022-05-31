<template>
	<b-card
	class="shadow-5 b-r-1"
	title="Direcciones">
		<b-table
		responsive
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
					<i class="icon-trash"></i>
				</b-button>
			</template>
		</b-table>
		<p
		v-else>
			Sin direcciones
		</p>
		<div 
		class="j-start m-t-10">
			<b-button
			variant="primary"
			@click="addAddress">
				Agregar direccion
			</b-button>
		</div>
	</b-card>
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
		addAddress() {
			this.$store.commit('address/setCity', '')
			this.$router.push({name: 'Maps'})
		},
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