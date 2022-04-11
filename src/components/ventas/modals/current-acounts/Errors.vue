<template>
	<div
	class="p-l-15"
	v-if="client.errors.length">
		<p
		class="text-danger"
		v-for="error in client.errors">
			{{ error.text }}
			<span
			class="btn btn-danger btn-sm m-l-15">
				<i class="icon-trash"></i>
			</span>
		</p>
	</div>
</template>
<script>
import current_acounts from '@/mixins/current_acounts' 
export default {
	mixins: [current_acounts],
}
</script>