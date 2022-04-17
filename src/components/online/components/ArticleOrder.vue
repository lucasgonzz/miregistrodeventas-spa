<template>
	<b-card
	class="b-r-1 shadow"
	no-body>
		<div class="card-body">
			<div class="img-container">
				<img 
				:src="article_image" alt="imagen-producto">
			</div>
			<div class="product-data-container">
				<p class="product-name">{{ articleName(article) }}</p>
				<p class="amount">Cantidad: {{ article.pivot.amount }}</p>
				<p
				v-if="article.size"
				class="amount">
					Talle: {{ article.size.value }}
				</p>
				<div 
				v-if="article.color"
				:style="{backgroundColor: article.color.value}"
				class="color shadow-1 c-p m-t-10">
					<p>
						{{ article.color.name }}
					</p>
				</div>
				<p class="price">
					{{ articlePrice(article, true) }}
				</p>
				<p 
				v-show="article.pivot.amount > 1"
				class="product-total">
					Total: {{ price(articlePrice(article, true, false) * article.pivot.amount) }}
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
		article_image() {
			if (this.article.pivot.variant_id) {
				return this.imageCropedUrlfromImage(this.getVariant(this.article))
			} else {
				if (this.article.color) {
					let images = this.getImagesFromSelectedColor(this.article)
					return this.imageUrl(images[0].url, true)
				}
				return this.articleImageUrl(this.article)
			}
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
	.product-name
		font-size: 1.2em
	.price
		font-size: 1.4em
	.amount
		font-size: 1em
	.product-total
		font-size: 1.2em
		font-weight: bold
	p 
		text-align: left
		margin-bottom: 0
	img 
		width: 100%	
</style>