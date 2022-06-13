<template>
<b-row>
	<article-bar-code></article-bar-code>
	<article-name></article-name>
	<combos></combos>
	<buttons></buttons>	
</b-row>
</template>
<script>
import ArticleBarCode from '@/components/vender/components/header-form/ArticleBarCode'
import ArticleName from '@/components/vender/components/header-form/ArticleName'
import Combos from '@/components/vender/components/header-form/Combos'
import Buttons from '@/components/vender/components/header-form/Buttons'
export default {
	components: {
		ArticleBarCode,
		ArticleName,
		Combos,
		Buttons,
	},
}
</script>