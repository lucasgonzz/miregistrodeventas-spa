<template>
	<div 
	class="j-end">
		<b-button
		@click="create(model_name)"
		variant="primary">
			Nuevo {{ singular(model_name) }}
		</b-button>
	</div>
</template>
<script>
import display from '@/mixins/display'
export default {
	mixins: [display],
	props: {
		model_name: String,
	},
}
</script>