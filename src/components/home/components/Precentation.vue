<template>
	<b-row
	:style="{ backgroundImage: 'url(' + require('@/assets/fondo burbujas azules.png') + ')' }"
	id="precentation">
		<b-col
		cols="12"
		lg="6">
			<h2
			class="title">
				Sistema de administracion y contabilidad online
			</h2>
			<h5>
				Conoce como ingresar en ComecioCity y como usarlo.
			</h5>
			<video 
			class="d-lg-none"
			controls>
				<source src="@/assets/presentacion.mp4" type="video/mp4">
				Su navegador no soporta este video.
			</video>
		</b-col>
		<b-col
		class="col-video d-none d-lg-flex"
		cols="12"
		lg="6">
			<video controls>
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
