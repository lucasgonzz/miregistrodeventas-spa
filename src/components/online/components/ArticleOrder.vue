<template>
	<b-card>
		<div class="card-body">
			<div class="img-container">
				<img :src="imageUrl(article, user)" alt="imagen-producto">
			</div>
			<div class="product-data-container">
				<p class="product-name">{{ amount(article.pivot.amount) }} {{ article.name }}</p>
				<p class="product-price">
					{{ price(article.pivot.price) }}
				</p>
				<p 
				v-show="article.pivot.amount > 1"
				class="product-total">
					Total: {{ price(article.pivot.price * article.pivot.amount) }}
				</p>
			</div>
		</div>
	</b-card>
</template>
<script>
import Sales from '@/mixins/sales'
export default {
	name: 'ArticleOrder',
	props: ['article'],
	mixins: [Sales],
	computed: {
		user() {
			return this.$store.state.auth.user
		}
	},
	methods: {
	}
}
</script>
<style scoped lang="sass">
.card 
	border: none
	margin: .5em 0
	-webkit-box-shadow: 0px 0px 5px -2px rgba(0,0,0,0.75)
	-moz-box-shadow: 0px 0px 5px -2px rgba(0,0,0,0.75)
	box-shadow: 0px 0px 5px -2px rgba(0,0,0,0.75)
.card-body
	background: #FFF
	padding: 0
	display: flex
	flex-wrap: wrap
	.img-container
		width: 35%
		min-height: 50px
	.product-data-container
		width: 65%
		display: flex
		flex-direction: column
		justify-content: space-around
		padding: 1em 0
		@media screen and (max-width: 576px)
			padding: 1em
	.product-name, .product-price
		font-size: 1.2em
	.product-total
		font-size: 1.2em
		font-weight: bold
	p 
		text-align: left
		margin-bottom: 0
	img 
		width: 100%	
</style>