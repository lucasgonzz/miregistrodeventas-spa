<template>
	<div 
	class="article-card shadow-5 b-r-1"
	@click="editArticle(article)">
		<div class="img-container"
		v-if="article.images && article.images.length">
			<img 
			class="b-r-1"
			:src="articleImageUrl(article)">
		</div>
		<div class="text-container">
			<p>
				<span>Nombre: </span>
				{{ article.name }}
			</p>
			<p>
				<span>Costo: </span>
				{{ price(article.cost) }}
			</p>
			<p>
				<span>Precio: </span>
				{{ price(article.price) }}
			</p>
			<p>
				<span>Stock: </span>
				{{ price(article.stock) }}
			</p>
		</div>
	</div>
</template>
<script>
import edit_articles from '@/mixins/edit_articles'
export default {
	mixins: [edit_articles],
	props: ['article'],
}
</script>
<style scoped lang="sass">
.article-card
	padding: .5em
	display: flex
	@media screen and (max-width: 768px)
		width: 100%
		margin-bottom: 1em
	@media screen and (min-width: 768px)
		width: 47%
		margin: .5em
	.img-container
		width: 50%
		margin-right: .5em
		img
			width: 100%
	.text-container
		p 
			margin-bottom: 0
			span
				@media screen and (max-width: 470px)
					display: none
</style>