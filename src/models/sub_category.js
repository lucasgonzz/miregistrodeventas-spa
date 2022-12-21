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
			text: 'Categoria',
			key: 'category_id',
			type: 'select',
			value: 0,
			show: true,
		},
		{
			text: 'Mostrar en VENDER',
			key: 'show_in_vender',
			type: 'checkbox',
			value: 0,
			show: false,
		},
	],
	singular_model_name_spanish: 'Sub categoria',
	plural_model_name_spanish: 'Sub categorias',
	create_model_name_spanish: 'Nueva sub categoria',
	text_delete: 'la',
}