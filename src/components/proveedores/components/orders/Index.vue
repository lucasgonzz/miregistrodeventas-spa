<template>
<div
v-if="view == 'pedidos'">
	<b-row> 
		<b-col>
			<nav-component></nav-component>
			<list></list>
		</b-col>
	</b-row>
</div>
</template>
<script>
import NavComponent from '@/components/proveedores/components/orders/Nav'
import List from '@/components/proveedores/components/orders/List'
export default {
	components: {
		NavComponent,
		List,
	},
}
</script>
<style scoped lang="sass">
</style> 