<template>
<div
id="cont-first">
   	<!-- <nav-home></nav-home> -->
	<b-row
	id="first"
	class="row">
		<b-col
		cols="11"
		md="6"
		xl="5">
			<h1 class="title text-left">
				Organiza tu emprendimiento facil y rapido
			</h1>
			<p
			class="text-justify">
				ComercioCity es el sistema donde cargas tu inventario y llevas el control de tus ventas. 
			</p>
			<p
			class="d-none d-md-block">
				Con la posibilidad de conectarlo al 100% con una Tienda Online, controlando todo desde un solo lugar.
			</p>
			<img 
			class="d-md-none"
			src="@/assets/presentacion.png" alt="">
		</b-col>
		<b-col
		class="col-img"
		md="6"
		xl="5">
			<img 
			class="d-none d-md-block"
			src="@/assets/presentacion.png" alt="">
		</b-col>
		<scroll-bottom
		text="¿Como se usa?"
		element="precentation"></scroll-bottom>
	</b-row>
</div>
</template>
<script>
import auth from '@/mixins/auth'
import NavHome from '@/components/home/components/Nav'
import ScrollBottom from '@/components/home/components/ScrollBottom'
export default {
	mixins: [auth],
	components: {
		NavHome,
		ScrollBottom,
	},
}
</script>
<style lang="sass">
#first
	background: url('~@/assets/fondo burbujas azules.png') no-repeat center center 
	background-size: cover
	@media screen and (max-width: 576px)
		height: 90vh !important
	@media screen and (min-width: 576px)
		height: 85vh !important
	// background: url('~@/assets/fondo burbujas azules.png') no-repeat center center 
	// background-size: cover
	background-color: #F5F5F5
	.col-img
		display: flex
		align-items: center
		justify-content: center
	img 
		@media screen and (max-width: 380px)
			width: 160px
		@media screen and (min-width: 380px) and (max-width: 768px)
			width: 200px
		@media screen and (min-width: 768px) and (max-width: 992px)
			width: 300px
		@media screen and (min-width: 992px) 
			width: 350px
</style>