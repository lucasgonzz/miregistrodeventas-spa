<template>
<b-row
class="m-t-0">
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
			<!-- <template #cell(price)="data">
				<b-button 
				@click="updatePrice(articles[data.index])"
				variant="link">
					{{ price(articles[data.index].price_for_sale) }}
				</b-button>
			</template> -->
			<!-- <template #cell(total)="data">
				{{ price(items[data.index].price * items[data.index].amount) }}
			</template> -->
			<template #cell(options)="data">
				<b-button 
				@click="up(items[data.index])"
				variant="primary"
				class="btn-options"
				size="sm">
					<i class="icon-plus"></i>
				</b-button>
				<b-button 
				@click="down(items[data.index])"
				variant="primary"
				class="btn-options"
				size="sm">
					<i class="icon-minus"></i>
				</b-button>
				<b-button 
				@click="removeItem(items[data.index])"
				variant="danger"
				class="btn-options"
				size="sm">
					<i class="icon-trash"></i>
				</b-button>
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
export default {
	mixins: [vender],
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
				{ key: 'total', label: 'Total' },
				{ key: 'options', label: 'Opciones' },
			]
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
					price: this.price(item.price),
					name: item.name,
					amount: item.amount,
					total: this.price(item.price * item.amount),
				}
				items.push(item_to_add)
			})
			return items
		},
	},
	methods: {
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
.measurement 
	display: inline-block

.select-measurement 
	display: inline-block
	width: 100px

.input-amount-measurement 
	width: 90px
	display: inline-block
.input-total 
	width: 120px
	display: inline-block

</style>