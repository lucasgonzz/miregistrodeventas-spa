<template>
	<import
	:props_to_send="props_to_send"
	model_name="provider_order"
	model_name_spanish="articulos"
	:columns="columns"></import>	
</template>
<script>
import Import from '@/components/common/import/Index'
export default {
	components: {
		Import,
	},
	computed: {
		model() {
			return this.$store.state.provider_order.model
		},
		props_to_send() {
			return [
				{
					key: 'model_id',
					value: this.model.id 
				}
			]
		},
		columns() {
			let columns = [
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
					text: 'Cantidad',
				},
				{
					text: 'Costo',
				},
				{
					text: 'Notas',
				},
				{
					text: 'Recibidas',
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
	}
}
</script>