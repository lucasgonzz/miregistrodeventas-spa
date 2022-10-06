<template>
	<div>
	    <confirm
	    :text="text_delete"
	    :actions="['delivery_zones/delete']"
	    id="delete-delivery-zone"
	    toast="Zona de envio eliminada"></confirm>
	    <delivery-zone></delivery-zone>
		<b-card
		class="shadow b-r-1 m-b-25"
		title="Zonas de Envio">
			<b-table
			class="shadow-2 b-r-1 m-b-15"
			responsive
			head-variant="dark" 
			v-if="delivery_zones.length"
			striped
			:fields="fields"
			:items="items">
				<template #cell(options)="data">
					<b-button
					class="m-r-10"
					@click="edit(delivery_zones[data.index])"
					size="sm"
					variant="primary">
						<i class="icon-edit"></i>
					</b-button>
					<b-button
					@click="deleteModel(delivery_zones[data.index])"
					size="sm"
					variant="danger">
						<i class="icon-trash"></i>
					</b-button>
				</template>
			</b-table>
			<p
			class="text-with-icon"
			v-else>
				<i class="icon-eye-slash"></i>
				No hay zonas de envio
			</p>
			<div 
			class="j-start m-t-20">
				<b-button
				variant="primary"
				block
				@click="addModel">
					<i class="icon-plus"></i>
					Nueva zona de envio
				</b-button>
			</div>
		</b-card>
	</div>
</template>
<script>
import Confirm from '@/components/common/Confirm'
import DeliveryZone from '@/components/configuration/modals/online/DeliveryZone'
export default {
	components: {
		Confirm,
		DeliveryZone,
	},
	computed: {
		delete() {
			return this.$store.state.delivery_zones.delete
		},
		text_delete() {
			if (this.delete) {
				return '¿Seguro que quiere eliminiar la zona de envio '+this.delete.name+'?'
			}
		},
		delivery_zones() {
			return this.$store.state.delivery_zones.models
		},
		fields() {
			return [
				{ key: 'name', label: 'Nombre', class: 'text-center' },
				{ key: 'description', label: 'Descripcion', class: 'text-center' },
				{ key: 'price', label: 'Precio', class: 'text-center' },
				{ key: 'options', label: '' },
			]
		},
		items() {
			let items = []
			this.delivery_zones.forEach(item => {
				items.push({
					name: item.name,
					description: item.description,
					price: this.price(item.price),
				})
			})
			return items
		}
	},
	methods: {
		addModel() {
			this.$store.commit('delivery_zones/setModel', null)
			this.$bvModal.show('delivery-zone')
		},
		edit(item) {
			console.log(item)
			this.$store.commit('delivery_zones/setModel', item)
			this.$bvModal.show('delivery-zone')
		},
		deleteModel(item) {
			this.$store.commit('delivery_zones/setDelete', item)
			this.$bvModal.show('delete-delivery-zone')
		}
	}
}
</script>