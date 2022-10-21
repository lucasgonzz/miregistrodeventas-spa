export default {
	properties: [
		{
			text: 'N°',
			key: 'num',
			type: 'text',
			value: '',
			show: true,
			not_show_on_form: true,
			use_to_filter_in_search: true,
		},
		{
			text: 'Nombre',
			key: 'name',
			type: 'text',
			value: '',
			is_title: true,
			use_to_filter_in_search: true,
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
			text: 'Direccion',
			key: 'address',
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
			show: true,
			use_to_filter_in_search: true,
		},
		{
			text: 'Razon social',
			key: 'razon_social',
			type: 'text',
			value: '',
			show: true,
			use_to_filter_in_search: true,
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
			text: 'Observaciones',
			key: 'observations',
			type: 'textarea',
			value: '',
			show: true, 
			use_to_filter_in_search: true,
		},
		{
			text: 'Localidad',
			key: 'location_id',
			type: 'select',
			value: 0,
			show: true, 
			filterable: true,
		},
		{
			text: 'IVA',
			key: 'iva_condition_id',
			type: 'select',
			value: 0,
			show: true, 
			filterable: true,
		},
		{
			text: 'Porcentaje',
			key: 'percentage_gain',
			type: 'number',
			value: '',
			show: true,
		},
	],
}