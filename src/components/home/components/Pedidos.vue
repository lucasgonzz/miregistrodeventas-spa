<template>
	<b-row
	id="pedidos"
	class="online-store">
		<b-col
		cols="12"
		lg="6">
			<h2
			class="title">
				¿Como se atienden los pedidos?
			</h2>
			<p>
				Como dijimos, la tienda funciona de manera sincronizada con ComercioCity, por lo que los pedidos de tus clientes <strong>tambien son procesados desde ComercioCity</strong>.
			</p>
			<video 
			class="d-lg-none"
			controls>
				<source src="@/assets/pedidos.mp4" type="video/mp4">
				Su navegador no soporta este video.
			</video>
		</b-col>
		<b-col
		class="col-video d-none d-lg-flex"
		cols="12"
		lg="6">
			<video controls>
				<source src="@/assets/pedidos.mp4" type="video/mp4">
				Su navegador no soporta este video.
			</video>
		</b-col>
		<scroll-bottom
		text="Nuestros planes"
		element="payment-plans"></scroll-bottom>
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
.online-store
	h5 
		text-align: justify
		margin: 2em 0 
</style>