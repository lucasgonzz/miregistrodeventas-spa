<template>
	<p
	v-if="order_details.payment_method">
		Metodo de pago:
		<b-button
		v-if="order_details.payment_method.type"
		variant="link"
		@click="paymentMethodDetails">
			{{ order_details.payment_method.name }}
		</b-button>
		<span
		v-else>
			{{ order_details.payment_method.name }}
		</span>
	</p>
</template>
<script>
import orders from '@/mixins/orders'
export default {
	mixins: [orders],
	methods: {
		paymentMethodDetails() {
			this.$store.dispatch('online/orders/payment/getModel', this.order_details)
			this.$bvModal.show('payment-method-details')
		},
	}
}
</script>
