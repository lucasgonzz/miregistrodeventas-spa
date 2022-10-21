<template>
	<div id="produccion">
		<nav-component></nav-component>
		<order-productions></order-productions>
		<recipes></recipes>
	</div>
</template>
<script>
import NavComponent from '@/components/produccion/components/Nav'
import OrderProductions from '@/components/produccion/components/order-productions/Index'
import Recipes from '@/components/produccion/components/recipes/Index'
export default {
	components: {
		NavComponent,
		OrderProductions,
		Recipes,
	},
}
</script>