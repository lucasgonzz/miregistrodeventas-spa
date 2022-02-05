<template>
	<b-dropdown 
	variant="primary"
	right>
		<template v-slot:button-content>
			<i class="icon-plus"></i>
		</template>
		<b-dropdown-item
		v-b-modal="'providers'">
			Proveedores
		</b-dropdown-item>
		<b-dropdown-item
		v-b-modal="'categories'">
			Categorias
		</b-dropdown-item>
		<b-dropdown-item
		v-b-modal="'brands'">
			Marcas
		</b-dropdown-item>
		<b-dropdown-item
		v-b-modal="'special-prices'">
			Precios especiales
		</b-dropdown-item>
	</b-dropdown>
</template>
<script>
export default {
	name: 'Agregar'
}
</script>