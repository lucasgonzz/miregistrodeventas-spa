<template>
	<div
	v-show="view == 'pedidos'">
		<order-details></order-details>
		<payment></payment>
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
import OrderDetails from '@/components/online/modals/orders/details/Index'
import Payment from '@/components/online/modals/orders/payment/Index'

import UnconfirmedOrders from '@/components/online/components/orders/UnconfirmedOrders'
import ConfirmedFinishedOrders from '@/components/online/components/orders/ConfirmedFinishedOrders'
import online from '@/mixins/online'
export default {
	mixins: [online],
	components: {
		OrderDetails,
		Payment,
		
		UnconfirmedOrders,
		ConfirmedFinishedOrders,
	},
}
</script>