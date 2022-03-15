<template>
<b-modal 
id="conditions" 
title="Condiciones" 
body-class="p-0"
size="lg"
hide-footer>
	<div class="p-15">
		<b-button
		block
		v-b-modal="'create-condition'"
		variant="primary">
			<i class="icon-plus"></i>
			Agregar condicion
		</b-button>
	</div>
	<list></list>
</b-modal>
</template>
<script>
import List from '@/components/ingresar/modals/conditions/List'
export default {
	components: {
		List,
	}
}
</script>