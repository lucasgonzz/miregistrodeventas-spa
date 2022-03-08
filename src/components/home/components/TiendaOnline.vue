<template>
	<b-row
	id="online-store">
		<b-col
		cols="12"
		lg="6">
			<h2
			class="title">
				Tienda Online
			</h2>
			<p>
				ComercioCity funciona sinconrizadamente con una Tienda Online. Esto significa que la empresa <strong> maneja toda su informacion solo desde ComercioCity</strong>, informacion que se ve reflejada automaticamente en la Tienda Online. 
			</p>
			<video 
			class="d-lg-none"
			controls>
				<source src="@/assets/como funciona la tienda.mp4" type="video/mp4">
				Su navegador no soporta este video.
			</video>
			<!-- <h5>
				Una de las principales caracteristicas de ComercioCity es que funciona sinconrizadamente con una Tienda Online. Esto significa que la empresa <strong> maneja toda su informacion desde ComercioCity</strong>, es decir, su inventario, precios, el stock de sus productos, categorias, etc. Y todos esos cambios se ven reflejados automaticamente en la Tienda Online. 
			</h5>
			<h4
			class="sub-title">
				¿Como funciona?
			</h4> -->
		</b-col>
		<b-col
		class="col-video d-none d-lg-flex"
		cols="12"
		lg="6">
			<video controls>
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
	h5 
		text-align: justify
		margin: 2em 0 
</style>