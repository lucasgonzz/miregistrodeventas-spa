export default {
	properties: [
		{
			text: 'Nombre',
			type: 'text',
			key: 'name',
			show: true,
		},
		{
			text: 'Nombre empresa',
			type: 'text',
			key: 'company_name',
			is_title: true,
		},
		{
			text: 'Extenciones',
			store: 'extencion',
			key: 'extencions',
			belongs_to_many: {
				model_name: 'extencion',
				with_checkbox: true,
			}
		},
	],
	singular_model_name_spanish: 'Usuario',
	plural_model_name_spanish: 'Usuarios',
	create_model_name_spanish: 'Nuevo usuario',
}