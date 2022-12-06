<template>
	<b-dropdown
	right
	variant="primary"
	text="Nuevo Proveedor">
		<b-dropdown-item
		@click="setModel(null, 'provider')">
			<i class="icon-plus"></i>
			{{ create_model_name_spanish }}
		</b-dropdown-item>
		<b-dropdown-item
		v-b-modal="'import-provider'">
			<i class="icon-download"></i>
			Importar proveedores
		</b-dropdown-item>
	</b-dropdown>
</template>
<script>
import display from '@/mixins/display'
export default {
	mixins: [display],
	props: {
		create_model_name_spanish: String,
	},
}
</script>