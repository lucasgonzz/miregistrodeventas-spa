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
			text: 'Porcentage',
			key: 'percentage',
			type: 'number',
			value: '',
			show: true,
		},
		{
			text: 'Cliente',
			key: 'client_id',
			type: 'select',
			value: 0,
			show: true,
		},
	],
}