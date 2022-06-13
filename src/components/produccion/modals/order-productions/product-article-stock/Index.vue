<template>
<div>
    <confirm
    :text="text_delete"
    :actions="['produccion/order_productions/product_article_stocks/delete']"
    id="delete-article-stock"
    toast="Descuento de stock eliminado"></confirm>
	<create-product-article-stock></create-product-article-stock>
	<b-modal
	id="product-article-stocks"
	:title="title"
	size="lg"
	hide-footer> 
		<btn-create></btn-create>
		<list></list>
	</b-modal>
</div>
</template>
<script>
import product_article_stocks from '@/mixins/product_article_stocks' 

import Confirm from '@/components/common/Confirm'
import CreateProductArticleStock from '@/components/produccion/modals/order-productions/product-article-stock/Create'
import BtnCreate from '@/components/produccion/modals/order-productions/product-article-stock/BtnCreate'
import List from '@/components/produccion/modals/order-productions/product-article-stock/List'
export default {
	mixins: [product_article_stocks],
	components: {
		Confirm,
		CreateProductArticleStock,
		BtnCreate,
		List,
	},
	computed: {
		title() {
			return 'Descuentos de stock para '+this.product.name
		},
		text_delete() {
			return '¿Seguro quiere eliminar este descuento de stock?'
		},
	}
}
</script>