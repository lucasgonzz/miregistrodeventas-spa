<template>
	<import-component
	model_name="article"
	:props_to_send="props_to_send"
	:advises="advises"
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
					text: 'Precio Final',
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
				'category/getModels',
				'sub_category/getModels',
			]
		},
		advises() {
			return [
				'No modificar la columna PRECIO FINAL ya que esta propiedad se calcula luego de definir los costos y marguenes de ganancia.'
			]
		}
 	},
}
</script>