export default {
	properties: [
		{
			text: 'Imagen',
			key: 'images',
			type: 'image',
			is_images: true,
			show: true,
		},
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
			text: 'Codigo barras',
			key: 'bar_code',
			type: 'text',
			value: '',
			show: true,
			use_to_filter_in_search: true,
		},
		{
			text: 'Codigo proveedor',
			key: 'provider_code',
			type: 'text',
			value: '',
			show: true,
			use_to_filter_in_search: true,
		},
		{
			text: 'Costo',
			key: 'cost',
			type: 'number',
			value: '',
			show: true,
			can: 'article.cost',
		},
		{
			text: 'Precio',
			key: 'price',
			type: 'number',
			value: '',
			show: true,
		},
		{
			text: 'Stock',
			key: 'stock',
			type: 'number',
			value: '',
			show: true,
		},
		{
			text: 'Marca',
			key: 'brand_id',
			type: 'select',
			value: 0,
			show: false,
		},
		{
			text: 'Iva',
			key: 'iva_id',
			type: 'select',
			value: 0,
			show: false,
		},
	],
}