<template>
	<div
	v-if="view == 'ordenes-de-produccion'">
		<order-production-status></order-production-status>

		<view-component 
		model_name="order_production"
		model_name_spanish="Ordenes de produccion"
		create_model_name_spanish="Nueva orden de produccion"
		check_can_create>
			<template #modal_buttons>
				<modal-buttons></modal-buttons>
			</template>

			<template #horizontal_nav_buttons>
				<b-button
				class="m-l-15"
				variant="primary"
				v-b-modal="'order_production_statuses'">
					Estados
				</b-button>
			</template>
		</view-component>
	</div>
</template>
<script>
import ViewComponent from '@/components/common/view/Index'
import ModalButtons from '@/components/produccion/components/order-productions/ModalButtons'
import OrderProductionStatus from '@/components/produccion/components/order-productions/OrderProductionStatus'
export default {
	components: {
		ViewComponent,
		ModalButtons,
		OrderProductionStatus,
	},
}
</script>