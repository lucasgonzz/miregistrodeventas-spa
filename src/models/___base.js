export default {
	properties: [
		{
			// Label
			text: 'Tipo de operacion',
			key: 'order_operation_id',
			type: [
				// Posibles valores
				// text: Input 
				// textarea: Textarea
				// search: SearchComponent
				// only_show: P con el valor 
			],
			value: 0,
			show: true,
			// Se va a usar para filtrar los modelos en SearchComponent
			use_to_filter_in_search: true,
			filterable: true,
		},
		// SEARCH
		{
			text: 'Cliente',
			key: 'client_id',
			type: 'search',
			value: 0,
			is_title: true,
			filterable: true,
		},
		// V-IF Y SHOW MODEL
		{
			v_if: ['client_id', '!=', 0],
			text: 'Direccion de origen',
			key: 'origin_client_address_id',
			type: 'radio',
			props_to_show_in_radio: [
				'name',
				'address',
				'observations',
			],
			store: 'client_address',
			value: 0,
			show: true,
			belongs_to: 'client',
			show_model: true,
			btn_model_text: 'Direccion',
			properties: [
				'client_id',
			],
			filterable: true,
		},
		{
			v_if: ['client_id', '!=', 0],
			text: 'Direccion de destino',
			key: 'destination_client_address_id',
			type: 'radio',
			props_to_show_in_radio: [
				'name',
				'address',
				'observations',
			],
			store: 'client_address',
			value: 0,
			show: true,
			belongs_to: 'client',
			btn_model_text: 'Direccion',
			filterable: true,
		},
		{
			v_if: ['order_operation_id', '=', 2],
			text: 'Con Dinero',
			key: 'with_money',
			type: 'checkbox',
			is_boolean: true,
			value: 1,
			unchecked_value: 1,
			show: true,
			filterable: true,
		},
		{
			text: 'Estado',
			key: 'order_status_id',
			type: 'select',
			value: 1,
			show: true, 
			filterable: true,
		},
		{
			text: 'Repartidor',
			key: 'driver_id',
			type: 'search',
			value: 0,
			show: true, 
			filterable: true,
		},
		{
			text: 'Localidad',
			key: 'location_id',
			type: 'select',
			value: 0,
			on_change: 'setPivotProps',
			properties_to_set_on_change: [
				{
					relation_to_set: 'packages',
					set: 'pivot.price',
					find_on: 'locations',
				},
				{
					set: 'person_price',
					search_on_models: 'location',
				},
				{
					set: 'money_price',
					search_on_models: 'location',
				},
			],
			show: true,
			filterable: true,
		},
		{
			text: 'Tipo de pedido',
			key: 'order_type_id',
			type: 'radio',
			value: 0,
			show: true,
			filterable: true,
		},
		{
			text: 'Bultos',
			key: 'packages',
			v_if: ['order_type_id', '=', 1],
			belongs_to_many: {
				model_name: 'package',
				related_with_all: true,
				related_by: 'location_id',
				relations_with: 'locations',
				properties_to_show: [
					{
						text: 'Precio',
						key: 'price',
					},
				],
				properties_to_set: [
					{
						text: 'Precio',
						key: 'price',
						type: 'number',
						value: '',
						depend: true,
					},
					{
						text: 'Cantidad',
						key: 'amount',
						type: 'number',
						value: '',
					},
				],
			},
			show: false,
		},
		{
			v_if: ['order_type_id', '=', 2],
			text: 'Precio por la plata',
			key: 'money_price',
			type: 'number',
			value: '',
			show: true,
		},
		{
			v_if: ['order_type_id', '=', 3],
			text: 'Precio por pasajero',
			key: 'person_price',
			type: 'number',
			value: '',
			show: true,
		},
		{
			v_if: ['order_type_id', '=', 3],
			text: 'Cantidad de pasajeros',
			key: 'person_amount',
			type: 'number',
			value: '',
			show: true,
		},
		{
			text: 'Creado',
			key: 'created_at',
			type: 'date',
			value: '',
			show: true,
			disabled: true,
			filterable: true,
		},
		{
			text: 'Fecha de ejecucion',
			key: 'to_execute_at',
			type: 'date',
			value: '',
			show: true,
			filterable: true,
		},
		{
			text: 'Fecha de ejecucion limite',
			key: 'to_limit_execute_at',
			type: 'date',
			value: '',
			show: true,
		},
		{
			text: 'Observaciones',
			key: 'observations',
			type: 'textarea',
			value: '',
			show: true,
		},
		{
			text: 'Total',
			key: 'total',
			function: 'getOrderTotal',
			value: '',
			show: true,
		},
	],
}