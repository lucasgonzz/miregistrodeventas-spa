<template>
	<b-card
	@click="orderDetails(order)"
	class="order-card shadow-2 border-radius-1 c-p apretable"
	no-body>
		<div
		class="card-body">
			<p
			class="buyer-name">
				<strong>{{ buyerName(order) }}</strong>
			</p>
			<hr>
			<p>
				{{ totalArticles(order) }} articulos
			</p>
			<p>
				<span v-if="order.deliver == 1">
					Para enviar 
				</span>
				<span v-else>
					Para retirar
				</span>
			</p>
			<p>
				<strong>
					Total: {{ price(total(order)) }}
				</strong>
			</p>
			<p 
			v-show="hasPaymentUpdated(order)">
				Se actualizado el pago
			</p>
			<slot></slot>
			<p class="since">
				{{ since(order.created_at, true) }}
			</p>
		</div>
	</b-card>
</template>
<script>
import Mixin from '@/mixins/online'
export default {
	mixins: [Mixin],
	props: ['order'],
	methods: {
		orderDetails() {
			this.$store.commit('online/orders/setOrderDetails', this.order)
			setTimeout(() => {
				this.$bvModal.show('order-details')
			}, 100)
		}
	},
}
</script>