<template>
	<b-button
	class="m-l-15"
	@click="sendMessage(model)"
	variant="primary">
		<i class="icon-message"></i>
	</b-button>
</template>
<script>
import online from '@/mixins/online'
export default {
	mixins: [online],
	props: {
		model: Object,
	},
}
</script>