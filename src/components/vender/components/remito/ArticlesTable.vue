<template>
<b-row
class="m-b-15">
	<b-col>
		<b-table 
		class="shadow-2 b-r-1"
		v-if="items.length"
		:items="table_items" 
		head-variant="dark" 
		:fields="fields" 
		striped 
		responsive 
		hover>
			<template #cell(amount)="data">
				<b-input-group
				class="input-discount">
					<b-form-input
					@keyup="setTotal"
					@click="setTotal"
					type="number"
					min="0"
					v-model="items[data.index].amount"></b-form-input>
				</b-input-group>
			</template>
			<template #cell(discount)="data">
				<b-input-group
				class="input-discount"
				prepend="%">
					<b-form-input
					@keyup="setTotal"
					@click="setTotal"
					type="number"
					min="0"
					v-model="items[data.index].discount"></b-form-input>
				</b-input-group>
			</template>
			<template #cell(returned_amount)="data">
				<b-input-group
				class="input-discount">
					<b-form-input
					@keyup="setReturnedArticles(items[data.index])"
					@click="setReturnedArticles(items[data.index])"
					type="number"
					min="0"
					v-model="items[data.index].returned_amount"></b-form-input>
				</b-input-group>
			</template>
			<template #cell(delivered_amount)="data">
				<b-input-group
				class="input-discount">
					<b-form-input
					type="number"
					min="0"
					v-model="items[data.index].delivered_amount"></b-form-input>
				</b-input-group>
			</template>
			<template #cell(options)="data">
				<div class="options">
					<b-button 
					@click="removeItem(items[data.index])"
					variant="danger"
					class="btn-options"
					size="sm">
						<i class="icon-trash"></i>
					</b-button>
				</div>
			</template>
		</b-table>
		<div 
		v-else>
			<p
			class="text-with-icon-2">
				<i class="icon-clipboard"></i>
				Remito en blanco
			</p>
		</div>
	</b-col>
</b-row>
</template>
<script>
import vender from '@/mixins/vender'
import previus_sales from '@/mixins/previus_sales'
export default {
	mixins: [vender, previus_sales],
	watch: {
		special_price_id() {
			console.log('watcher de special_price_id')
			this.setArticlesPrice()
			this.$store.commit('vender/setTotal')
		},
	},
	computed: {
		special_price_id() {
			return this.$store.state.vender.special_price_id
		},
		articles() {
			return this.$store.state.vender.articles
		},
		combos() {
			return this.$store.state.vender.combos
		},
		fields() {
			let fields = [
				{ key: 'price', label: 'Precio' },
				{ key: 'name', label: 'Nombre' },
				{ key: 'amount', label: 'Cantidad' },
			]
			if (this.hasExtencion('sales.articles.discounts')) {
				fields.push(
					{ key: 'discount', label: 'Descuento' },
				)
			}
			if (this.index_previus_sales > 0) {
				fields.push(
					{ key: 'returned_amount', label: 'U. Devueltas' },
				)
				if (this.hasExtencion('acopios')) {
					fields.push(
						{ key: 'delivered_amount', label: 'U. Entregadas' },
					)
				}
			}
			fields = fields.concat([
				{ key: 'total', label: 'Total' },
				{ key: 'options', label: 'Opciones' },
			])
			return fields
		},
		items() {
			return this.$store.state.vender.items
		},
		table_items() {
			let items = []
			let item_to_add
			this.items.forEach(item => {
				item_to_add = {
					id: item.id,
					price: this.price(item.price_vender),
					name: item.name,
					// amount: item.amount,
					total: this.price(this.getTotalArticle(item)),
				}
				items.push(item_to_add)
			})
			return items
		},
	},
	methods: {
		setReturnedArticles(item) {
			this.setTotal()
			this.$store.commit('vender/addReturnedArticle', item)
			this.setNotaCreditoDescription()
		},
		setNotaCreditoDescription() {
			this.nota_credito_description = ''
			this.returned_articles.forEach(article => {
				if (this.nota_credito_description == '') {
					this.nota_credito_description = 'Devolucion de: '+article.returned_amount+' '+article.name 
				} else {
					this.nota_credito_description += ', '+article.returned_amount+' '+article.name 
				}
			})
		},
		setTotal() {
			this.$store.commit('vender/setTotal')
		},
		updatePrice(article) {
			this.$store.commit('vender/setUpdatePrice', article)
			this.$bvModal.show('update-price')
		},
		changeToTotal(article) {
			document.getElementById(`total-${article.id}`).focus()
		},
		up(item) {
			item.amount++
			this.$store.commit('vender/updateItem', item)
			this.$store.commit('vender/setTotal')
		},
		down(item) {
			if (item.amount > 1) {
				item.amount--
				this.$store.commit('vender/updateItem', item)
				this.$store.commit('vender/setTotal')
			} else {
				// toastr.error('No se pueden restar mas unidades')
				this.removeItem(article)
			}
		},
		removeItem(article) {
			this.$store.commit('vender/removeItem', article)
			this.$store.commit('vender/setTotal')
		},
		calculateTotalFromAmount(article) {
			article.calculate_from_total = false
			this.calculateTotal()
		},
		calculateTotalFromTotal(article) {
			article.calculate_from_total = true
			this.calculateTotal()
		},
		calculateTotal() {
			this.$emit('calculateTotal')
		},
		
	},
}
</script>
<style scoped lang="sass">
.td-price 
	position: relative
	font-weight: bold


.ticket-price 
	position: absolute
	font-size: 30px
	color: #E23535
	top: -5px
	left: 0px


.btn-options
	margin-right: 5px
	&:last-child
		margin-right: 0
	@media screen and (max-width: 576px)
		margin-bottom: 5px
		&:last-child
			margin-right: 0
.input-discount
	width: 110px
.options 
	width: 140px
</style>