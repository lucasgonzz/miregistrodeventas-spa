<template>
<b-row
id="features"
class="row-dark">
	<b-col>
		<h2
		v-animate-onscroll="{down: 'animated backInUp'}"
		class="title">
			Funcionalidades
		</h2>
		<h5>
			Conoce los 6 modulos que te van a ayudar administrar tu negocio.
		</h5>
		<div class="cont-models">
			<div 
			v-for="featured in features"
			v-animate-onscroll="{down: 'animated fadeInUp'}"
			class="model featured b-r-1">
				<i :class="'icon-'+featured.icon" class="text-primary"></i>
				<p class="name">
					{{ featured.title }}
				</p>
				<p class="description">
					{{ featured.description }}
				</p>
			</div>
		</div>
	</b-col>
</b-row>
</template>
<script>
export default {
	data() {
		return {
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
.featured
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