<template>
	<b-alert
	class="m-l-15 m-r-15"
	show
	v-if="unconfirmed_orders_questions_length >= 1"
	variant="danger">
		<h4 class="m-0">
			Hay pedidos
		</h4>
	</b-alert>
</template>
<script>
import nav from '@/mixins/nav'
export default {
	mixins: [nav],
}
</script>