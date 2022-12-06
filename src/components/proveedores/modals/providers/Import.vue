<template>
	<import-component
	model_name="provider"
	:columns="columns"
	:actions="actions">
	</import-component> 
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
					text: 'Nombre',
				},
				{
					text: 'Telefono',
				},
				{
					text: 'Direccion',
				},
				{
					text: 'Localidad',
				},
				{
					text: 'Email',
				},
				{
					text: 'Condicion de IVA',
				},
				{
					text: 'Razon social',
				},
				{
					text: 'Cuit',
				},
				{
					text: 'Observaciones',
				},
				{
					text: 'Codigo',
				},
			]
			return columns
		},
		actions() {
			return [
				'provider/getModels',
				'location/getModels',
			]
		},
 	},
}
</script>