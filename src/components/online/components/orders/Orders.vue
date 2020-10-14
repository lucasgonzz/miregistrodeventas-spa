<template>
	<div>
		<unconfirmed-order-details
		@updateOrders="updateOrders"
		:order="order"></unconfirmed-order-details>
		<confirmed-finished-order-details
		@getConfirmedFinishedOrders="getConfirmedFinishedOrders"
		:order="order"></confirmed-finished-order-details>
		<b-row>
			<b-col
			cols="12">
				<unconfirmed-orders
				ref="unconfirmedOrders"
				@setOrder="setOrder"></unconfirmed-orders>
			</b-col>
		</b-row>
		<b-row>
			<b-col
			cols="12">
				<confirmed-finished-orders
				ref="confirmedFinishedOrders"
				@setOrder="setOrder"></confirmed-finished-orders>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import UnconfirmedOrders from '@/components/online/components/orders/UnconfirmedOrders'
import ConfirmedFinishedOrders from '@/components/online/components/orders/ConfirmedFinishedOrders'
import UnconfirmedOrderDetails from '@/components/online/modals/orders/UnconfirmedOrderDetails' 
import ConfirmedFinishedOrderDetails from '@/components/online/modals/orders/ConfirmedFinishedOrderDetails'
export default {
	components: {
		UnconfirmedOrders,
		ConfirmedFinishedOrders,
		UnconfirmedOrderDetails,
		ConfirmedFinishedOrderDetails,
	},
	data() {
		return {
			order: {}
		}
	},
	methods: {
		setOrder(order) {
			this.order = order
		},
		updateOrders() {
			this.$store.dispatch('online/getUnconfirmedOrders')
			this.$refs.confirmedFinishedOrders.getOrders()
		},
		getConfirmedFinishedOrders() {
			this.$refs.confirmedFinishedOrders.getOrders()
		}
	}
}
</script>