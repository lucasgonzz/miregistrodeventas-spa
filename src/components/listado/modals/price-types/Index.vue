<template>
<div>
	<model
	:modal_title="'Nuevo '+model_name_spanish"
	:model="model"
	:model_name="model_name"
	:text_delete="text_delete"
	:properties="properties"></model>
	<b-modal
	id="price-types"
	body-class="p-0"
	hide-footer
	title="Tipos de precios">

		<horizontal-nav
		set_view
		:items="items"></horizontal-nav>

		<display
		:display="display"
		:loading="loading"
		:models="to_show"
		:model_name="model_name"
		:properties="properties"></display>
	</b-modal>
</div>
</template>
<script>
import HorizontalNav from '@/components/common/horizontal-nav/Index'
import Display from '@/components/common/display/Index'
import Model from '@/components/common/model/Index'
export default {
	computed: {
		model_name() {
			return 'price_type'
		},
		model_name_spanish() {
			return 'tipo de precio'
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
				return 'el '+this.delete.name
			}
			return ''
		},
		items() {
			return [
				{
					name: 'Nuevo '+this.model_name_spanish,
					is_for_create: 'price_type'
				},
				{
					name: 'Lista',
				},
			] 
		},
		properties() {
			return require(`@/models/${this.model_name}`).default.properties 
		}
	},
	methods: {
		setDisplay(display) {
			this.$store.commit(this.model_name+'/setDisplay', display)
		},
	},
	components: {
		HorizontalNav,
		Display,
		Model,
	}
}
</script>