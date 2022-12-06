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
			text: 'Planes de pago',
			key: 'credit_card_payment_plans',
			has_many: {
				text: 'Plan de pago',
				model: {
					installments: '',
					surchage: '',
				},
				properties: [
					{
						text: 'Cuotas',
						key: 'installments',
						type: 'number',
					},
					{
						text: 'Recargo',
						key: 'surchage',
						type: 'number',
					},
				],
			}
		},
	],
	singular_model_name_spanish: 'Tarjeta de credito',
	plural_model_name_spanish: 'Tarjetas de credito',
	create_model_name_spanish: 'Nueva tarjeta de credito',
}