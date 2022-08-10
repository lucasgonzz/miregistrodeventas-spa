<template>
	<p
	v-if="order_details.description">
		{{ user.order_description }}: {{ order_details.description }}
	</p>
</template>
<script>
import orders from '@/mixins/orders'
export default {
	mixins: [orders],
}
</script>
