<template>
	<p>
		<span v-if="order_details.deliver == 1">
			Para enviar a 
			<b-button
			size="sm"
			@click="showMap(order_details.address)"
			variant="primary">{{ getAddress(order_details.address) }}</b-button> 
		</span>
		<span v-else>
			Para retirar
		</span>
	</p>
</template>
<script>
import online from '@/mixins/online'
import orders from '@/mixins/orders'
export default {
	mixins: [online, orders],
}
</script>
