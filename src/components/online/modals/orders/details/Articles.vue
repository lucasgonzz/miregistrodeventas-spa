<template>
	<div class="cont-cards">
		<article-order
		v-for="article in order_details.articles"
		:key="article.id"
		:article="article"></article-order>
	</div>
</template>
<script>
import ArticleOrder from '@/components/online/components/ArticleOrder'
import orders from '@/mixins/orders'
export default {
	components: {
		ArticleOrder,
	},
	mixins: [orders],
}
</script>
