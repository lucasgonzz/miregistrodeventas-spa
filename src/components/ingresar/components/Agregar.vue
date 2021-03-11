<template>
	<b-dropdown 
	variant="primary"
	right>
		<template v-slot:button-content>
			<i class="icon-plus"></i>
		</template>
		<b-dropdown-item
		v-if="!isProvider()"
		v-b-modal="'providers'">
			Proveedor
		</b-dropdown-item>
		<b-dropdown-item
		v-b-modal="'categories'">
			Categoria
		</b-dropdown-item>
		<b-dropdown-item
		v-b-modal="'special-prices'">
			Precio especial
		</b-dropdown-item>
	</b-dropdown>
</template>
<script>
export default {
	name: 'Agregar'
}
</script>