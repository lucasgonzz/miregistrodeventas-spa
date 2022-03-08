<template>
<b-row
id="features"
class="row-dark j-center">
	<b-col
	cols="11"
	lg="6">
		<h2
		class="title">
			Funcionalidades
		</h2>
		<!-- <p
		class="text-center">
			Conoce los 6 modulos que te van a ayudar administrar tu negocio.
		</p> -->
		<vue-horizontal-list 
		:items="features" :options="options">
			<template v-slot:default="{ item }">
				<div 
				class="featured b-r-1">
					<i :class="'icon-'+item.icon" class="text-primary"></i>
					<p class="name">
						{{ item.title }}
					</p>
					<p class="description">
						{{ item.description }}
					</p>
				</div>
			</template>
		</vue-horizontal-list>
	</b-col>
	<scroll-bottom
	text="Tienda Online"
	element="online-store"></scroll-bottom>
</b-row>
</template>
<script>
import VueHorizontalList from "vue-horizontal-list"
import ScrollBottom from '@/components/home/components/ScrollBottom'
export default {
	components: {
		VueHorizontalList,
		ScrollBottom,
	},
	data() {
		return {
			options: {
				responsive: [
					{ size: 1 },
				],
				list: {
					// 1200 because @media (min-width: 1200px) and therefore I want to switch to windowed mode
					// windowed: 1200,

					// Because: #app {padding: 80px 24px;}
					padding: 30,
				},
				position: {
					start: 1,
				},
				navigation: {
					// when to show navigation
					start: 0,
					color: "#000",
				},
				autoplay: { play: false, repeat: false, speed: 2500 },
			},
			features: [ 
				{
					icon: 'upload',
					title: 'Ingresar',
					description: 'Carga nueva mercadería al sistema completando con los datos de los productos en el formulario.'
				},
				{
					icon: 'eye',
					title: 'Listado',
					description: 'Acá vas a tener tu inventario con todos los datos de los productos que hayas ingresado.'
				},
				{
					icon: 'clipboard',
					title: 'Vender',
					description: 'Agrega los productos de una venta al remito y guarda la venta, también podes optar por asignarle esa venta a uno de tus clientes para que quede registro en su cuenta corriente.'
				},
				{
					icon: 'bag-o',
					title: 'Ventas',
					description: 'En esta sección vas a poder consulta todo lo referido a tus ventas, generar remitíos o factura electrónica, ver la lista de tus clientes, sus cuentas corrientes, los descuentos que hayas creado, etc.'
				},
				{
					icon: 'users',
					title: 'Empleados',
					description: 'Da de alta nuevos empleados dentro de tu sistema, otorgandoles permisos para que solo puedan usar ciertas áreas y ver solo la información que vos autorices.'
				},
				{
					icon: 'network',
					title: 'Online',
					description: 'Desde acá vas a manejar todo lo referente a la Tienda Online, como procesar los pedidos, contestar preguntas y mensajes, crear cupones para tus usuarios, etc.'
				},
			],
		}
	}
}
</script>
<style lang="sass">
#features
	[class^='col-']
		flex-direction: column

.featured
	@media screen and (max-width: 992px)
		width: 85%
		margin: auto
	@media screen and (min-width: 992px)
		width: 100%
		// width: 300px
	// @media screen and (max-width: 768px)
	padding: 1em
	i 
		font-size: 70px
	.name 
		margin-top: -15px
		font-weight: bold
		margin-bottom: 0
		font-size: 1.4em
		text-align: center
	.description 
		margin-bottom: 0
		color: rgba(0,0,0,.6)
		text-align: justify
</style>