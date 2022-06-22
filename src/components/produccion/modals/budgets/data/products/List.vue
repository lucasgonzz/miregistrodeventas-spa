<template>
	<div
	class="m-t-15"
	v-if="sub_view == 'productos'">
		<div
		v-if="products.length">
			<b-table
			responsive
			class="shadow-1 b-r-1"
			head-variant="dark"
			striped 
			:fields="fields"
			:items="items">
				<template 
				v-if="can_edit || show_btn_production"
				#cell(options)="data">
					<b-button
					v-if="can_edit"
					size="sm"
					@click="deleteProduct(products[data.index])"
					variant="danger">
						<i class="icon-trash"></i>
					</b-button>
					<b-dropdown 
					v-if="show_btn_production"
					right
					size="lg"
					variant="link" 
					toggle-class="text-decoration-none" 
					no-caret>
						<template #button-content>
						 <i class="icon-dots p-r-5"></i>
						</template>
						<b-dropdown-item
						@click="productArticleStock(products[data.index])">
							Descontar stock
						</b-dropdown-item>
						<b-dropdown-item
						@click="productDelivery(products[data.index])">
							Entregas ({{ products[data.index].deliveries.length }})
						</b-dropdown-item>
					</b-dropdown>
				</template>
			</b-table> 
			<p class="title">
				Total: {{ getTotal(products) }}
			</p>
		</div>
		<p 
		v-else
		class="text-with-icon">
			<i class="icon-cancel"></i>
			No hay productos ingresados			
		</p>
	</div>
</template>
<script>
import budgets from '@/mixins/budgets'
import product_deliveries from '@/mixins/product_deliveries'
export default {
	mixins: [budgets, product_deliveries],
	computed: {
		fields() {
			let fields = [
				{key: 'bar_code', label: 'Codigo'},
				{key: 'amount', label: 'Cantidad'},
				{key: 'name', label: 'Nombre'},

			]
			if (this.can('order_productions.articles.price')) {
				fields = fields.concat([
					{key: 'price', label: 'Precio'},
					{key: 'bonus', label: 'Bonificacion'},
					{key: 'total', label: 'Total'},
				])
			}
			fields.push({key: 'options', label: 'Opciones'})
			return fields
		},
		items() {
			let items = []
			this.products.forEach(item => {
				items.push({
					bar_code: item.bar_code,
					amount: item.amount,
					name: item.name,
					price: this.price(item.price),
					bonus: item.bonus,
					total: this.getProductTotal(item),
					_rowVariant: this.getRowVariant(item),
				})
			})
			return items
		},
	},
	methods: {
		deleteProduct(product) {
			this.$store.commit('produccion/budgets/create/deleteProduct', product)
		},
		productDelivery(product) {
			this.$store.commit('produccion/order_productions/product_deliveries/setModel', product)
			this.$bvModal.show('product-deliveries')
		},
		productArticleStock(product) {
			this.$store.commit('produccion/order_productions/product_article_stocks/setModel', product)
			this.$bvModal.show('product-article-stocks')
		},
		getRowVariant(product) {
			if (this.order_production_status && this.getTotalDeliveries(product) == product.amount) {
				return 'success'
			}
		}
	}
}
</script>