<template>
	<div>
		<p>
			Total: {{ price(total(order_details, false, false)) }}
		</p>
		<p
		v-if="order_details.cupon">
			Menos el cupon: {{ price(total(order_details, true, false)) }}
		</p>
		<p
		v-if="order_details.delivery_zone">
			Con envio: {{ price(total(order_details, true, true)) }}
		</p>
	</div>
</template>
<script>
import online from '@/mixins/online'
import orders from '@/mixins/orders'
export default {
	mixins: [online, orders],
}
</script>
