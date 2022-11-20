export default {
	properties: [
		{
			text: 'Fecha',
			key: 'created_at',
			type: 'date',
			value: '',
			show: true,
		},
		{
			text: 'Detalle',
			key: 'detalle',
			type: 'text',
			value: '',
			show: true,
		},
		{
			text: 'Numero',
			key: 'numero',
			type: 'text',
			value: '',
			show: true,
			title_prefix: 'Rec N°',
			button: {
				variant: 'info',
				emit: 'showDetails',
			}
		},
		{
			text: 'Debe',
			key: 'debe',
			type: 'integer',
			value: '',
			is_price: true,
			show: true,
		},
		{
			text: 'Haber',
			key: 'haber',
			type: 'integer',
			value: '',
			is_price: true,
			show: true,
		},
		{
			text: 'Saldo',
			key: 'saldo',
			type: 'integer',
			value: '',
			is_price: true,
			show: true,
		},
		{
			text: 'Descripcion',
			key: 'description',
			type: 'text',
			value: '',
			show: true,
		},
	],
}