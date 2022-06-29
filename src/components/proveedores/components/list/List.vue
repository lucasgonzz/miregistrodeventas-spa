<template>
	<div>
		<div
		v-if="!loading">
			<b-table
			class="shadow-1 b-r-1"
			responsive
			head-variant="dark" 
			v-if="providers.length"
			striped
			:fields="fields"
			:items="items">
				<template #cell(options)="data">
					<b-button
					v-if="hasExtencion('providers') && can('providers.orders.create')"
					@click="providerOrder(providers[data.index])"
					size="sm"
					class="m-r-10"
					variant="primary">
						Hacer pedido
					</b-button>
					<b-button
					@click="editProvider(providers[data.index])"
					size="sm"
					class="m-r-10"
					variant="primary">
						<i class="icon-edit"></i>
					</b-button>
					<b-button
					@click="deleteProvider(providers[data.index])"
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
				No hay proveedores
			</p>
		</div>
		<div
		class="shadow-1 b-r-1"
		v-else>
			<b-skeleton-table
			:columns="3"
			:rows="10"></b-skeleton-table>
		</div>
	</div>
</template>
<script>
import provider_orders from '@/mixins/provider_orders'
export default {
	mixins: [provider_orders],
	computed: {
		fields() {
			return [
				{ key: 'name', label: 'Nombre' },
				{ key: 'address', label: 'Direccion' },
				{ key: 'options', label: 'Opciones' },
			]
		},
		items() {
			let items = []
			this.to_show.forEach(item => {
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
		editProvider(provider) {
			this.$store.commit('providers/setEdit', provider)
			this.$bvModal.show('edit-provider')
		},
		providerOrder(provider) {
			this.$store.commit('providers/orders/create/setOrder', null)
			this.$store.commit('providers/orders/create/setProvider', provider)
			this.$store.commit('providers/orders/create/setArticles', [])
			this.$bvModal.show('provider-order')
		}
	}
}
</script>