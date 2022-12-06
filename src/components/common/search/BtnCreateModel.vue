<template>
	<div>
    	<model
    	:model_name="model_name"></model>
		<b-button
		@click="setModel(null, model_name)"
		size="sm"
		class="m-t-15"
		variant="outline-primary"> 
			<i class="icon-plus"></i>
			{{ singular(model_name) }}
		</b-button>
	</div>
</template>
<script>
import Model from '@/components/common/model/Index'

import display from '@/mixins/display'
export default {
	mixins: [display],
	components: {
		Model,
	},
	props: {
		model_name: String,
	},
}
</script>