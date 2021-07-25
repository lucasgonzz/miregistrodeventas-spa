<template>
<b-modal id="buyer-details" title="Detalles del cliente" hide-footer>
	<p>Nombre: {{ buyer.name }}</p>
	<p>Apellido: {{ buyer.surname }}</p>
	<p>Apellido: {{ buyer.surname }}</p>
</b-modal>
</template>
<script>
import Mixin from '@/mixins/online'
import BtnLoader from '@/components/common/BtnLoader'
export default {
	components: {
		BtnLoader
	},
	mixins: [Mixin],
	data() {
		return {
			articulos_faltantes: [],
			loading: false,
		}
	},
	computed: {
		order() {
			return this.$store.state.online.orders.unconfirmed_order_details
		}
	},
	methods: {
	}
}
</script>
<style scoped lang="sass">
.img-cont
	display: flex
	img 
		width: 300px
</style>