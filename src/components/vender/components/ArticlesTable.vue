<template>
<div>
	<div class="row d-none d-md-block" v-if="!loading_articles && articles.length">
		<div class="col">
			<table class="table text-center table-striped">
				<thead>
					<tr>
						<th scope="col">Precio</th>
						<th scope="col">Nombre</th>
						<th scope="col">Cantidad</th>
						<th scope="col">Quedarian</th>
						<th scope="col">Opciones</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="article in articles">
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
						<td>{{ article.name }}</td>
						<td v-if="article.uncontable == 0">
							<span>
								{{ article.amount }}
							</span>
							<!-- <input type="number" 
									min="1"
									class="form-control input-amount"
									v-model="article.amount"> -->
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
						<td>
							{{ article.quedarian }}
						</td>
						<td>
							<button @click="up(article)"
									v-show="article.uncontable == 0"
									class="btn btn-primary btn-sm">
								<i class="icon-plus"></i>
							</button>
							<button @click="down(article)"
									v-show="article.uncontable == 0"
									class="btn btn-primary btn-sm">
								<i class="icon-minus"></i>
							</button>
							<button @click="removeArticle(article)"
									class="btn btn-danger btn-sm">
								<i class="icon-cancel"></i>
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="row d-md-none">
		<div class="col">
			<ul class="list-group list-group-border m-b-10" v-for="article in articles">
				<li class="list-group-item active article-name">
					{{ article.name }}
				</li>
				<li class="list-group-item">
					<!-- Precio -->
					<p v-if="article.uncontable == 1"
						class="p-price-mobile">
						<template v-if="article.offer_price"
								class="text-danger">
							<i class="icon-sale-ticket ticket-price"></i>
							{{ price(article.offer_price) }} el {{ article.measurement }}
						</template>
						<template v-else>
								{{ price(article.price) }} el {{ article.measurement_original }}
						</template>
					</p>
					<p v-else
						class="p-price-mobile">
						<template v-if="article.offer_price"
								class="text-danger">
							<i class="icon-sale-ticket ticket-price"></i>
							{{ price(article.offer_price) }}
						</template>
						<template v-else>
							{{ price(article.price) }}
						</template>
					</p>

					<!-- Cantidad -->
					<div class="" v-if="article.uncontable == 0">
						<span>
							Cantidad: 
						</span>
						<input type="number" 
								min="1"
								class="form-control input-amount"
								v-model="article.amount">
					</div>
					<div class="" v-else>
						<span>
							Cantidad: 
						</span>
						<br>
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
								class="btn btn-primary btn-sm btn-movil">
							<i class="icon-check"></i>
						</button>
					</div>
					<div class="m-t-10">
						<button @click="up(article)"
								v-show="article.uncontable == 0"
								class="btn btn-primary btn-sm btn-movil">
							<i class="icon-plus"></i>
						</button>
						<button @click="down(article)"
								v-show="article.uncontable == 0"
								class="btn btn-primary btn-sm btn-movil">
							<i class="icon-minus"></i>
						</button>
						<button @click="removeArticle(article)"
								class="btn btn-danger btn-sm btn-movil">
							<i class="icon-cancel"></i>
						</button>
					</div>
				</li>
			</ul>
		</div>
	</div>
</div>
</template>
<script>
export default {
	props: ['articles', 'loading_articles', 'is_desktop'],
	methods: {
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