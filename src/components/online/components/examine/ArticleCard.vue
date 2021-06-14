<template>
	<b-card 
	no-body>
		<div class="img-container">
			<b-card-img :src="articleImageUrl(article)"></b-card-img>
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
			variant="primary"
			block
			v-show="article.views.length"
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
	methods: {
		views() {
			if (this.check()) {
				this.$store.commit('online/examine/setViewableToShowViews', this.article)
				this.$bvModal.show('views')
			}
		},
		check() {
			if (this.article.views.length >= 1) {
				return true
			} 
			this.$toast.error('No tiene vistas')
			return false
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