<template>
	<b-button
	v-if="order_details.status == 'unconfirmed'"
	block
	@click="confirm"
	variant="primary">
		<btn-loader
		text="Confirmar Pedido"
		:loader="loading">
		</btn-loader>
	</b-button>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'

import online from '@/mixins/online'
import orders from '@/mixins/orders'
export default {
	components: {
		BtnLoader,
	},
	mixins: [online, orders],
	data() {
		return {
			loading: false,
		}
	},
	methods: {
		confirm() {
			this.loading = true
			this.$api.get(`/orders/confirm/${this.order_details.id}`)
			.then(() => {
				this.loading = false
				this.getOrders()
				this.$store.dispatch('online/messages/getMessages', this.order_details.buyer_id)
				this.$bvModal.hide('order-details')
			})
			.catch(err => {
				this.loading = false
				console.log(err)
			})
		},
	}
}
</script>
