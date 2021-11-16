<template>
<b-modal 
id="providers" 
title="Proveedores" 
body-class="p-0"
hide-footer>
	<div class="p-15">
		<b-button
		block
		variant="primary"
		v-b-modal="'create-provider'">
			<i class="icon-plus"></i>
			Nuevo proveedor
		</b-button>
	</div>
	<list></list>
</b-modal>
</template>
<script>
import List from '@/components/ingresar/modals/providers/List'
export default {
	components: {
		List,
	},
}
</script>