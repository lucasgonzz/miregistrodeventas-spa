<template>
	<div class="p-15">
		<p>
			Remito N° {{ sale_details.num_sale }}
		</p>
		<p>
			Total: {{ getTotalSale(sale_details) }}
		</p>
		<client-info
		v-if="sale_details.client"
		:client="sale_details.client"></client-info>
	</div>
</template>
<script>
import ClientInfo from '@/components/common/ClientInfo'
import sales from '@/mixins/sales'
export default {
	mixins: [sales],
	components: {
		ClientInfo,
	},
}
</script>