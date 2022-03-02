<template>
	<b-row
	class="online-store">
		<b-col
		cols="10"
		lg="8">
			<h2
			class="title">
				Tienda Online
			</h2>
			<h5>
				Una de las principales caracteristicas de ComercioCity es que funciona sinconrizadamente con una Tienda Online. Esto significa que la empresa <strong> maneja toda su informacion desde ComercioCity</strong>, es decir, su inventario, sus precios, el stock de sus productos, sus categorias, etc. Y todos esos cambios se ven reflejados automaticamente en la Tienda Online. 
			</h5>
			<h4
			class="sub-title">
				¿Como funciona?
			</h4>
		</b-col>
		<b-col>
			<iframe class="s" :width="width" :height="height" src="https://www.youtube.com/embed/hshTV3MHkNA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		</b-col>
		<b-col
		cols="10"
		lg="8">
			<h4
			class="sub-title">
				¿Como se atienden los pedidos?
			</h4>
			<h5>
				Como dijimos, la tienda funciona de manera sincronizada con ComercioCity, por lo que los pedidos de tus clientes <strong>tambien son procesados desde ComercioCity</strong>.
			</h5>
		</b-col>
		<b-col>
			<iframe class="s" :width="width" :height="height" src="https://www.youtube.com/embed/ua7jhu8EpAM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		</b-col>
	</b-row>
</template>
<script>
import home from '@/mixins/home'
export default {
	mixins: [home],
}
</script>
<style lang="sass">
.online-store
	h5 
		text-align: justify
		margin: 2em 0 
</style>