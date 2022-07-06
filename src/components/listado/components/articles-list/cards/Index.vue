<template>
<b-row>
	<b-col>
		<div
		v-if="!loading">
			<div 
			v-if="articles.length"
			class="cards-container">
				<article-card
				v-show="articles.length"
				v-for="article in articles"
				:article="article"></article-card>
			</div>
			<p 
			v-else
			class="text-with-icon">
				<i class="icon-not"></i>
				No hay artículos
			</p>
		</div>
		<div
		class="cards-container"
		v-else>
			<article-card-skeleton
			v-for="i in 10"></article-card-skeleton>
		</div>
	</b-col>
</b-row>
</template>
<script>
import ArticleCard from '@/components/listado/components/articles-list/cards/ArticleCard'
import ArticleCardSkeleton from '@/components/listado/components/articles-list/cards/ArticleCardSkeleton'
export default {
	names: 'ArticlesCards',
	props: ['articles', 'loading'],
	components: {
		ArticleCard,
		ArticleCardSkeleton,
	},
}
</script>
<style scoped lang="sass">
.cards-container
	display: flex
	flex-wrap: wrap
	justify-content: space-between
</style>