<template>
<div>

	<model
	:model_name="model_name"></model>

	<b-modal
	:id="modelPlural(model_name)"
	:title="plural(model_name)"
	hide-footer>
 
		<btn-create
		:model_name="model_name"></btn-create>

		<display
		:model_name="model_name"></display>

	</b-modal>

</div>
</template>
<script>
import Model from '@/components/common/model/Index'
import BtnCreate from '@/components/common/BtnCreate'
import Display from '@/components/common/display/Index'
export default {
	computed: {
		model_name() {
			return 'combo'
		},
	},
	components: {
		Model,
		BtnCreate,
		Display,
	}
}
</script>