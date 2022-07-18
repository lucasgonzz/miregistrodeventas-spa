export default {
	props: [
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
	],
}