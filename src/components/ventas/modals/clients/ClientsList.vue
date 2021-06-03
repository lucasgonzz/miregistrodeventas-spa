<template>
	<div>
		<b-table
		:fields="fields"
		:items="items">
			<template #cell(options)="data">
				<b-button
				size="sm"
				variant="primary"
				@click="editClient(clients_to_show[data.index])">
					Editar
				</b-button>
				<b-button
				v-if="clients_to_show[data.index].current_acounts_count == 0"
				class="m-l-10"
				size="sm"
				variant="primary"
				@click="saldoInicial(clients_to_show[data.index])">
					Saldo inicial
				</b-button>
				<b-button
				class="m-l-10"
				size="sm"
				variant="success"
				@click="showCurrentAcounts(clients_to_show[data.index], true)">
					C/Ctes
				</b-button>
				<b-button
				class="m-l-10"
				size="sm"
				variant="danger"
				@click="deleteClient(clients_to_show[data.index])">
					Eliminar
				</b-button>
			</template>
		</b-table>
		<b-button
		variant="primary"
		@click="addClientsToShow">
			Ver mas
		</b-button>
	</div>
</template>
<script>
import Clients from '@/mixins/clients'
export default {
	name: 'ClientsList',
	mixins: [Clients],
	computed: {
		search_query() {
			return this.$store.state.clients.search_query
		},
		fields() {
			return [
				{ key: 'name', label: 'Nombre', class: 'text-center'},
				{ key: 'surname', label: 'Apellido', class: 'text-center'},
				{ key: 'address', label: 'Direccion', class: 'text-center'},
				{ key: 'saldo', label: 'Saldo', class: 'text-center'},
				{ key: 'options', label: 'Opciones', class: 'text-center'},
			]
		},
		items() {
			let items = []
			this.clients_to_show.forEach(client => {
				items.push({
					name: client.name,
					surname: client.surname,
					address: client.address,
					saldo: this.price(client.saldo),
				})
			})
			return items
		},
		clients() {
			return this.$store.state.clients.clients
		},
		selected_seller() {
			return this.$store.state.sales.clients.selected_seller
		},
		clients_to_show() {
			let clients_to_show = null
			if (this.selected_seller === null) {
				clients_to_show = this.clients.filter(client => {
					return client.seller_id === null || client.seller_id === 0
				})
			} else {
				clients_to_show = this.clients.filter(client => {
					return client.seller_id == this.selected_seller.id
				})
			}
			if (this.search_query.length >= 3) {
				clients_to_show = clients_to_show.filter(client => {
					return client.name.toLowerCase().includes(this.search_query.toLowerCase())
				})
			}
			clients_to_show.sort((a, b) => (a.name > b.name) ? 1 : -1)
			clients_to_show = clients_to_show.slice(0, this.index_clients_to_show * 10)
			return clients_to_show
		},
		index_clients_to_show() {
			return this.$store.state.sales.clients.index_clients_to_show
		},
	},
	methods: {
		addClientsToShow() {
			this.$store.commit('sales/clients/incrementIndexClientsToShow')
		},
		editClient(client) {
			this.$store.commit('clients/setEdit', client)
			this.$bvModal.show('edit-client')
		},
		saldoInicial(client) {
			this.$store.commit('clients/setSaldoInicial', client)
			this.$bvModal.show('saldo-inicial-client')
		},
		deleteClient(client) {
			this.$store.commit('clients/setDelete', client)
			this.$bvModal.show('delete-client')
		}
	}
}
</script>