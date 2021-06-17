<template>
	<div>
		<b-row>
			<b-col
			cols="12">
				<articles-most-viewed></articles-most-viewed>
			</b-col>
		</b-row>
		<b-row>
			<b-col
			cols="12">
				<sub-categories-most-viewed></sub-categories-most-viewed>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import SubCategoriesMostViewed from '@/components/online/components/examine/SubCategoriesMostViewed'
import ArticlesMostViewed from '@/components/online/components/examine/ArticlesMostViewed'
export default {
	components: {
		SubCategoriesMostViewed,
		ArticlesMostViewed,
	},
}
</script>