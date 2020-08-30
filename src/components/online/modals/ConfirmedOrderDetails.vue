<template>
	<b-modal id="confirmed-order-details" title="Detalles del pedido" hide-footer>
		<b-container fluid>
			<b-row>
				<b-col>
					<article-order
					v-for="article in order.articles"
					:key="article.id"
					:article="article"></article-order>
					<p class="total">
						Total: {{ total }}
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
							Pedido terminado
						</span>
					</b-button>
				</b-col>
			</b-row>
		</b-container>
	</b-modal>
</template>
<script>
import ArticleOrder from '@/components/online/components/ArticleOrder'
export default {
	props: ['order'],
	components: {
		ArticleOrder
	},
	data() {
		return {
			loading: false
		}
	},
	computed: {
		total() {
			if (this.order.articles) {
				let total = 0
				this.order.articles.forEach(article => {
					total += article.pivot.price * article.pivot.amount 
				})
				return this.price(total)
			}
			return null
		}
	},
	methods: {
		confirm() {
			console.log('Confirm')
			this.loading = true
			this.$api.get(`/orders/confirm/${this.order.id}`)
			.then(res => {
				this.loading = false
				this.$emit('getUnconfirmedOrders')
				console.log(res)
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
</style>