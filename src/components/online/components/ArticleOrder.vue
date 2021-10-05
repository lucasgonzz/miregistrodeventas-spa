<template>
	<b-card
	class="border-radius"
	no-body>
		<div class="card-body">
			<div class="img-container">
				<img 
				v-if="article.pivot.variant_id"
				:src="imageCropedUrlfromImage(getVariant(article))" alt="imagen-producto">
				<img 
				v-else
				:src="articleImageUrl(article)" alt="imagen-producto">
			</div>
			<div class="product-data-container">
				<p class="product-name">{{ articleName(article) }}</p>
				<p class="product-name">Cantidad: {{ article.pivot.amount }}</p>
				<div 
				v-if="article.color"
				:style="{backgroundColor: article.color.value}"
				class="color shadow-1 c-p m-t-10">
					<p>
						{{ article.color.name }}
					</p>
				</div>
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
import online from '@/mixins/online'
export default {
	name: 'ArticleOrder',
	props: ['article'],
	mixins: [Sales, online],
	computed: {
		user() {
			return this.$store.state.auth.user
		},
	},
	methods: {
	}
}
</script>
<style scoped lang="sass">
.card 
	border: none
	margin-bottom: 1em
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
		padding: 1em 
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