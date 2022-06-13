<template>
	<div
	class="m-t-15"
	v-if="sub_view == 'productos'">
		<div
		v-if="budget_prop.products.length">
			<b-table
			responsive
			class="shadow-1 b-r-1"
			head-variant="dark"
			striped 
			:fields="fields"
			:items="items">
				<template 
				v-if="show_btn_delete || show_btn_production"
				#cell(options)="data">
					<b-button
					v-if="show_btn_delete"
					size="sm"
					@click="deleteProduct(budget_prop.products[data.index])"
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
						@click="productArticleStock(budget_prop.products[data.index])">
							Descontar stock
						</b-dropdown-item>
						<b-dropdown-item
						@click="productDelivery(budget_prop.products[data.index])">
							Entregas ({{ budget_prop.products[data.index].deliveries.length }})
						</b-dropdown-item>
					</b-dropdown>
				</template>
			</b-table> 
			<p class="title">
				Total: {{ getTotal(budget_prop) }}
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
	props: {
		budget_prop: {
			type: Object,
		},
		show_btn_delete: {
			type: Boolean,
		},
		show_btn_production: {
			type: Boolean,
		},
	},
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
			this.budget_prop.products.forEach(item => {
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
			let index = this.budget_prop.products.findIndex(item => {
				return item.id == product.id
			})
			console.log(index)
			if (index != -1) {
				this.budget_prop.products.splice(index, 1)
			}
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