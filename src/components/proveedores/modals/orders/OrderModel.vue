<template>

	<model
	show_btn_pdf
	:modal_title="'Nuevo '+model_name_spanish"
	:model="model"
	size="xl"
	:model_name="model_name"
	:text_delete="text_delete"
	:properties="properties" />
		
</template>
<script>
import Model from '@/components/common/model/Index'
export default {
	computed: {
		model_name() {
			return 'provider_order'
		},
		model_name_spanish() {
			return 'pedido'
		},
		create_model_name_spanish() {
			return 'Nuevo pedido'
		},
		model() {
			return this.$store.state[this.model_name].model
		},
		delete() {
			return this.$store.state[this.model_name].delete
		},
		text_delete() {
			if (this.delete) {
				return 'el pedido'
			}
			return ''
		},
		properties() {
			return require(`@/models/${this.model_name}`).default.properties 
		}
	},
	components: {
		Model,
	}
}
</script>