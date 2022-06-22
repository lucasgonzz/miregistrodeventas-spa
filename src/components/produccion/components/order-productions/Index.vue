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
	    <product-delivery></product-delivery>
	    <product-article-stock></product-article-stock>
	    <print></print>
		<create-budget></create-budget>
	    <b-row>
			<!-- <b-col
			cols="12"
			md="8">
				<budget-details></budget-details>
			</b-col> -->
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
import ProductDelivery from '@/components/produccion/modals/order-productions/product-delivery/Index'
import ProductArticleStock from '@/components/produccion/modals/order-productions/product-article-stock/Index' 
import CreateBudget from '@/components/produccion/modals/budgets/Create'
import Print from '@/components/produccion/modals/budgets/Print'

import List from '@/components/produccion/components/order-productions/List'
export default {
	components: {
		Confirm,
		CreateBudget,
		OrderProductionDetails,
		UpdateStatus,
		ProductDelivery,
		ProductArticleStock,
		Print,

		List,
	},
	computed: { 
		text_delete() {
			return '¿Seguro que quiere eliminar esta Orden de Produccion?'
		}
	}
}
</script>