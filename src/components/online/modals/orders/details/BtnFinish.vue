<template>
	<b-button
	v-if="order_details.status == 'confirmed'"
	block
	@click="finish"
	variant="primary">
		<span
		v-show="loading" 
		class="spinner-border spinner-border-sm"></span>
		<span
		v-show="!loading && order_details.deliver">
			Listo para enviar
		</span>
		<span
		v-show="!loading && !order_details.deliver">
			Listo para retirar
		</span>
	</b-button>
</b-modal>
</template>
<script>
import orders from '@/mixins/orders'
export default {
	mixins: [orders],
	data() {
		return {
			loading: false,
		}
	},
	methods: {
		finish() {
			this.loading = true
			this.$api.get(`/orders/finish/${this.order_details.id}`)
			.then(() => {
				this.loading = false
				this.$store.dispatch('online/orders/getConfirmedFinishedOrders')
				this.$bvModal.hide('order-details')
			})
			.catch(err => {
				console.log(err)
			})
		}
	}
}
</script>
<style scoped lang="sass">
</style>