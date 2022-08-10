<template>
	<p
	v-if="order_details.cupon">
		Cupon  
		<span
		v-if="order_details.cupon.amount">
			de {{ price(order_details.cupon.amount) }}
		</span>
		<span
		v-if="order_details.cupon.percentage">
			del {{ order_details.cupon.percentage }}%
		</span>
	</p>
</b-modal>
</template>
<script>
import orders from '@/mixins/orders'
export default {
	mixins: [orders],
}
</script>
