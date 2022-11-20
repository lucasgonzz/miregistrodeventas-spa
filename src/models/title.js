export default {
	properties: [
		{
			text: 'Imagen',
			key: 'hosting_image_url',
			type: 'text',
			is_image: true,
			show: true,
		},
		{
			text: 'Titulo',
			key: 'header',
			type: 'text',
			value: '',
			is_title: true,
		},
		{
			text: 'Texto',
			key: 'lead',
			type: 'text',
			value: '',
			show: true,
		},
		{
			text: 'Codigo color',
			key: 'color',
			type: 'text',
			value: '#FFFFFF',
			show: true,
		},
	],
}