<template>
<b-modal id="cancel-order" title="Cancelar pedido" hide-footer>
	<b-form-group
	label="Razon de cancelar el pedido">
		<b-form-textarea
		placeholder="Ingresa la razon por la cual no podes cumplir con el pedido"
		v-model="order.description"></b-form-textarea>
	</b-form-group>
	<b-form-group>
		<b-button
		@click="cancel"
		block
		variant="danger">
			<btn-loader
			text="Cancelar Pedido"
			:loader="loading">
			</btn-loader>
		</b-button>
	</b-form-group>
</b-modal>
</template>
<script>
import Mixin from '@/mixins/online'
import BtnLoader from '@/components/common/BtnLoader'
export default {
	components: {
		BtnLoader
	},
	mixins: [Mixin],
	data() {
		return {
			loading: false,
		}
	},
	computed: {
		order() {
			return this.$store.state.online.orders.unconfirmed_order_details
		}
	},
	methods: {
		cancel() {
			this.loading = true
			this.$api.put(`/orders/cancel`, this.order)
			.then(() => {
				this.$toast.success('Pedido cancelado')
				this.loading = false
				this.getOrders()
				this.$bvModal.hide('cancel-order')
				this.$bvModal.hide('unconfirmed-order-details')
			})
			.catch(err => {
				this.$toast.error('Error al cancelar pedido')
				this.loading = false
				console.log(err)
			})
		}
	}
}
</script>