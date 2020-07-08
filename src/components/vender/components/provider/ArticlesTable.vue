<template>
<div class="row" v-show="!loading_articles && articles.length">
	<div class="col">
		<table class="table text-center table-striped">
			<thead>
				<tr>
					<th scope="col">Nombre</th>
					<th scope="col">Precio</th>
					<th scope="col">Cantidad</th>
					<th scope="col">Subtotal</th>
					<th scope="col">Opciones</th>
				</tr>
			</thead>
			<tbody class="vender-table">
				<tr v-for="article in articles">
					<td>{{ article.name }}</td>

					<!-- td del precio -->
					<td v-if="article.uncontable == 1"
						class="td-price">
						<template v-if="article.offer_price"
								class="text-danger">
							<i class="icon-sale-ticket ticket-price"></i>
							{{ price(article.offer_price) }} el {{ article.measurement }}
						</template>
						<template v-else>
								{{ price(article.price) }} el {{ article.measurement_original }}
						</template>
					</td>
					<td v-else
						class="td-price">
						<template v-if="article.offer_price"
								class="text-danger">
							<i class="icon-sale-ticket ticket-price"></i>
							{{ price(article.offer_price) }}
						</template>
						<template v-else>
							{{ price(article.price) }}
						</template>
					</td>
					<!-- Termina td de precio -->

					<!-- td cantidad -->
					<td v-if="article.uncontable == 0">
						{{ article.amount }}
					</td>
					<td v-else>
						<input type="number" 
								:id="'amount-measurement-'+article.id"
								min="1"
								class="form-control input-amount-measurement"
								@keyup.enter="calculateTotal"
								v-model="article.amount">
						<select id="select-measurement" 
								v-model="article.measurement"
								class="form-control select-measurement">
							<option value="gramo">Gramo(s)</option>		
							<option value="kilo">Kilo(s)</option>	
						</select>
						<button @click="calculateTotal"
								class="btn btn-primary btn-sm">
							<i class="icon-check"></i>
						</button>
					</td>
					<!-- Termina td de cantidad -->

					<td>
						{{ getSubTotal(article) }}
					</td>
					<td>
						<button @click="up(article)"
								class="btn btn-primary btn-sm">
							<i class="icon-plus"></i>
						</button>
						<button @click="down(article)"
								class="btn btn-primary btn-sm">
							<i class="icon-minus"></i>
						</button>
						<button @click="removeArticle(article)"
								class="btn btn-danger">
							<i class="icon-cancel"></i>
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
</template>
<script>
export default {
	props: ['loading_articles', 'articles'],
	data() {
		return {

		}
	},
	methods: {

		getSubTotal(article) {
			var price = 0
			if (article.offer_price) {
				price = parseFloat(article.offer_price)
			} else {
				price = parseFloat(article.price)
			}
			var amount = parseFloat(article.amount)

			if (article.uncontable == 0) {
				return this.price(price * amount)
			} else {
				if (article.measurement == article.measurement_original) {
					return this.price(price * amount)
				} else {
					return this.price(price * amount / 1000)
				}
			}
		},
		/*
		|----------------------------------------------------------------
		| Aumentar y decrementar unidades de los articulos
		|----------------------------------------------------------------
		|
		*/
		up(article) {
			article.amount++
			this.calculateTotal()
			// this.addTotal(article, true)
		},
		down(article) {
			if (article.amount > 1) {
				article.amount--
				this.calculateTotal()
			} else {
				toastr.error('No se pueden restar mas unidades')
			}
		},
		removeArticle(article) {
			// this.total -= Number(article.price) * article.amount
			// this.cantidad_articulos--
			// this.cantidad_unidades -= article.amount
			var i = this.articles.indexOf(article)
			this.articles.splice(i, 1)
			this.calculateTotal()
		},

		calculateTotal() {
			this.$emit('calculateTotal')
		},

	},
}
</script>
<style scoped>

.td-price {
	position: relative;
	font-weight: bold;
}

.ticket-price {
	position: absolute;
	font-size: 30px;
	color: #E23535;
	top: -5px;
	left: 0px;
}

.input-amount{
	display: inline-block;
	width: 70px;
	margin: 0px;
}

.measurement {
	display: inline-block;
}
.select-measurement {
	display: inline-block;
	width: 100px;
}
.input-amount-measurement {
	width: 70px;
	display: inline-block;
}
</style>