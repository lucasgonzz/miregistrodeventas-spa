<template>
	<b-card
	no-body>
		<b-card-header>
			<b-form 
			@submit.prevent="getArticles"
			class="p-15"
			inline>
				<label>Articulos mas vistos de </label>
				<b-form-input
				v-model="weeks_ago"
				class="input"
				min="1"
				type="number"></b-form-input>
				<label>semana/s atras</label>
				<b-button
				type="submit"
				variant="primary"
				class="m-l-15">
					Buscar
				</b-button>
			</b-form>
		</b-card-header>
		<ul
		v-if="loading" 
		class="horizontal-ul">
			<li
			v-for="i in 3"
			:key="i+'0'">
				<b-card
				class="order">
					<b-skeleton width="100%"></b-skeleton>
					<b-skeleton width="100%"></b-skeleton>
				</b-card>
			</li>
		</ul>
		<ul 
		v-else
		class="horizontal-ul">
			<li
			v-for="article in articles"
			:key="article.id">
				<article-card
				:article="article"></article-card>
			</li>
		</ul>
	</b-card>
</template>
<script>
import ArticleCard from '@/components/online/components/examine/ArticleCard'
export default {
	components: {
		ArticleCard,
	},
	computed: {
		articles() {
			return this.$store.state.online.examine.articles_most_viewed
		},
		loading() {
			return this.$store.state.online.examine.loading_articles_most_viewed
		},
		weeks_ago: {
			get() {
				return this.$store.state.online.examine.articles_most_viewed_weeks_ago
			},
			set(value) {
				this.$store.commit('online/examine/setArticlesMostViewedWeeksAgo', value)
			}
		},
	},
	methods: {
		getArticles() {
			this.$store.dispatch('online/examine/getArticlesMostViewed')
		},
		delivered(order) {
			this.loading_deliver = true
			this.$api.get(`/orders/deliver/${order.id}`)
			.then(res => {
				this.loading_deliver = false
				this.$store.commit('sales/addSale', res.data.sale)
				this.$store.dispatch('online/orders/getConfirmedFinishedOrders')
			})
			.catch(err => {
				this.loading_deliver = false
				console.log(err)
			})
		},
		orderDetails(order) {
			// if (order.status == 'confirmed') {
				this.$store.commit('online/orders/setConfirmedFinishedOrderDetails', order)
				this.$bvModal.show('confirmed-finished-order-details')
			// }
		}
	},
}
</script>
<style scoped lang="sass">
.input 
	width: 70px
	margin: 0 1em
</style>