<template>
<b-row>
	<b-col
	cols="12">
		<step-progress 
		:steps="mySteps" 
		:current-step="currentStep" 
		:passive-thickness="4"
		:active-color="variant_color"
		icon-class="icon-check"></step-progress>
	</b-col>
	<b-col
	cols="12">
		<b-button
		class="m-t-20"
		variant="primary"
		v-b-modal="'update-status'">
			Actualizar estado 
		</b-button>
	</b-col>
</b-row>
</template>
<script>
import budgets from '@/mixins/budgets'
import order_productions from '@/mixins/order_productions'
import StepProgress from 'vue-step-progress'
import 'vue-step-progress/dist/main.css'
export default {
	mixins: [budgets, order_productions],
	components: {
		StepProgress,
	},
	computed: {
		mySteps() {
			let items = []
			this.statuses.forEach(item => {
				items.push(item.name)
			})
			return items
		},
		currentStep() {
			return this.statuses.findIndex(status => {
				return status.id == this.edit.order_production_status_id
			})
		}
	},
}
</script>
<style lang="sass">
.step-progress__wrapper
	width: 80%
	.step-progress__step--valid .step-progress__step-icon
		transform: translate3d(-50%,-40%,0)
</style>