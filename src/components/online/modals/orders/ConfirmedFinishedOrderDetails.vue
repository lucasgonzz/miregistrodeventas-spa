<template>
<b-modal id="confirmed-finished-order-details" title="Detalles del pedido" hide-footer>
	<article-order
	v-for="article in order.articles"
	:key="article.key"
	:article="article"></article-order>
	<p class="total">
		Total: {{ price(total(order)) }}
	</p>
	<div
	v-if="order.payment_method == 'tarjeta'">
		<p>
			Paga con tarjeta
		</p>
		<p>
			Estado del pago: {{ order_status }}
		</p>
	</div>
	<p
	v-if="order.payment_method == 'efectivo'">
		Paga en efectivo
	</p>
	<p>
		<span v-if="order.deliver == 1">
			Para enviar a {{ order.address }} {{ order.address_number }}
		</span>
		<span v-else>
			Para retirar
		</span>
	</p>
	<p
	v-if="order.description">
		Observaciones: {{ order.description }}
	</p>
	<p class="since">
		{{ since(order.created_at) }}
	</p>
	<b-button
	v-show="order.status == 'confirmed' && !order_status_error"
	block
	@click="finish"
	variant="primary">
		<span
		v-show="loading" 
		class="spinner-border spinner-border-sm"></span>
		<span
		v-show="!loading && order.deliver">
			Listo para enviar
		</span>
		<span
		v-show="!loading && !order.deliver">
			Listo para retirar
		</span>
	</b-button>
</b-modal>
</template>
<script>
import ArticleOrder from '@/components/online/components/ArticleOrder'
import Mixin from '@/mixins/online'
export default {
	name: 'ConfirmedFinishedOrderDetails',
	components: {
		ArticleOrder
	},
	mixins: [Mixin],
	data() {
		return {
			loading: false
		}
	},
	computed: {
		order() {
			return this.$store.state.online.orders.confirmed_finished_order_details
		},
		order_status() {
			let payment = this.order.payment
			if (payment) {
				if (payment.status == 'approved') {
					return 'Aprovado'
				}
				if (payment.status == 'in_process') {
					return 'Procesandose'
				}
				if (payment.status == 'rejected') {
					return `Rechazado, ya se notifico a ${this.order.buyer.name}, cuando corriga el pago se eliminara este pedido y va a llegar uno nuevo`
				}
				return `No se pudo procesar el pago, ya se notifico a ${this.order.buyer.name}, cuando corriga el pago se eliminara este pedido y llegara el nuevo`
			}
			return null
		},
		order_status_error() {
			let payment = this.order.payment
			if (payment) {
				if (payment.status == 'rejected') {
					return true
				}
			}
			return false
		}
	},
	methods: {
		finish() {
			this.loading = true
			this.$api.get(`/orders/finish/${this.order.id}`)
			.then(() => {
				this.loading = false
				this.$store.dispatch('online/orders/getConfirmedFinishedOrders')
				this.$bvModal.hide('confirmed-finished-order-details')
			})
			.catch(err => {
				console.log(err)
			})
		}
	}
}
</script>
<style scoped lang="sass">
.total 
	font-size: 1.2em
	font-weight: bold
	margin: 1em 0 
.deliver 
	font-size: 1.2em
</style>