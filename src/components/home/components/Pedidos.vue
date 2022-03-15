<template>
	<b-row
	id="pedidos">
		<b-col
		cols="12"
		lg="4">
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
			<video 
			class="b-r-1 s"
			controls>
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
#pedidos
	background: url('~@/assets/fondo burbujas azules.png') no-repeat center center 
	background-size: cover
</style>