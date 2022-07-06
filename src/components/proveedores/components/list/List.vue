<template>
	<div>
		<div
		v-if="!loading">
			<b-table
			class="shadow-1 b-r-1"
			responsive
			head-variant="dark" 
			v-if="items.length"
			striped
			:fields="fields"
			:items="items">
				<template #cell(options)="data">
					<b-dropdown 
					variant="primary">
						<template 
						#button-content>
							<i class="icon-dots"></i>
						</template>
						<b-dropdown-item 
						v-if="hasExtencion('providers') && can('providers.orders.create')"
						@click="providerOrder(providers[data.index])">
							<i class="icon-plus"></i>
							Hacer pedido
						</b-dropdown-item>
						<b-dropdown-item 
						@click="editProvider(providers[data.index])">
							<i class="icon-edit"></i>
							Editar
						</b-dropdown-item>
						<b-dropdown-item 
						@click="deleteProvider(providers[data.index])">
							<i class="icon-trash"></i>
							Eliminar
						</b-dropdown-item>
					</b-dropdown>
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
				{ key: 'phone', label: 'Telefono' },
				{ key: 'address', label: 'Direccion' },
				{ key: 'razon_social', label: 'Razon social' },
				{ key: 'options', label: 'Opciones' },
			]
		},
		items() {
			let items = []
			this.to_show.forEach(item => {
				items.push({
					name: item.name,
					phone: item.phone,
					address: item.address,
					razon_social: item.razon_social,
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
			this.$store.commit('providers/setModel', provider)
			this.$bvModal.show('provider')
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