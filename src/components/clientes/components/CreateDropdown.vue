<template>
	<b-dropdown
	right
	variant="primary"
	text="Nuevo Cliente">
		<b-dropdown-item
		@click="setModel(null, 'client')">
			<i class="icon-plus"></i>
			Crear cliente
		</b-dropdown-item>
		<b-dropdown-item
		v-b-modal="'import-clients'">
			<i class="icon-download"></i>
			Importar clientes
		</b-dropdown-item>
	</b-dropdown>
</template>
<script>
import display from '@/mixins/display'
export default {
	mixins: [display],
}
</script>