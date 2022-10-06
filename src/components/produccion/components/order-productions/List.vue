<template>
	<div
	class="w-100">
		<previus-days
		model_name="order_production"
		:model_name_spanish="model_name_spanish"></previus-days>

		<display
		:display="display"
		:loading="loading"
		:models="to_show"
		:model_name="model_name"
		:properties="properties"
		:model_name_spanish="model_name_spanish"></display>
	</div>
</template>
<script>
import PreviusDays from '@/components/common/previus-days/Index'
import Display from '@/components/common/display/Index'
export default {
	computed: {
		model_name() {
			return 'order_production'
		},
		model_name_spanish() {
			return 'Ordenes de produccion'
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
	components: {
		PreviusDays,
		Display,
	}
}
</script>