<template>
	<div
	v-show="view == 'pedidos'">
		<order-details></order-details>
		<b-row>
			<b-col
			cols="12">
				<unconfirmed-orders></unconfirmed-orders>
			</b-col>
		</b-row>
		<b-row>
			<b-col
			cols="12">
				<confirmed-finished-orders></confirmed-finished-orders>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import UnconfirmedOrders from '@/components/online/components/orders/UnconfirmedOrders'
import ConfirmedFinishedOrders from '@/components/online/components/orders/ConfirmedFinishedOrders'
import OrderDetails from '@/components/online/modals/orders/OrderDetails' 
import online from '@/mixins/online'
export default {
	mixins: [online],
	components: {
		UnconfirmedOrders,
		ConfirmedFinishedOrders,
		OrderDetails,
	},
}
</script>