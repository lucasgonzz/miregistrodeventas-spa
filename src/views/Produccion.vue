<template>
	<div id="produccion">
		<nav-component></nav-component>
		<budgets></budgets>
		<order-productions></order-productions>
	</div>
</template>
<script>
import NavComponent from '@/components/produccion/components/Nav'
import Budgets from '@/components/produccion/components/budgets/Index'
import OrderProductions from '@/components/produccion/components/order-productions/Index'
export default {
	components: {
		NavComponent,
		Budgets,
		OrderProductions,
	},
}
</script>