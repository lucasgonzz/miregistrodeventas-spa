<template>
	<div
	class="m-t-15">
		<div
		v-if="product.article_stocks.length">
			<b-table
			responsive
			class="shadow-1 b-r-1"
			head-variant="dark"
			striped 
			:fields="fields"
			:items="items">
				<template 
				#cell(options)="data">
					<b-button
					size="sm"
					@click="deleteStock(product.article_stocks[data.index])"
					variant="danger">
						<i class="icon-trash"></i>
					</b-button>
				</template>
			</b-table> 
		</div>
		<p 
		v-else
		class="text-with-icon">
			<i class="icon-cancel"></i>
			No hay descuentos de stock		
		</p>
	</div>
</template>
<script>
import product_article_stocks from '@/mixins/product_article_stocks'
export default {
	mixins: [product_article_stocks],
	computed: {
		fields() {
			return [
				{key: 'date', label: 'Fecha', class: 'text-center'},
				{key: 'article', label: 'Articulo', class: 'text-center'},
				{key: 'amount', label: 'Cantidad', class: 'text-center'},
				{key: 'note', label: 'Nota', class: 'text-center'},
				{key: 'options', label: ''},
			]
		},
		items() {
			let items = []
			this.product.article_stocks.forEach(item => {
				items.push({
					date: this.date(item.created_at),
					article: item.article.name,
					amount: item.amount,
					note: item.note,
				})
			})
			return items
		},
	},
	methods: {
		deleteStock(delivery) {
			this.$store.commit('produccion/order_productions/product_article_stocks/setDelete', delivery)
			this.$bvModal.show('delete-article-stock')
		},
	}
} 
</script>