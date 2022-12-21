<template>
<div id="proveedores">
	<!-- <order></order> -->
	<order-model></order-model>

	<nav-component></nav-component>

	<providers></providers>

	<orders></orders>
</div>
</template>
<script>
import OrderModel from '@/components/proveedores/modals/orders/OrderModel'

import NavComponent from '@/components/proveedores/components/Nav'
import Providers from '@/components/proveedores/components/providers/Index'
import Orders from '@/components/proveedores/components/orders/Index'
export default {
	components: {
		OrderModel,

		NavComponent,
		Providers,
		Orders,
	},
}
</script>
<style scoped lang="sass">
</style>