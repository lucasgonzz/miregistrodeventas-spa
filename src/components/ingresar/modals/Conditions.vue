<template>
<div>

	<model
	:modal_title="create_model_name_spanish"
	:model="model"
	:model_name="model_name"
	:text_delete="text_delete"
	:properties="properties"></model>

	<b-modal
	:id="modelPlural(model_name)"
	:title="model_name_spanish"
	hide-footer>

		<btn-create
		:text="create_model_name_spanish"
		:model_name="model_name"></btn-create>

		<display
		:display="display"
		:loading="loading"
		:models="to_show"
		:model_name="model_name"
		:properties="properties"
		:model_name_spanish="model_name_spanish"></display>

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
			return 'condition'
		},
		model_name_spanish() {
			return 'condiciones'
		},
		create_model_name_spanish() {
			return 'Nueva condicion'
		},
		display() {
			return this.$store.state[this.model_name].display
		},
		loading() {
			return this.$store.state[this.model_name].loading
		},
		to_show() {
			return this.$store.state[this.model_name].to_show
		},
		models() {
			return this.$store.state[this.model_name].models
		},
		model() {
			return this.$store.state[this.model_name].model
		},
		delete() {
			return this.$store.state[this.model_name].delete
		},
		text_delete() {
			if (this.delete) {
				return 'la condicion '+this.delete.name
			}
			return ''
		},
		properties() {
			return require(`@/models/${this.model_name}`).default.properties 
		},
	},
	methods: {
		setDisplay(display) {
			this.$store.commit(this.model_name+'/setDisplay', display)
		},
	},
	components: {
		Model,
		BtnCreate,
		Display,
	}
}
</script>