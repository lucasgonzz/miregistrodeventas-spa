<template>
	<div
	class="w-100">
		<previus-days
		v-if="show_previus_days"
		:model_name="model_name"
		:model_name_spanish="model_name_spanish"></previus-days>

		<display
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
	props: {
		model_name: String,
		model_name_spanish: String,
		show_previus_days: Boolean,
	},
	computed: {
		to_show() {
			return this.$store.state[this.model_name].to_show
		},
		models() {
			return this.$store.state[this.model_name].models
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