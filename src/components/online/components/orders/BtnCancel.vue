<template>
	<b-button
	v-if="model.order_status.name != 'cancelado'"
	v-b-modal="'cancel-order'"
	block
	variant="danger">
		Cancelar pedido
	</b-button>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader2'

import online from '@/mixins/online'
import orders from '@/mixins/orders'
export default {
	components: {
		BtnLoader,
	},
	props: {
		model: Object,
	},
	mixins: [online, orders],
	data() {
		return {
			loading: false,
		}
	},
}
</script>
