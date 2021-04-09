<template>
	<div>
		<unconfirmed-order-details></unconfirmed-order-details>
		<confirmed-finished-order-details></confirmed-finished-order-details>
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
import UnconfirmedOrderDetails from '@/components/online/modals/orders/UnconfirmedOrderDetails' 
import ConfirmedFinishedOrderDetails from '@/components/online/modals/orders/ConfirmedFinishedOrderDetails'
export default {
	components: {
		UnconfirmedOrders,
		ConfirmedFinishedOrders,
		UnconfirmedOrderDetails,
		ConfirmedFinishedOrderDetails,
	},
}
</script>