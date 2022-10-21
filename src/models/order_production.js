export default {
	properties: [
		{
			text: 'Cliente',
			key: 'client_id',
			store: 'client',
			type: 'search',
			value: 0,
			is_title: true,
		},
		{
			text: 'Estado',
			key: 'order_production_status_id',
			store: 'order_production_status',
			type: 'select',
			value: 0,
			show: true,
		},
		{
			text: 'Fecha de inicio',
			key: 'start_at',
			type: 'date',
			value: '',
			show: true,
			filterable: true,
		},
		{
			text: 'Fecha de finalizacion',
			key: 'finish_at',
			type: 'date',
			value: '',
			show: true,
			filterable: true,
		},
		{
			text: 'Articulos',
			store: 'article',
			key: 'articles',
			belongs_to_many: {
				model_name: 'article',
				props_to_show: [
					// {
					// 	text: 'Activar',
					// 	type: 'button',
					// 	show: true,
					// 	show_if: ['status', '=', 'inactive']
					// },
					{
						text: 'Nombre',
						key: 'name',
						type: 'textarea',
						show: true,
						show_in_input_if: ['status', '=', 'inactive']
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
						text: 'Precio',
						key: 'price',
						value: {key: 'price', value_if_undefined: ''},
						type: 'number'
					},
					{
						text: 'Cantidad',
						key: 'amount',
						value: '',
						type: 'number'
					},
					{
						text: 'Bonif',
						key: 'bonus',
						value: '',
						type: 'number'
					},
					{
						text: 'Ubicacion',
						key: 'location',
						value: '',
						type: 'textarea'
					},
					{
						from_store: true,
						store: 'order_production_status',
						type: 'number',
					},
					// {
					// 	text: 'Entrgados',
					// 	key: 'delivered',
					// 	value: '',
					// 	type: 'number'
					// },
				],
				if_null: {
					prop_to_set_with_query: 'name',
					props_to_set: [
						{
							key: 'status',
							value: 'from_budget',
						},
					],
				},
			}
		},
		{
			text: 'Observaciones',
			key: 'observations',
			type: 'textarea',
			value: '',
			show: true,
		},
		{
			text: 'Finalizada',
			key: 'finished',
			type: '',
			is_boolean: true,
			value: '',
			show: true,
		},
		{
			text: 'Total',
			key: 'total',
			function: 'budgetTotal',
			value: '',
			show: true,
		},
	],
}