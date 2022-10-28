export default {
	properties: [
		{
			text: 'Cliente',
			type: 'text',
			key: 'client',
			is_title: true,
		},
		{
			text: 'Valor por hora',
			key: 'hour_price',
			value: '',
			type: 'number',
		},
		{
			text: 'Valides de la oferta',
			key: 'offer_validity',
			value: '',
			type: 'date',
		},
		{
			text: 'Funcionalidades',
			key: 'super_budget_features',
			has_many: {
				text: 'Funcion',
				model: {
					title: '',
					description: '',
					development_time: '',
					total: '',
				},
				properties: [
					{
						text: 'Titulo',
						key: 'title',
						type: 'text',
					},
					{
						text: 'Descripcion',
						key: 'description',
						type: 'textarea',
					},
					{
						text: 'Tiempo de desarrollo',
						key: 'development_time',
						type: 'text',
					},
					{
						text: 'total',
						key: 'total',
						type: 'number',
					},
				],
			}
		},
		{
			text: 'Tiempo de entrega',
			key: 'delivery_time',
			value: '',
			type: 'textarea',
		}
	]
}