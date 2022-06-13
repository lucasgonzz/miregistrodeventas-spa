<template>
	<b-button
	class="m-t-10"
	v-if="edit_order"
	variant="danger"
	block
	@click="print">
		<i class="icon-print"></i>
		PDF
	</b-button>
</template>
<script>
import provider_orders from '@/mixins/provider_orders'
export default {
	mixins: [provider_orders],
	methods: {
		print(prices_list) {
			let link = process.env.VUE_APP_API_URL+'/provider-orders/pdf/'+this.edit_order.id
			window.open(link)
		}
	}
}
</script>