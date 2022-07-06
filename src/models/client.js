export default {
	props: [
		{
			text: 'Nombre',
			key: 'name',
			type: 'text',
			value: ''
		},
		{
			text: 'Telefono',
			key: 'phone',
			type: 'text',
			value: ''
		},
		{
			text: 'Correo',
			key: 'email',
			type: 'text',
			value: ''
		},
		{
			text: 'Direccion',
			key: 'address',
			type: 'text',
			value: ''
		},
		{
			text: 'Localidad',
			key: 'location_id',
			type: 'select',
			value: 0
		},
		{
			text: 'Cuit',
			key: 'cuit',
			type: 'text',
			value: ''
		},
		{
			text: 'Razon social',
			key: 'razon_social',
			type: 'text',
			value: ''
		},
		{
			text: 'Condicion frente al IVA',
			key: 'iva_condition_id',
			type: 'select',
			value: 0
		},
		{
			text: 'Vendedor',
			key: 'seller_id',
			type: 'select',
			value: 0
		},
	],
}