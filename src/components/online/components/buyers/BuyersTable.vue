<template>
	<div>
		<b-table
		v-if="!loading"
		head-variant="dark" 
		striped
		:fields="fields"
		:items="items">
			<template #cell(address)="data">
				<b-button
				size="sm"
				variant="link"
				@click="showMap(buyers_to_show[data.index].addresses[0])">
					{{ getAddress(buyers_to_show[data.index].addresses[0]) }}
				</b-button>
			</template>
			<template #cell(message)="data">
				<b-button
				size="sm"
				variant="primary"
				@click="sendMessage(buyers_to_show[data.index])">
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
		buyers_to_show() {
			return this.$store.state.online.buyers.buyers_to_show
		},
		fields() {
			return [
				{key: 'name', label: 'Nombre'},
				{key: 'surname', label: 'Apellido'},
				{key: 'phone', label: 'Telefono'},
				{key: 'email', label: 'Correo'},
				{key: 'address', label: 'Direccion'},
				{key: 'address_number', label: 'Numero'},
				{key: 'created_at', label: 'Registrado'},
				{key: 'last_login', label: 'Ultimo Login'},
				{key: 'message', label: 'Mensaje'},
			]
		},
		items() {
			let items = []
			this.buyers_to_show.forEach(buyer => {
				items.push({
					name: buyer.name,
					surname: buyer.surname,
					phone: this.phone(buyer),
					email: this.email(buyer),
					created_at: this.date(buyer.created_at),
					last_login: this.since(buyer.last_login),
				})
			})
			return items
		}
	},
	methods: {
		phone(buyer) {
			if (buyer.phone) {
				return buyer.phone.substring(4)
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