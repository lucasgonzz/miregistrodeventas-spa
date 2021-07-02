<template>
	<div>
		<b-table
		v-if="!loading"
		head-variant="dark" 
		striped
		:fields="fields"
		:items="items"></b-table>
		<b-skeleton-table
		v-else
		:hide-header="false"
		:rows="5"
		:columns="7"
		:table-props="{ bordered: true, striped: true }"
		></b-skeleton-table>
	</div>
</template>
<script>
export default {
	computed: {
		loading() {
			return this.$store.state.online.buyers.loading
		},
		buyers() {
			return this.$store.state.online.buyers.buyers
		},
		fields() {
			return [
				{key: 'name', label: 'Nombre'},
				{key: 'surname', label: 'Apellido'},
				{key: 'phone', label: 'Telefono'},
				{key: 'email', label: 'Correo'},
				{key: 'address', label: 'Direccion'},
				{key: 'address_number', label: 'Numero'},
				{key: 'last_login', label: 'Ultimo Login'},
			]
		},
		items() {
			let items = []
			this.buyers.forEach(buyer => {
				items.push({
					name: buyer.name,
					surname: buyer.surname,
					phone: this.phone(buyer),
					email: buyer.email,
					address: buyer.address,
					address_number: buyer.address_number,
					last_login: this.since(buyer.last_login),
				})
			})
			return items
		}
	},
	methods: {
		phone(buyer) {
			return buyer.phone.substring(4)
		}
	}
}
</script>