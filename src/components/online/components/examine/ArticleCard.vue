<template>
	<b-card 
	no-body>
		<div class="img-container">
			<b-card-img :src="imageUrl(article, user)"></b-card-img>
		</div>
		<b-card-body>
			<div 
			class="name-heart">
				<p class="product-name">
					{{ article.name }}
				</p>
			</div>
			<p class="product-price">
				${{ article.price }}
			</p>
			<b-button 
			@click="views"
			class="product-views">
				<i class="icon-eye"></i>
				{{ article.views.length }}
			</b-button>
		</b-card-body>
	</b-card>
</template>
<script>
export default {
	name: 'ArticleCard',
	props: ['article'],
	computed: {
		user() {
			return this.$store.state.auth.user
		}
	},
	methods: {
		views() {
			this.$store.commit('articles/setArticleViews', this.article)
			this.$bvModal.show('views')
		}
	}
}
</script>
<style scoped lang="sass">
.card 
	cursor: pointer
	transition: all .2s
	width: 200px
	-webkit-box-shadow: 0px 0px 5px -3px rgba(0,0,0,0.75) !important
	-moz-box-shadow: 0px 0px 5px -3px rgba(0,0,0,0.75) !important
	box-shadow: 0px 0px 5px -3px rgba(0,0,0,0.75) !important
	@media screen and (max-width: 576px)
		border-radius: 0
.name-heart 
	.product-name 
		margin-bottom: 0
		font-size: 1em
	span 
		font-size: 1.8em
.product-price 
	margin-bottom: 0
	font-weight: bold
	font-size: 1em
	text-align: left
</style>