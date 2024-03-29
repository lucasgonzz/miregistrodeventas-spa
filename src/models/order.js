export default {
	properties: [ 
		{
			text: 'Cliente',
			key: 'buyer_id',
			store: 'buyer',
			type: '',
			only_show: true,
			value: '',
			is_title: true,
		},
		{
			text: 'Estado',
			key: 'order_status_id',
			type: '',
			only_show: true,
			value: '',
			show: true,
		},
		{
			text: 'Zona de envio',
			key: 'delivery_zone_id',
			store: 'delivery_zone',
			type: '',
			only_show: true,
			value: '',
			show: true,
		},
		{
			text: 'Metodo de pago',
			key: 'payment_method_id',
			store: 'payment_method',
			type: '',
			only_show: true,
			value: '',
			show: true,
		},
		{
			text: 'Notas',
			key: 'description',
			type: '',
			only_show: true,
			value: '',
			show: true,
		},
		{
			text: 'Articulos',
			key: 'articles',
			belongs_to_many: {
				model_name: 'article',
				can_not_modify: true,
				props_to_show: [
					{
						text: 'Nombre',
						key: 'name',
						type: 'textarea',
						show: true,
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
				],
				properties_to_set: [
					{
						text: 'Precio',
						key: 'price',
						type: 'number',
						show: true,
					},
					{
						text: 'Cantidad',
						key: 'amount',
						type: 'number',
						show: true,
					},
				]
			}
		},
		{
			text: 'Cupon',
			key: 'cupon_id',
			store: 'cupon',
			type: '',
			only_show: true,
			value: '',
			show: true,
			relation_prop_name: 'code',
		},
		{
			text: 'Total',
			key: 'total',
			function: 'orderTotal',
			value: '',
			is_price: true,
			show: true,
		},
	],
	singular_model_name_spanish: 'Pedido',
	plural_model_name_spanish: 'Pedidos',
	create_model_name_spanish: 'Nuevo pedido',
	text_delete: 'el',
}