<template>
	<b-card 
	no-body>
		<div class="card-body">
			<div class="img-container">
				<img :src="imageUrl(question.article, user)" alt="imagen-producto">
			</div>
			<div class="product-data-container">
				<p class="product-name">{{ question.article.name }}</p>
				<p class="product-price">
					${{ question.article.price }}
				</p>
				<p>
					<strong>
						{{ question.buyer.name }} {{ question.buyer.surname }} te hizo una pregunta
					</strong>
				</p>
				<b-button
				class="m-t-10"
				@click="answer"
				size="sm"
				block
				variant="primary">
					Ver y responder
				</b-button>
			</div>
		</div>
	</b-card>
</template>
<script>
export default {
	name: 'ArticleQuestion',
	props: ['question'],
	computed: {
		user() {
			return this.$store.state.auth.user
		}
	},
	methods: {
		answer() {
			this.$emit('answer', this.question)
		}
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
	// border: .1em solid rgba(0,0,0,.5) !important
.card-body
	background: #FFF
	padding: 0
	display: flex
	flex-wrap: wrap
	.img-container
		@media screen and (max-width: 576px)
			width: 100%
		@media screen and (min-width: 992px)
			width: 100%
			margin-right: 1em
	.product-data-container
		@media screen and (max-width: 576px)
			width: 100%
		@media screen and (min-width: 576px)
			margin: auto
		display: flex
		flex-direction: column
		padding: 1em 0
		justify-content: center
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