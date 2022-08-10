<template>
	<b-button
	class="m-t-10"
	block 
	@click="setDelete"
	variant="danger">
		Eliminar
	</b-button>
</template>
<script>
import provider_orders from '@/mixins/provider_orders'
export default {
	mixins: [provider_orders],
	methods: {
		setDelete() {
			this.$store.commit('providers/orders/setDelete', this.edit_order)
			this.$bvModal.show('delete-provider-order')
			this.$bvModal.hide('provider-order')
		}
	}
}
</script>