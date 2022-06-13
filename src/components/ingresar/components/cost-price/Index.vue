<template>
	<b-row>
		<article-cost
		:article="article"></article-cost>
		<article-price
		:article="article"></article-price>
	</b-row>
</template>
<script>
import ArticleCost from '@/components/ingresar/components/cost-price/Cost'
import ArticlePrice from '@/components/ingresar/components/cost-price/Price'
export default {
	props: ['article'],
	components: {
		ArticleCost,
		ArticlePrice,
	},
}
</script>