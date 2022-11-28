export default {
	properties: [
		{
			text: 'Proveedor',
			key: 'provider_id',
			store: 'provider',
			type: 'search',
			value: 0,
			is_title: true,
			use_to_filter_in_modal: true,
		},
		{
			text: 'Articulos',
			store: 'article',
			type: 'search',
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
						text: 'Costo Recibido',
						key: 'received_cost',
						value: '',
						type: 'number'
					},
					{
						text: 'Iva',
						key: 'iva_id',
						value: 0,
						type: 'select',
						prop_name: 'percentage',
						size: 'md',
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
					// 	text: 'Ediar',
					// 	type: 'button',
					// 	button: {
					// 		variant: 'primary',
					// 	},
					// 	source: '@/mixins/edit_articles.js',
					// 	function: 'editArticle',
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
		{
			text: 'Facturas',
			key: 'provider_order_afip_tickets',
			has_many: {
				text: 'Factura',
				model_name: 'provider_order_afip_ticket',
				model: {
					code: '',
					total: '',
					issued_at: '',
				},
				properties: [
					{
						text: 'Fecha de emision',
						key: 'issued_at',
						type: 'date',
					},
					{
						text: 'Numero',
						key: 'code',
						type: 'text',
					},
					{
						text: 'Total',
						key: 'total',
						type: 'number',
					},
				],
			}
		},
		{
			text: 'Estado',
			key: 'provider_order_status_id',
			store: 'provider_order_status',
			type: 'select',
			value: 1,
			show: true,
			use_to_filter_in_modal: true,
		},
		{
			text: 'Total',
			key: 'total',
			function: 'providerOrderTotal',
			value: '',
			show: true,
		},
	],
}