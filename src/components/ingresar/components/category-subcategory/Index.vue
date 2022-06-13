<template>
	<b-row
	v-if="can('categories')">
		<article-category
		:article="article"></article-category>
		<article-subcategory
		:article="article"></article-subcategory>
	</b-row>
</template>
<script>
import ArticleCategory from '@/components/ingresar/components/category-subcategory/Category'
import ArticleSubcategory from '@/components/ingresar/components/category-subcategory/Subcategory'
export default {
	props: ['article'],
	components: {
		ArticleCategory,
		ArticleSubcategory,
	},
}
</script>