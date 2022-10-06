<template>
<div>
	<model
	:modal_title="'Nuevo '+model_name_spanish"
	:model="model"
	:model_name="model_name"
	:text_delete="text_delete"
	:properties="properties"></model>
	
    <b-modal
    id="sellers"
    title="Vendedores"
    hide-footer>

    	<btn-create
    	:model_name="model_name"
    	:text="'Nuevo '+model_name_spanish"></btn-create>

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
import HorizontalNav from '@/components/common/horizontal-nav/Index'
import Display from '@/components/common/display/Index'
import BtnCreate from '@/components/common/BtnCreate'
import Model from '@/components/common/model/Index'
export default {
	computed: {
		model_name() {
			return 'seller'
		},
		model_name_spanish() {
			return 'vendedor'
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
		BtnCreate,
		Model,
	}
}
</script>