<template>
<div>
	
	<model
	:model_name="model_name"></model>	

	<b-modal
	hide-footer
	:title="plural(model_name)"
	size="lg"
	:id="model_name">
		<nav-component
		:model_name="model_name"></nav-component>

		<list
		:model_name="model_name"></list>

		<footer-component
		:model_name="model_name"></footer-component>
	</b-modal>
</div>
</template>
<script>
import Model from '@/components/common/model/Index'
import NavComponent from '@/components/common/has-many/NavComponent'
import List from '@/components/common/has-many/List'
import FooterComponent from '@/components/common/has-many/FooterComponent'
export default {
	components: {
		Model,
		NavComponent,
		List,
		FooterComponent,
	},
	props: {
		model_name: String,
	}
}
</script>