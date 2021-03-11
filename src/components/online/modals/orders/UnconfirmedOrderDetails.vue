<template>
<b-modal id="unconfirmed-order-details" title="Detalles del pedido" hide-footer>
	<article-order
	v-for="article in order.articles"
	:key="article.id"
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
	<b-button
	block
	@click="confirm"
	variant="primary">
		<span
		v-show="loading" 
		class="spinner-border spinner-border-sm"></span>
		<span
		v-show="!loading">
			Confirmar Pedido
		</span>
	</b-button>
	<b-button
	@click="cancel"
	block
	variant="danger">
		<btn-loader
		:loader="loading_cancel">
			Cancelar Pedido
		</btn-loader>
	</b-button>
</b-modal>
</template>
<script>
import ArticleOrder from '@/components/online/components/ArticleOrder'
import BtnLoader from '@/components/common/BtnLoader2'
import Mixin from '@/mixins/online'
export default {
	props: ['order'],
	components: {
		ArticleOrder,
		BtnLoader,
	},
	mixins: [Mixin],
	data() {
		return {
			loading: false,
			loading_cancel: false,
		}
	},
	computed: {
	},
	methods: {
		confirm() {
			this.loading = true
			this.$api.get(`/orders/confirm/${this.order.id}`)
			.then(() => {
				this.loading = false
				this.$emit('updateOrders')
				this.$bvModal.hide('unconfirmed-order-details')
			})
			.catch(err => {
				this.loading = false
				console.log(err)
			})
		},
		cancel() {
			this.loading_cancel = true
			this.$api.get(`/orders/cancel/${this.order.id}`)
			.then(() => {
				this.loading_cancel = false
				this.$emit('updateOrders')
				this.$bvModal.hide('unconfirmed-order-details')
			})
			.catch(err => {
				this.loading_cancel = false
				console.log(err)
			})
		}
	}
}
</script>
<style scoped lang="sass">
</style>