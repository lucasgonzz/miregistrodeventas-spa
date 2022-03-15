<template>
	<b-row
	id="precentation">
		<b-col
		cols="12"
		lg="4">
			<h2
			class="title">
				Sistema de administracion y contabilidad online
			</h2>
			<p>
				Conoce como ingresar en ComecioCity y como usarlo a traves de sus 5 secciones.
			</p>
			<video 
			class="s b-r-1 d-lg-none"
			controls>
				<source src="@/assets/presentacion.mp4" type="video/mp4">
				Su navegador no soporta este video.
			</video>
		</b-col>
		<b-col
		class="col-video d-none d-lg-flex"
		cols="12"
		lg="6">
			<video 
			class="s b-r-1"
			controls>
				<source src="@/assets/presentacion.mp4" type="video/mp4">
				Su navegador no soporta este video.
			</video>
		</b-col>
		<scroll-bottom
		text="Funcionalidades"
		element="features"></scroll-bottom>
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
#precentation
	background: url('~@/assets/fondo cuadrados azules.png') no-repeat center center 
	background-size: cover
</style>
