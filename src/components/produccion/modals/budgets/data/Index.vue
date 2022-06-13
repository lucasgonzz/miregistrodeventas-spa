<template>
<div>
	<client
	:edit="edit"
	:budget="budget"></client>
	<nav-component
	:show_btn="show_btn"
	:show_planos="show_planos"></nav-component>
	<products
	:show_btn_delete="show_btn_delete"
	:show_btn_production="show_btn_production"
	:edit="edit"
	:budget="budget"></products>	
	<dates
	:edit="edit"
	:budget="budget"></dates>	
	<delivery-and-placement
	:edit="edit"
	:budget="budget"></delivery-and-placement>	
	<observations
	:edit="edit"
	:budget="budget"></observations>	
</div>
</template>
<script>
import Client from '@/components/produccion/modals/budgets/data/Client'
import NavComponent from '@/components/produccion/modals/budgets/data/Nav'
import Products from '@/components/produccion/modals/budgets/data/products/Index'
import Dates from '@/components/produccion/modals/budgets/data/Dates'
import DeliveryAndPlacement from '@/components/produccion/modals/budgets/data/DeliveryAndPlacement'
import Observations from '@/components/produccion/modals/budgets/data/Observations'
export default {
	props: {
		show_btn: {
			type: Boolean,
			default: true,
		},
		show_planos: {
			type: Boolean,
			default: false,
		},
		edit: {
			type: Boolean,
			default: true,
		},
		budget: {
			type: Object,
		},
		show_btn_delete: {
			type: Boolean,
			default: true,
		},
		show_btn_production: {
			type: Boolean,
			default: false,
		},
	},
	components: {
		Client, 
		NavComponent,
		Products,
		Dates,
		DeliveryAndPlacement,
		Observations,
	},
	computed: {
		items() {
			let items = []
			items.push({name: 'productos'})
			items.push({name: 'fechas'})
			items.push({name: 'observaciones'})
			return items
		}
	}
}
</script>