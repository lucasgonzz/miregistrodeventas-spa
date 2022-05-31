<template>
	<div
	v-if="view == 'ordenes-de-produccion'">
	    <confirm
	    :text="text_delete"
	    :actions="['produccion/order_productions/delete']"
	    id="delete-order-production"
	    toast="Order de produccion eliminada"></confirm>
	    <order-production-details></order-production-details>
	    <update-status></update-status>
	    <b-row>
			<b-col
			cols="12"
			md="8">
				<budget-details></budget-details>
			</b-col>
			<b-col
			cols="12"
			md="8">
				<list></list>
			</b-col>
	    </b-row>
	</div>
</template>
<script>
import Confirm from '@/components/common/Confirm'
import OrderProductionDetails from '@/components/produccion/modals/order-productions/details/Index'
import UpdateStatus from '@/components/produccion/modals/order-productions/UpdateStatus'
import BudgetDetails from '@/components/produccion/modals/budgets/Details'
import List from '@/components/produccion/components/order-productions/List'
export default {
	components: {
		Confirm,
		BudgetDetails,
		OrderProductionDetails,
		UpdateStatus,
		List,
	},
	computed: { 
		text_delete() {
			return '¿Seguro que quiere eliminar esta Orden de Produccion?'
		}
	}
}
</script>