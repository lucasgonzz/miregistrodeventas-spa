<template>
<b-modal 
id="brands" 
title="Marcas" 
body-class="p-0"
hide-footer>
	<div class="p-15">
		<b-button
		block
		v-b-modal="'create-brand'"
		variant="primary">
			<i class="icon-plus"></i>
			Agregar marca
		</b-button>
	</div>
	<list></list>
</b-modal>
</template>
<script>
import List from '@/components/ingresar/modals/brands/List'
export default {
	components: {
		List,
	}
}
</script>