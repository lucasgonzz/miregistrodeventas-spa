<template>
<b-modal
size="xl"
title="Articulos sin stock"
id="stock-0"
hide-footer>
	<articles-list
	:articles="stock_0"></articles-list>
</b-modal>
</template>
<script>
import ArticlesList from '@/components/listado/components/articles-list/Index'

import articles_stock from '@/mixins/articles_stock'
export default {
	name: 'Stock0',
	mixins: [articles_stock],
	components: {
		'articles-list': ArticlesList,
	}, 
}
</script>