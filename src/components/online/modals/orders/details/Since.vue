<template>
	<p>
		{{ since(order_details.created_at, true) }}
	</p>
</template>
<script>
import orders from '@/mixins/orders'
export default {
	mixins: [orders]
}
</script>