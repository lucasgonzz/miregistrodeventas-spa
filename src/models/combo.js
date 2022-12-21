export default {
	properties: [
		{
			text: 'Nombre',
			key: 'name',
			value: '',
			type: 'text',
			is_title: true,
			show: true,
		},
		{
			text: 'Precio',
			key: 'price',
			value: '',
			type: 'number',
			is_price: true,
			show: true,
		},
		{
			text: 'Articulos',
			key: 'articles',
			store: 'article',
			type: 'search',
			belongs_to_many: {
				model_name: 'article',
				props_to_show: [
					{
						text: 'Nombre',
						key: 'name',
						type: 'textarea',
						show: true,
						show_in_input_if: ['status', '=', 'inactive'],
						size: 'lg',
					},
					{
						text: 'Codigo barras',
						key: 'bar_code',
						type: 'text',
						show: true,
						show_in_input_if: ['status', '=', 'inactive']
					},
					{
						text: 'Codigo proveedor',
						key: 'provider_code',
						type: 'text',
						show: true,
						show_in_input_if: ['status', '=', 'inactive']
					},
				],
				properties_to_set: [
					{
						text: 'Cantidad',
						key: 'amount',
						value: '',
						type: 'number'
					},
				],
			}
		}
	],
	plural_model_name_spanish: 'Combos',
	singular_model_name_spanish: 'Combo',
	create_model_name_spanish: 'Nuevo combo',
	text_delete: 'el',
}