<template>
<b-row
v-if="isProvider() && articles.length"
class="j-center">
	<b-col 
	cols="12"
	lg="3"
	data-step="6" data-intro="Seleccione el cliente para la venta">
		<b-button 
		block
		variant="success"
		v-b-modal="'clients'">
			<i class="icon-user"></i>
			Seleccionar cliente
		</b-button>
	</b-col>
</b-row>
</template>
<script>
export default {
	name: 'ButtonClients',
	computed: {
		articles() {
			return this.$store.state.vender.articles
		}
	}
}
</script>