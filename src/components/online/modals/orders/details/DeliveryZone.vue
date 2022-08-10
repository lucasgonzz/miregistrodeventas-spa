<template>
	<p
	v-if="order_details.delivery_zone">
		Zona de envio:
		{{ order_details.delivery_zone.name }} ({{ price(order_details.delivery_zone.price) }})
	</p>
</template>
<script>
import orders from '@/mixins/orders'
export default {
	mixins: [orders],
}
</script>
