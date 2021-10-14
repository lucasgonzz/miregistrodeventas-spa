<template>
<b-modal id="order-details" title="Detalles del pedido" hide-footer>
	<article-order
	v-for="article in order.articles"
	:key="article.key"
	:article="article"></article-order>
	<p
	v-if="order.cupons.length"
	v-for="cupon in order.cupons">
		Descuento 
		<span
		v-if="cupon.amount">
			de {{ price(cupon.amount) }}
		</span>
		<span
		v-if="cupon.percentage">
			del {{ cupon.percentage }}%
		</span>
	</p>
	<p>
		<strong>Total: {{ price(total(order)) }}</strong>
	</p>
	<p>
		<span v-show="order.payment_method == 'tarjeta'">
			Paga con tarjeta
		</span>
		<span v-show="order.payment_method == 'efectivo'">
			Paga en efectivo
		</span>
	</p>
	<p>
		<span v-if="order.deliver == 1">
			Para enviar a 
			<b-button
			@click="showMap(order.address)"
			variant="link">{{ getAddress(order.address) }}</b-button> 
		</span>
		<span v-else>
			Para retirar
		</span>
	</p>
	<p
	v-if="order.description">
		{{ user.order_description }}: {{ order.description }}
	</p>
	<p class="since">
		{{ since(order.created_at, true) }}
	</p>
	<b-button
	v-if="order.buyer"
	@click="sendMessage(order.buyer)"
	class="m-b-15 p-0"
	variant="link">
		Cliente: {{ order.buyer.name }}
	</b-button>
	<b-button
	v-if="order.status == 'unconfirmed'"
	block
	@click="confirm"
	variant="primary">
		<btn-loader
		text="Confirmar Pedido"
		:loader="loading">
		</btn-loader>
	</b-button>
	<b-button
	v-if="order.status == 'confirmed' && !order_status_error"
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
	<b-button
	@click="cancel(order)"
	block
	variant="danger">
		Cancelar Pedido
	</b-button>
</b-modal>
</template>
<script>
import ArticleOrder from '@/components/online/components/ArticleOrder'
import BtnLoader from '@/components/common/BtnLoader'
import Mixin from '@/mixins/online'
export default {
	components: {
		ArticleOrder,
		BtnLoader,
	},
	mixins: [Mixin],
	data() {
		return {
			loading: false,
		}
	},
	computed: {
		order() {
			return this.$store.state.online.orders.order_details
		},
		description() {
			if (this.order.description != '') {
				return this.order.description
			}
			return 'No'
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
		confirm() {
			this.loading = true
			this.$api.get(`/orders/confirm/${this.order.id}`)
			.then(() => {
				this.loading = false
				this.getOrders()
				this.$store.dispatch('online/messages/getMessages', this.order.buyer_id)
				this.$bvModal.hide('unconfirmed-order-details')
			})
			.catch(err => {
				this.loading = false
				console.log(err)
			})
		},
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
</style>