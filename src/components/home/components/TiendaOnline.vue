<template>
	<b-row
	id="online-store">
		<b-col
		cols="12"
		lg="4">
			<h2
			class="title">
				Tienda Online
			</h2>
			<p
			class="d-lg-none">
				ComercioCity funciona sinconrizadamente con una Tienda Online. Esto significa que la empresa <strong> maneja toda su informacion solo desde ComercioCity</strong>, informacion que se ve reflejada automaticamente en la Tienda Online. 
			</p>
			<p
			class="d-none d-lg-inline-block">
				Una de las principales caracteristicas de ComercioCity es que funciona sinconrizadamente con una Tienda Online. Esto significa que la empresa <strong> maneja toda su informacion solo desde ComercioCity</strong>, es decir, su inventario, precios, el stock de sus productos, categorias, etc. Y todos esos cambios se ven reflejados automaticamente en la <strong>Tienda Online.</strong> 
			</p>
			<video 
			class="d-lg-none"
			controls>
				<source src="@/assets/como funciona la tienda.mp4" type="video/mp4">
				Su navegador no soporta este video.
			</video>
		</b-col>
		<b-col
		class="col-video d-none d-lg-flex"
		cols="12"
		lg="6">
			<video 
			class="b-r-1 s"
			controls>
				<source src="@/assets/como funciona la tienda.mp4" type="video/mp4">
				Su navegador no soporta este video.
			</video>
		</b-col>
		<scroll-bottom
		text="Atender los Pedidos"
		element="pedidos"></scroll-bottom>
	</b-row>
</template>
<script>
import home from '@/mixins/home'
import ScrollBottom from '@/components/home/components/ScrollBottom'
export default {
	mixins: [home],
	components: {
		ScrollBottom,
	},
}
</script>
<style lang="sass">
#online-store
	background: url('~@/assets/fondo cuadrados azules.png') no-repeat center center 
	background-size: cover
	h5 
		text-align: justify
		margin: 2em 0 
</style>