<template>
<b-modal 
id="special-prices" 
title="Precios Especiales" 
body-class="p-0"
hide-footer>
	<div class="p-15">
		<b-button
		block
		variant="primary"
		v-b-modal="'create-special-price'">
			<i class="icon-plus"></i>
			Nuevo precio especial
		</b-button>
	</div>
	<list></list>
</b-modal>
</template>
<script>
import List from '@/components/ingresar/modals/special-prices/List'
export default {
	components: {
		List,
	},
}
</script>