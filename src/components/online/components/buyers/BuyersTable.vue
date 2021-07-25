<template>
	<div>
		<b-table
		v-if="!loading"
		head-variant="dark" 
		striped
		:fields="fields"
		:items="items">
			<template #cell(message)="data">
				<b-button
				size="sm"
				variant="primary"
				@click="sendMessage(buyers[data.index])">
            		<i class="icon-message"></i>
				</b-button>
			</template>
		</b-table>
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
import online from '@/mixins/online'
export default {
	mixins: [online],
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
				{key: 'message', label: 'Mensaje'},
			]
		},
		items() {
			let items = []
			this.buyers.forEach(buyer => {
				items.push({
					name: buyer.name,
					surname: buyer.surname,
					phone: this.phone(buyer),
					email: this.email(buyer),
					address: this.address(buyer),
					address_number: this.addressNumber(buyer),
					last_login: this.since(buyer.last_login),
				})
			})
			return items
		}
	},
	methods: {
		phone(buyer) {
			return buyer.phone.substring(4)
		},
		address(buyer) {
			if (buyer.address) {
				return buyer.address
			}
			return '-'
		},
		addressNumber(buyer) {
			if (buyer.address_number) {
				return buyer.address_number
			}
			return '-'
		},
		email(buyer) {
			if (buyer.email) {
				return buyer.email
			}
			return '-'
		},
	}
}
</script>