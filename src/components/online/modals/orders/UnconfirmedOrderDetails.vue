<template>
<b-modal id="unconfirmed-order-details" title="Detalles del pedido" hide-footer>
	<article-order
	v-for="article in order.articles"
	:key="article.key"
	:article="article"></article-order>
	<p>
		<strong>
			Total: {{ price(total(order)) }}
		</strong>
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
	<p
	v-if="order.description">
		Envolver: {{ description }}
	</p>
	<p class="since">
		{{ since(order.created_at) }}
	</p>
	<b-button
	block
	@click="confirm"
	variant="primary">
		<btn-loader
		text="Confirmar Pedido"
		:loader="loading">
		</btn-loader>
	</b-button>
	<b-button
	@click="cancel"
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
			return this.$store.state.online.orders.unconfirmed_order_details
		},
		description() {
			if (this.order.description != '') {
				return this.order.description
			}
			return 'No'
		}
	},
	methods: {
		confirm() {
			this.loading = true
			this.$api.get(`/orders/confirm/${this.order.id}`)
			.then(() => {
				this.loading = false
				this.getOrders()
				this.$bvModal.hide('unconfirmed-order-details')
			})
			.catch(err => {
				this.loading = false
				console.log(err)
			})
		},
		cancel() {
			this.$bvModal.show('cancel-order')
		}
	}
}
</script>
<style scoped lang="sass">
</style>