<template>
<div>
	<client></client>
	<nav-component
	:show_planos="show_planos"></nav-component>
	<products></products>	
	<dates></dates>	
	<delivery-and-placement></delivery-and-placement>	
	<observations></observations>	
	<buttons></buttons>
</div>
</template>
<script>
import Client from '@/components/produccion/modals/budgets/data/Client'
import NavComponent from '@/components/produccion/modals/budgets/data/Nav'
import Products from '@/components/produccion/modals/budgets/data/products/Index'
import Dates from '@/components/produccion/modals/budgets/data/Dates'
import DeliveryAndPlacement from '@/components/produccion/modals/budgets/data/DeliveryAndPlacement'
import Observations from '@/components/produccion/modals/budgets/data/Observations'
import Buttons from '@/components/produccion/modals/budgets/data/buttons/Index'
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
	},
	components: {
		Client, 
		NavComponent,
		Products,
		Dates,
		DeliveryAndPlacement,
		Observations,
		Buttons,
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