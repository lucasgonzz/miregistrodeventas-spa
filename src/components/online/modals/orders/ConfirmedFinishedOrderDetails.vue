<template>
<b-modal id="confirmed-finished-order-details" title="Detalles del pedido" hide-footer>
	<article-order
	v-for="article in order.articles"
	:key="article.key"
	:article="article"></article-order>
	<p class="total">
		Total: {{ price(total(order)) }}
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
			Para enviar a {{ order.address }} {{ order.address_number }}
		</span>
		<span v-else>
			Para retirar
		</span>
	</p>
	<p class="since">
		{{ since(order.created_at) }}
	</p>
	<b-button
	v-show="order.status == 'confirmed'"
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