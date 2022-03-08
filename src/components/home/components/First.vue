<template>
<div>
   	<nav-home></nav-home>
	<b-row
	id="first"
	class="row row-dark j-around">
		<b-col
		lg="6">
			<h1 class="title text-left">
				Organiza tu emprendimiento facil y rapido
			</h1>
			<h4
			class="text-justify">
				ComercioCity es el sistema donde cargas tu inventario y llevas el control de tus ventas. Con la posibilidad de conectarlo al 100% con una Tienda Online, controlando todo desde un solo lugar.
			</h4>
		</b-col>
		<b-col
		class="col-img d-none d-lg-flex"
		lg="6">
			<img src="@/assets/logo.png" alt="">
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
	height: 85vh !important
	background: url('~@/assets/parana.jpg') no-repeat center center 
	.col-img
		display: flex
		align-items: center
		justify-content: center
	img 
		width: 300px
</style>