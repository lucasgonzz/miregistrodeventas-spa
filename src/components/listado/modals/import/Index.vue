<template>
	<import-component
	@clear="clear"
	model_name="article"
	model_name_spanish="Articulos"
	:columns="columns"
	:actions="actions"/>
</template>
<script>
import ImportComponent from '@/components/common/import/Index'

export default {
	components: {
		ImportComponent,
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
					description: 'USD para Dolares, ARS para pesos',
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
 	methods: {
 		clear() {
			let index = 0
			this.columns.forEach(model => {
				this.$set(this.columns[index], 'column', 0)
				index++
			})
			console.log(this.columns)
 		}
 	}
}
</script>