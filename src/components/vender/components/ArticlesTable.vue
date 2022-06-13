<template>
<b-row
class="m-t-0">
	<b-col>
		<b-table 
		class="shadow-2 b-r-1"
		v-show="articles.length"
		:items="items" 
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
			<template #cell(options)="data">
				<b-button 
				@click="up(articles[data.index])"
				variant="primary"
				class="btn-options"
				size="sm">
					<i class="icon-plus"></i>
				</b-button>
				<b-button 
				@click="down(articles[data.index])"
				variant="primary"
				class="btn-options"
				size="sm">
					<i class="icon-minus"></i>
				</b-button>
				<b-button 
				@click="removeArticle(articles[data.index])"
				variant="danger"
				class="btn-options"
				size="sm">
					<i class="icon-trash"></i>
				</b-button>
			</template>
		</b-table>
		<div 
		v-show="!articles.length">
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
			let items = []
			this.articles.forEach(article => {
				items.push({
					id: article.id,
					price: this.price(article.price_for_sale),
					name: article.name,
					amount: article.amount,
					total: this.price(article.price_for_sale * article.amount),
				})
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
		up(article) {
			article.amount++
			this.$store.commit('vender/updateArticle', article)
			this.$store.commit('vender/setTotal')
		},
		down(article) {
			if (article.amount > 1) {
				article.amount--
				this.$store.commit('vender/updateArticle', article)
				this.$store.commit('vender/setTotal')
			} else {
				// toastr.error('No se pueden restar mas unidades')
				this.removeArticle(article)
			}
		},
		removeArticle(article) {
			let index = this.articles.findIndex(art => {
				return art.id == article.id
			})
			this.$store.commit('vender/removeArticle', index)
			this.$store.commit('vender/setTotal')
			// var i = this.articles.indexOf(article)
			// this.articles.splice(i, 1)
			// this.$emit('calculateTotal')
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