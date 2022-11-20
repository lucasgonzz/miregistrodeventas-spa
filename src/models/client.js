export default {
	properties: [
		{
			text: 'Nombre',
			key: 'name',
			type: 'text',
			value: '',
			show: true,
			use_to_filter_in_search: true,
		},
		{
			text: 'Saldo',
			key: 'saldo',
			only_show: true,
			type: 'number',
			value: '',
			show: true,
			is_price: true,
			use_to_filter_in_modal: true,
		},
		{
			text: 'Telefono',
			key: 'phone',
			type: 'text',
			value: '',
			show: true,
			use_to_filter_in_search: true,
		},
		{
			text: 'Correo',
			key: 'email',
			type: 'text',
			value: '',
			show: false,
		},
		{
			text: 'Direccion',
			key: 'address',
			type: 'text',
			value: '',
			show: true,
			use_to_filter_in_search: true,
		},
		{
			text: 'Tipo de precio',
			key: 'price_type_id',
			type: 'select',
			value: 0,
			show: true,
			use_to_filter_in_modal: true,
		},
		{
			text: 'Localidad',
			key: 'location_id',
			type: 'select',
			value: 0,
			show: true,
			use_to_filter_in_search: true,
			use_to_filter_in_modal: true,
		},
		{
			text: 'Cuit',
			key: 'cuit',
			type: 'text',
			value: '',
			show: true,
			use_to_filter_in_search: true,
		},
		{
			text: 'Razon social',
			key: 'razon_social',
			type: 'text',
			value: '',
			show: true,
		},
		{
			text: 'Condicion frente al IVA',
			key: 'iva_condition_id',
			type: 'select',
			value: 0,
			show: false,
			use_to_filter_in_modal: true,
		},
		{
			text: 'Descripcion',
			key: 'description',
			type: 'textarea',
			value: '',
			show: true,
		},
		{
			text: 'Vendedor',
			key: 'seller_id',
			type: 'select',
			value: 0,
			show: true,
		},
	],
}