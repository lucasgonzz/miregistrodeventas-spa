export default {
	properties: [
		{
			text: 'Cantidad',
			key: 'amount',
			type: 'number',
			is_price: true,
			is_title: true,
		},
		{
			text: 'Descripcion',
			key: 'description',
			type: 'text',
			show: true,
		}
	],
	singular_model_name_spanish: 'Pago',
	plural_model_name_spanish: 'Pagos',
	create_model_name_spanish: 'Nuevo pago',
}