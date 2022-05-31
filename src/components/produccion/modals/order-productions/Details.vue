<template>
<b-modal
v-if="order_production"
size="lg"
title="Detalles de Orden de Produccion"
id="order-production-details"
hide-footer>
	<step-progress 
	:steps="mySteps" 
	:current-step="currentStep" 
	:passive-thickness="4"
	:active-color="variant_color"
	icon-class="icon-check"></step-progress>
	<b-button
	class="m-t-15"
	variant="primary"
	v-b-modal="'update-status'">
		Actualizar estado 
	</b-button>
	<hr>
	<budget-data
	:edit="false"
	:budget="order_production.budget"
	:show_planos="true"
	:show_btn_delete="false"></budget-data>
	<pdf-info></pdf-info>
	<b-button
	block
	variant="danger"
	@click="setDelete()">
		Eliminar
	</b-button>
</b-modal>
</template>
<script>
import budgets from '@/mixins/budgets'
import order_productions from '@/mixins/order_productions'
import StepProgress from 'vue-step-progress'
import 'vue-step-progress/dist/main.css'
import BudgetData from '@/components/produccion/modals/budgets/data/Index'
import PdfInfo from '@/components/produccion/modals/order-productions/Pdf'
import BtnLoader from '@/components/common/BtnLoader'
import ProductsList from '@/components/produccion/modals/budgets/data/products/List'
export default {
	mixins: [budgets, order_productions],
	components: {
		StepProgress,
		BudgetData,
		PdfInfo,
		BtnLoader,
		ProductsList,
	},
	computed: {
		order_production() {
			return this.$store.state.produccion.order_productions.edit
		},
		mySteps() {
			let items = []
			this.statuses().forEach(item => {
				items.push(item.name)
			})
			return items
		},
		currentStep() {
			return this.statuses().findIndex(status => {
				return status.id == this.order_production.order_production_status_id
			})
		}
	},
	methods: {
		setDelete() {
			this.$store.commit('produccion/order_productions/setDelete', this.order_production)
			this.$bvModal.show('delete-order-production')
			this.$bvModal.hide('order-production-details')
		}
	}
}
</script>
<style lang="sass">
.step-progress__wrapper
	width: 80%
	.step-progress__step--valid .step-progress__step-icon
		transform: translate3d(-50%,-40%,0)
</style>