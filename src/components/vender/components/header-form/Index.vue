<template>
<b-row>
	<article-bar-code></article-bar-code>
	<article-name></article-name>
	<buttons></buttons>	
</b-row>
</template>
<script>
import ArticleBarCode from '@/components/vender/components/header-form/ArticleBarCode'
import ArticleName from '@/components/vender/components/header-form/ArticleName'
import Buttons from '@/components/vender/components/header-form/Buttons'
export default {
	components: {
		ArticleBarCode,
		ArticleName,
		Buttons,
	},
}
</script>