export default {
	properties: [
		{
			text: 'Proveedor',
			key: 'provider_id',
			store: 'provider',
			type: 'search',
			value: 0,
			is_title: true,
		},
		{
			text: 'Articulos',
			store: 'article',
			key: 'articles',
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
					{
						text: 'Costo',
						key: 'cost',
						value: '',
						type: 'number'
					},
					{
						text: 'Notas',
						key: 'notes',
						value: '',
						type: 'textarea'
					},
					{
						text: 'Recibidas',
						key: 'received',
						value: 0,
						type: 'number',
					},
					// {
					// 	text: 'Recibidas',
					// 	key: 'received',
					// 	value: 0,
					// 	type: 'button',
					// 	commit: 'provider_order/setReceived',
					// 	modal: 'provider-order-article-received',
					// },
				],
				if_null: {
					prop_to_set_with_query: 'name',
					props_to_set: [
						{
							key: 'status',
							value: 'inactive',
						},
					],
				},
			}
		},
	],
}