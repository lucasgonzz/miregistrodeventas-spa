<template>
<b-row
id="payment-plans"
class="row-dark">
	<b-col>
		<div
		v-animate-onscroll="{down: 'animated fadeInUp'}">
			<h2
			class="title">
				Nuestros planes
			</h2>
			<h5>
				No cobramos licencia inicial, actualizaciones ni mantenimiento extra.
			</h5>
		</div>
		<div class="cont-models">
			<div 
			v-for="plan in plans"
			v-animate-onscroll="{down: 'animated fadeInUp'}"
			class="model plan s b-r-1">
				<i :class="'icon-'+plan.icon" class="text-primary"></i>
				<p class="name text-primary">
					{{ plan.name }}
				</p>
				<p class="price">
					{{ plan.price }}
				</p>
				<p class="price-aclaration">
					AR$ por mes
				</p>
				<div 
				v-for="feature in plan.features"
				class="feature">
					<i :class="iconClass(feature)"></i>
					<p>
						{{ feature.text }}
					</p>
					<hr>
				</div>
			</div>
		</div>
	</b-col>
</b-row>
</template>
<script>
export default {
	data() {
		return {
			plans: [ 
				{
					name: 'Basico Lite',
					price: '$1.000',
					features: [
						{
							active: true,
							text: 'Modulos: Ingresar, Vender y Ventas',
						},
						{
							active: false,
							text: 'Proveedores, Categorias y Fotos en los productos',
						},
						{
							active: false,
							text: 'Clientes y Cuentas corrientes',
						},
						{
							active: false,
							text: 'Vendedores y Descuentos',
						},
						{
							active: true,
							text: 'Acceso para 1 usuarios',
						},
						{
							active: true,
							text: 'Capacidad de cargar hasta 5.000 productos',
						},
						{
							active: false,
							text: 'Tienda Online personalizada',
						},
					],
				},
				{
					name: 'Basico',
					price: '$2.000',
					features: [
						{
							active: true,
							text: 'Modulos: Ingresar, Listado, Vender, Ventas y Empleados',
						},
						{
							active: true,
							text: 'Proveedores, Categorias, Precios especiales y Fotos en los productos',
						},
						{
							active: true,
							text: 'Clientes y Cuentas corrientes',
						},
						{
							active: true,
							text: 'Vendedores y Descuentos',
						},
						{
							active: true,
							text: 'Acceso para 3 usuarios',
						},
						{
							active: true,
							text: 'Capacidad de cargar hasta 10.000 productos',
						},
						{
							active: false,
							text: 'Tienda Online personalizada',
						},
					],
				},
				{
					name: 'Premium',
					price: '$6.000',
					features: [
						{
							active: true,
							text: 'Modulos: Ingresar, Listado, Vender, Ventas, Empleados y Online',
						},
						{
							active: true,
							text: 'Proveedores, Categorias y Fotos en los productos',
						},
						{
							active: true,
							text: 'Clientes y Cuentas corrientes',
						},
						{
							active: true,
							text: 'Vendedores y Descuentos',
						},
						{
							active: true,
							text: 'Acceso para 5 usuarios',
						},
						{
							active: true,
							text: 'Capacidad de cargar hasta 15.000 productos',
						},
						{
							active: true,
							text: 'Tienda Online personalizada',
						},
					],
				},
			],
		}
	},
	methods: {
		iconClass(feature) {
			if (feature.active) {
				return 'icon-check text-success'
			}
			return 'icon-cancel text-danger'
		}
	}
}
</script>
<style lang="sass">	
.plan 
	margin-bottom: 2em !important
	background: #FFF
	p 
		text-align: center
	.name 
		font-size: 1.2em
		font-weight: bold
	.price 
		font-weight: bold
		font-size: 2.5em
		margin-bottom: 0
	.price-aclaration
		color: rgba(0,0,0,.6)
		font-size: 1.2em
	.feature
		display: flex
		p 
			text-align: left
		i 
			padding-right: 15px
			&.icon-cancel 
				padding-right: 10px
				font-size: 1.2em
		&:last-child
			p 
				margin-bottom: 0
			hr
				display: none
</style>