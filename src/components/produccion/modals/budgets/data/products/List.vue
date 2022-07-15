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
				#cell(amount)="data">
					<b-form-input
					class="input-sm"
					type="number"
					v-model="products[data.index].amount"
					v-if="can_edit"></b-form-input>
					<span
					v-else>
						{{ products[data.index].amount }}
					</span>
				</template>
				<template 
				#cell(name)="data">
					<b-form-textarea
					rows="3"
					v-model="products[data.index].name"
					v-if="can_edit"></b-form-textarea>
					<span
					v-else>
						{{ products[data.index].name }}
					</span>
				</template>
				<template 
				#cell(price)="data">
					<b-form-input
					class="input-price"
					type="number"
					v-model="products[data.index].price"
					v-if="can_edit"></b-form-input>
					<span
					v-else>
						{{ products[data.index].price }}
					</span>
				</template>
				<template 
				#cell(bonus)="data">
					<b-form-input
					class="input-sm"
					type="number"
					v-model="products[data.index].bonus"
					v-if="can_edit"></b-form-input>
					<span
					v-else>
						{{ products[data.index].bonus }}
					</span>
				</template>
				<template 
				#cell(location)="data">
					<b-form-textarea
					v-model="products[data.index].location"
					v-if="can_edit"></b-form-textarea>
					<span
					v-else>
						{{ products[data.index].location }}
					</span>
				</template>
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
			<i class="icon-eye-slash"></i>
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
			if ((!this.edit || (this.edit.order_production)) && this.can('budgets.articles.price')) {
				fields = fields.concat([
					{key: 'price', label: 'Precio'},
					{key: 'bonus', label: 'Bonificacion'},
					{key: 'total', label: 'Total'},
				])
			}
			if (this.edit && !this.edit.order_production && this.can('order_productions.articles.price')) {
				fields = fields.concat([
					{key: 'price', label: 'Precio'},
					{key: 'bonus', label: 'Bonificacion'},
					{key: 'total', label: 'Total'},
				])
			}
			fields.push({key: 'location', label: 'Ubicacion'})
			fields.push({key: 'options', label: ''})
			return fields
		},
		items() {
			let items = []
			this.products.forEach(item => {
				items.push({
					bar_code: item.bar_code,
					amount: item.amount,
					price: this.price(item.price),
					bonus: this.bonus(item),
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
		},
		bonus(item) {
			if (item.bonus) {
				return item.bonus+'%'
			}
		}
	}
}
</script>
<style lang="sass">
.input-sm
	width: 80px !important
.input-price
	width: 110px !important
</style>