<template>
	<div class="p-15">
		<p
		class="m-0">
			<strong>
				Total: {{ getTotalSale(sale_details).total }}
			</strong>
		</p>
		<client-info
		class="m-t-15"
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