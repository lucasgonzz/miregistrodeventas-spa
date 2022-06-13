<template>
<div id="proveedores">
	<order></order>

	<nav-component></nav-component>
	<list></list>
	<orders></orders>
</div>
</template>
<script>
import Order from '@/components/proveedores/modals/orders/create/Index'

import NavComponent from '@/components/proveedores/components/Nav'
import List from '@/components/proveedores/components/list/Index'
import Orders from '@/components/proveedores/components/orders/Index'
export default {
	components: {
		Order,
		
		NavComponent,
		List,
		Orders,
	},
}
</script>
<style scoped lang="sass">
</style>