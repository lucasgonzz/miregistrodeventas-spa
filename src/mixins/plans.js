export default {
	data() {
		return {
			// plans: [
			// 		{
			// 			id: 1,
			// 			name: 'Basico Lite',
			// 			price: '$1.000',
			// 			features: [
			// 				{
			// 					active: true,
			// 					text: 'Modulos: Ingresar, Vender y Ventas.',
			// 				},
			// 				{
			// 					active: false,
			// 					text: 'Proveedores, Categorias, Precios especiales y Fotos en los productos.',
			// 				},
			// 				{
			// 					active: false,
			// 					text: 'Factura electronica.',
			// 				},
			// 				{
			// 					active: false,
			// 					text: 'Clientes y Cuentas corrientes.',
			// 				},
			// 				{
			// 					active: false,
			// 					text: 'Vendedores y Descuentos.',
			// 				},
			// 				// {
			// 				// 	active: true,
			// 				// 	text: 'Acceso para 1 usuarios.',
			// 				// },
			// 				// {
			// 				// 	active: true,
			// 				// 	text: 'Capacidad de cargar hasta 5.000 productos.',
			// 				// },
			// 				{
			// 					active: false,
			// 					text: 'Tienda Online personalizada.',
			// 				},
			// 			],
			// 		},
			// 		{
			// 			id: 2,
			// 			name: 'Basico',
			// 			price: '$2.000',
			// 			features: [
			// 				{
			// 					active: true,
			// 					text: 'Modulos: Ingresar, Listado, Vender, Ventas y Empleados.',
			// 				},
			// 				{
			// 					active: true,
			// 					text: 'Proveedores, Categorias, Precios especiales y Fotos en los productos.',
			// 				},
			// 				{
			// 					active: true,
			// 					text: 'Factura electronica.',
			// 				},
			// 				{
			// 					active: true,
			// 					text: 'Clientes y Cuentas corrientes.',
			// 				},
			// 				{
			// 					active: true,
			// 					text: 'Vendedores y Descuentos.',
			// 				},
			// 				// {
			// 				// 	active: true,
			// 				// 	text: 'Acceso para 3 usuarios.',
			// 				// },
			// 				// {
			// 				// 	active: true,
			// 				// 	text: 'Capacidad de cargar hasta 10.000 productos.',
			// 				// },
			// 				{
			// 					active: false,
			// 					text: 'Tienda Online personalizada.',
			// 				},
			// 			],
			// 		},
			// 		{
			// 			id: 3,
			// 			name: 'Premium',
			// 			price: '$6.000',
			// 			features: [
			// 				{
			// 					active: true,
			// 					text: 'Modulos: Ingresar, Listado, Vender, Ventas, Empleados y Online.',
			// 				},
			// 				{
			// 					active: true,
			// 					text: 'Proveedores, Categorias, Precios especiales y Fotos en los productos.',
			// 				},
			// 				{
			// 					active: true,
			// 					text: 'Factura electronica.',
			// 				},
			// 				{
			// 					active: true,
			// 					text: 'Clientes y Cuentas corrientes.',
			// 				},
			// 				{
			// 					active: true,
			// 					text: 'Vendedores y Descuentos.',
			// 				},
			// 				// {
			// 				// 	active: true,
			// 				// 	text: 'Acceso para 5 usuarios.',
			// 				// },
			// 				// {
			// 				// 	active: true,
			// 				// 	text: 'Capacidad de cargar hasta 15.000 productos.',
			// 				// },
			// 				{
			// 					active: true,
			// 					text: 'Tienda Online personalizada.',
			// 				},
			// 			],
			// 		},
			// 	],
		}
	},
	computed: {
		plans() {
			return this.$store.state.plans.plans
		},
		selected_plan() {
			return this.$store.state.plans.selected
		},
		view() {
			return this.$route.params.view
		},
	},
	methods: {
		iconClass(feature) {
			if (feature.pivot.active) {
				return 'icon-check text-success'
			}
			return 'icon-cancel text-danger'
		}
	}
}