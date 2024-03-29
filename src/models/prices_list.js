export default {
	properties: [
		{
			text: 'Nombre',
			key: 'name',
			type: 'text',
			value: '',
			is_title: true,
		},
		{
			text: 'Articulos',
			store: 'article',
			key: 'articles',
			type: 'search',
			belongs_to_many: {
				model_name: 'article',
				create_if_not_exist: false,
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
					},
					{
						text: 'Codigo proveedor',
						key: 'provider_code',
						type: 'text',
						show: true,
					},
					{
						text: 'Precio F',
						key: 'final_price',
						type: 'price',
						is_price: true,
						show: true,
					},
				],
			}
		},
	],
	singular_model_name_spanish: 'Lista de precios',
	plural_model_name_spanish: 'Listas de precios',
	create_model_name_spanish: 'Nueva lista de precios',
	text_delete: 'la',
}