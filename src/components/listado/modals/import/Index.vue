<template>
	<import-component
	model_name="article"
	model_name_spanish="Articulos"
	:props_to_send="props_to_send"
	:columns="columns"
	:actions="actions">
		<select-provider
		:props_to_send="props_to_send"></select-provider>
	</import-component>
</template>
<script>
import ImportComponent from '@/components/common/import/Index'
import SelectProvider from '@/components/listado/modals/import/SelectProvider'

export default {
	components: {
		ImportComponent,
		SelectProvider,
	},
	data() {
		return {
			props_to_send: {
				provider_id: 0,
			}
		}
	},
	computed: {
		columns() {
			let columns = [
				{
					text: 'Codigo',
				},
				{
					text: 'Codigo de barras',
				},
				{
					text: 'Codigo de proveedor',
				},
				{
					text: 'Nombre',
				},
				{
					text: 'Categoria',
				},
				{
					text: 'Sub categoria',
				},
				{
					text: 'Stock actual',
				},
				{
					text: 'Stock minimo',
				},
				{
					text: 'Iva',
				},
				{
					text: 'Proveedor',
				},
				{
					text: 'Costo',
				},
				{
					text: 'Margen de ganancia',
				},
				{
					text: 'Descuentos',
					description: 'Separe los diferentes descuentos con un guion (-)',
				},
				{
					text: 'Precio',
				},
				{
					text: 'Moneda',
					description: 'USD para Dolares, ARS para pesos (ARS por defecto)',
				},
			]
			let index = 1
			columns.forEach(column => {
				column.column = index
				index++
			})
			return columns
		},
		actions() {
			return [
				'provider/getModels',
				'iva/getModels',
				'categories/getCategories',
				'sub_categories/getSubCategories',
			]
		},
 	},
}
</script>