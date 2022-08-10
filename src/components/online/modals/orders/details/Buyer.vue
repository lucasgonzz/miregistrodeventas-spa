<template>
	<div
	v-if="order_details.buyer">
		<div>
			<b-button
			class="m-b-15"
			@click="sendMessage(order_details.buyer)"
			variant="primary">
				<i class="icon-message"></i>
				{{ order_details.buyer.name }}
			</b-button>
		</div>

		<b-button 
        variant="success"
		class="m-b-15"
        target="_blank"
        :href="'https://api.whatsapp.com/send?phone='+order_details.buyer.phone">
            <i class="icon-whatsapp"></i> 
			{{ order_details.buyer.name }}
        </b-button>
	</div>
</b-modal>
</template>
<script>
import online from '@/mixins/online'
import orders from '@/mixins/orders'
export default {
	mixins: [online, orders],
}
</script>
