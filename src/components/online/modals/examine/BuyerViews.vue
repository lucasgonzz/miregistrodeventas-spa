<template>
	<b-modal
	hide-footer
	title="Datos del usuario"
	id="buyer-views">
		<b-table
		:items="items"
		:fields="fields">
		</b-table>
	</b-modal>
</template>
<script>
import mixin from '@/mixins/online'
export default {
	mixins: [mixin],
	computed: {
		buyer() {
			return this.$store.state.online.examine.buyer_views
		},
		fields() {
			return [
				{ key: 'name', label: 'Nombre' },
				{ key: 'surname', label: 'Apellido' },
				{ key: 'phone', label: 'Telefono' },
				{ key: 'address', label: 'Direccion' },
				{ key: 'address_number', label: 'Numero' },
			]
		},
		items() {
			let items = []
			items.push({
				'name': this.buyer.name,
				'surname': this.buyer.surname,
				'phone': this.buyer.phone,
				'address': this.buyer.address,
				'address_number': this.buyer.address_number,
			})
			return items
		},
	},
	methods: {
		showBuyer(buyer) {
			this.$store.commit('online/examine/setBuyerViews', buyer)
			this.$bvModal.show('buyer')
		}
	}
}
</script>