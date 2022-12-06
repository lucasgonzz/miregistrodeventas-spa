export default {
	properties: [
		{
			text: 'Cliente',
			key: 'client_id',
			store: 'client',
			type: 'search',
			value: 0,
			is_title: true,
			show_btn_create: true,
			use_to_filter_in_modal: true,
		},
		{
			text: 'Fecha de inicio',
			key: 'start_at',
			type: 'date',
			is_date: true,
			value: '',
			show: true,
			filterable: true,
		},
		{
			text: 'Fecha de finalizacion',
			key: 'finish_at',
			type: 'date',
			is_date: true,
			value: '',
			show: true,
			filterable: true,
		},
		{
			text: 'Articulos',
			store: 'article',
			key: 'articles',
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
			text: 'Estado del presupuesto',
			key: 'budget_status_id',
			type: 'select',
			value: 1,
			show: true,
			filterable: true,
			use_to_filter_in_modal: true,
		},
		{
			text: 'Total',
			key: 'total',
			function: 'budgetTotal',
			value: '',
			is_price: true,
			show: true,
		},
	],
	singular_model_name_spanish: 'Presupuesto',
	plural_model_name_spanish: 'Presupuestos',
	create_model_name_spanish: 'Nuevo presupuesto',
}