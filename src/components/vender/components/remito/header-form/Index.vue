<template>
<b-row
class="m-b-15">
	<article-bar-code></article-bar-code>
	<article-name></article-name>
	<combos></combos>
	<services></services>
	<buttons></buttons>	
</b-row>
</template>
<script>
import ArticleBarCode from '@/components/vender/components/remito/header-form/ArticleBarCode'
import ArticleName from '@/components/vender/components/remito/header-form/ArticleName'
import Combos from '@/components/vender/components/remito/header-form/Combos'
import Services from '@/components/vender/components/remito/header-form/Services'
import Buttons from '@/components/vender/components/remito/header-form/Buttons'
export default {
	components: {
		ArticleBarCode,
		ArticleName,
		Combos,
		Services,
		Buttons,
	},
}
</script>