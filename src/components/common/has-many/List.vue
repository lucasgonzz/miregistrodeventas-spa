<template>
	<display
	class="m-b-15"
	:model_name="model_name"></display>
</template>
<script>
import Display from '@/components/common/display/Index'
export default {
	props: {
		model_name: String,
	},
	components: {
		Display,
	},
}
</script>