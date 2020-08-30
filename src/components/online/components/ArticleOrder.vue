<template>
	<b-card>
		<div class="card-body">
			<div class="img-container">
				<img :src="imageUrl(article, user)" alt="imagen-producto">
			</div>
			<div class="product-data-container">
				<p class="product-name">{{ article.name }}</p>
				<p class="product-price">
					{{ price(article.price) }}
				</p>
			</div>
		</div>
	</b-card>
</template>
<script>
export default {
	name: 'ArticleOrder',
	props: ['article'],
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
		width: 25%
		min-height: 50px
	.product-data-container
		margin: auto
		display: flex
		flex-direction: column
		// padding: 1em 0
		@media screen and (max-width: 576px)
			padding: 1em
	.product-name, .product-price
		font-size: 1em
	.product-total
		font-size: 1.2em
	p 
		text-align: left
		margin-bottom: 0
	img 
		width: 100%	
</style>