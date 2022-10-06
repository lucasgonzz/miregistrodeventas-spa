export default {
	properties: [
		{
			text: 'Nombre',
			key: 'name',
			type: 'text',
			value: '',
			required: true,
		},
		{
			text: 'Descripcion',
			key: 'description',
			type: 'textarea',
			value: '',
			required: false,
		},
		{
			text: 'Tipo',
			key: 'payment_method_type_id',
			type: 'select',
			value: 0
		},
	],
}