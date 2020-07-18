<template>
<div>
	<b-row>
		<b-col>
			<div class="table-responsive">
				<table class="table text-center table-striped">
					<thead>
						<tr>
							<th scope="col">Precio</th>
							<th scope="col">Nombre</th>
							<th scope="col" class="d-none d-md-table-cell">Cantidad</th>
							<th scope="col" class="d-none d-md-table-cell">Quedarian</th>
							<th scope="col">Opciones</th>
						</tr>
					</thead>
					<tbody>
						<tr 
						v-for="article in articles"
						:key="article.id">
							<td v-if="article.uncontable == 1"
							class="td-price">
								{{ price(article.price) }} el {{ article.measurement_original }}
							</td>
							<td v-else
							class="td-price">
								{{ price(article.price) }}
							</td>
							<td>{{ article.name }}</td>
							<td v-if="article.uncontable == 0"
							class="d-none d-md-table-cell">
								<span>
									{{ article.amount }}
								</span>
							</td>
							<td v-else
							class="d-none d-md-table-cell">
								<input 
								type="number" 
								:id="'amount-measurement-'+article.id"
								min="1"
								class="form-control input-amount-measurement m-r-5"
								@keyup.enter="calculateTotal"
								v-model="article.amount">
								<select 
								id="select-measurement" 
								v-model="article.measurement"
								class="form-control select-measurement m-r-5">
									<option value="gramo">Gramo(s)</option>
									<option value="kilo">Kilo(s)</option>	
								</select>
								<button @click="calculateTotal"
										class="btn btn-primary btn-sm">
									<i class="icon-check"></i>
								</button>
							</td>
							<td class="d-none d-md-table-cell">
								{{ article.quedarian }}
							</td>
							<td>
								<b-button @click="up(article)"
								v-show="article.uncontable == 0"
								variant="primary"
								class="btn-options"
								size="sm">
									<i class="icon-plus"></i>
								</b-button>
								<b-button @click="down(article)"
								v-show="article.uncontable == 0"
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
		</b-col>
	</b-row>
</div>
</template>
<script>
export default {
	props: ['articles', 'special_price_id'],
	watch: {
		special_price_id() {
			this.setArticlesPrice()
		}
	},
	methods: {
		// Se setea el precio especial del articulo para que ya le quede
		// asignado en el objeto y se envie a salecontroller@store
		setArticlesPrice() {
			this.articles.forEach(article => {
				if (this.special_price_id != 0) {
					if (article.special_prices.length) {
						article.special_prices.forEach(special_price => {
							if (special_price.id == this.special_price_id) {
								article.old_price = article.price
								article.price = special_price.pivot.price
							}
						})
					} else {
						article.old_price = article.price
					}
				} else {
					article.price = article.old_price
				}
			})
		},
		up(article) {
			article.amount++
			this.$emit('calculateTotal')
		},
		down(article) {
			if (article.amount > 1) {
				article.amount--
				this.$emit('calculateTotal')
			} else {
				// toastr.error('No se pueden restar mas unidades')
				this.removeArticle(article)
			}
		},
		removeArticle(article) {
			var i = this.articles.indexOf(article)
			this.articles.splice(i, 1)
			this.$emit('calculateTotal')
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
	width: 70px
	display: inline-block

</style>