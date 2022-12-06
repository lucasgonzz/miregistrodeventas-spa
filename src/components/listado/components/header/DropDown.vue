<template>
	<b-dropdown
	text="Mas"
	right
	variant="primary">
		<b-dropdown-item
		v-if="hasExtencion('combos')"
		v-b-modal="'combos'">
			<i class="icon-print"></i>
			Combos
		</b-dropdown-item>
		<b-dropdown-item
		v-b-modal="'prices_list'">
			<i class="icon-print"></i>
			Listas de precios
		</b-dropdown-item>
		<b-dropdown-item
		@click="excel">
			<i class="icon-upload"></i>
			Exportar Excel
		</b-dropdown-item>
		<b-dropdown-item
		v-b-modal="'import-article'">
			<i class="icon-download"></i>
			Importar Excel
		</b-dropdown-item>
		<b-dropdown-item
		v-b-modal="'inactive-articles'">
			<i class="icon-trash"></i>
			Articulos inactivos
		</b-dropdown-item>
	</b-dropdown>
</template>
<script>
export default {
	methods: {
		excel() {
            var link = process.env.VUE_APP_API_URL+'/articles/excel/export'
            window.open(link)
		},
	}
}
</script>