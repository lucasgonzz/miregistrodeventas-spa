<template>
<b-modal
size="xl"
title="Articulos con stock minimo"
id="stock-min"
hide-footer>
	<articles-list
	:articles="stock_min"></articles-list>
</b-modal>
</template>
<script>
import ArticlesList from '@/components/listado/components/articles-list/Index'

import articles_stock from '@/mixins/articles_stock'
export default {
	name: 'StockMin',
	mixins: [articles_stock],
	components: {
		'articles-list': ArticlesList,
	}, 
}
</script>