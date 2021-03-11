<template>
<b-row>
	<b-col>
		<div class="table-responsive" v-show="articles.length">
			<table class="table text-center table-striped">
				<thead>
					<tr>
						<th scope="col">Precio</th>
						<th scope="col">Nombre</th>
						<th scope="col" class="d-none d-md-table-cell">Cantidad</th>
						<th scope="col">Total</th>
						<th scope="col">Opciones</th>
					</tr>
				</thead>
				<tbody>
					<tr 
					v-for="article in articles"
					:key="article.id">
						<td
						class="td-price">
							{{ price(article.price) }}
						</td>
						<td>{{ article.name }}</td>
						<td class="d-none d-md-table-cell">
							<span>
								{{ article.amount }}
							</span>
						</td>
						<td>
							{{ price(article.price * article.amount) }}
						</td>
						<td>
							<b-button @click="up(article)"
							variant="primary"
							class="btn-options"
							size="sm">
								<i class="icon-plus"></i>
							</b-button>
							<b-button @click="down(article)"
							variant="primary"
							class="btn-options"
							size="sm">
								<i class="icon-minus"></i>
							</b-button>
							<b-button @click="removeArticle(article)"
							variant="danger"
							class="btn-options"
							size="sm">
								<i class="icon-cancel"></i>
							</b-button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div v-show="articles.length == 0">
			<p
			class="empty-articles">
				<i class="icon-clipboard-1"></i>
				Remito en blanco
			</p>
		</div>
	</b-col>
</b-row>
</template>
<script>
export default {
	watch: {
		special_price_id() {
			this.setArticlesPrice()
			this.$store.commit('vender/setTotal')
		},
		articles() {
			this.setArticlesPrice()
		}
	},
	computed: {
		special_price_id() {
			return this.$store.state.vender.special_price_id
		},
		articles() {
			return this.$store.state.vender.articles
		}
	},
	methods: {
		// Se setea el precio especial del articulo para que ya le quede
		// asignado en el objeto y se envie a salecontroller@store
		setArticlesPrice() {
			this.articles.forEach(article => {
				article.price = article.original_price
				if (this.special_price_id != 0) {
					if (article.special_prices.length) {
						article.special_prices.forEach(special_price => {
							if (special_price.id == this.special_price_id) {
								article.price = special_price.pivot.price
							}
						})
					}
				}
			})
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
.empty-articles
	font-size: 2em
	text-align: center
	i 
		font-size: 3em
		display: block
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