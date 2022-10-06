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
			text: 'N° de documento',
			key: 'dni',
			type: 'text',
			value: '',
			show: true,
		},
		{
			text: 'Contraseña',
			key: 'password',
			type: 'text',
			value: '',
			show: false,
			// not_show_on_form: true,
		},
	],
}