<template>
	<b-button
	@click="cancel()"
	block
	variant="danger">
		Cancelar Pedido
	</b-button>
</b-modal>
</template>
<script>
import orders from '@/mixins/orders'
export default {
	mixins: [orders],
	methods: {
		cancel() {
			this.$store.commit('online/orders/setCancel', this.order_details)
			this.$bvModal.show('cancel-order')
		},
	}
}
</script>
<style scoped lang="sass">
</style>