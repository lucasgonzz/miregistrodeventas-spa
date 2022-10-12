<template>
	<div id="produccion">
		<nav-component></nav-component>
		<budgets></budgets>
		<order-productions></order-productions>
		<recipes></recipes>
	</div>
</template>
<script>
import NavComponent from '@/components/produccion/components/Nav'
import Budgets from '@/components/produccion/components/budgets/Index'
import OrderProductions from '@/components/produccion/components/order-productions/Index'
import Recipes from '@/components/produccion/components/recipes/Index'
export default {
	components: {
		NavComponent,
		Budgets,
		OrderProductions,
		Recipes,
	},
}
</script>