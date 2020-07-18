<template>
<div id="vender">
	<clients 
	:total="total"
	:vendiendo="vendiendo"
	@vender_a_cliente="vender_a_cliente"></clients>
	<article-not-register @updateArticles="updateArticlesList"></article-not-register>
	<change-percentage-card 
		:percentage_card="percentage_card"
		:updating_percentage_card="updating_percentage_card"
		@updatePercentageCard="updatePercentageCard"></change-percentage-card>
	<b-row class="justify-content-center">
		<b-col
		cols="12"
		xl="8">
			<b-card>
				<template v-slot:header>
					<header-form
							:article="article"
							:vendiendo="vendiendo"
							:articles_length="articles.length"
							:user="user"
							@vender="vender"
							@addArticle="addArticle"></header-form>
				</template>
				<div>
					<b-container fluid>
						<markers :article="article"
								:user="user"
								@addArticle="addArticle"></markers>
						<special-prices
						@setSpecialPrice="setSpecialPrice"></special-prices>
						<total-previus-sales :total="total"
											:cantidad_articulos="cantidad_articulos"
											:cantidad_unidades="cantidad_unidades"
											:sales_previus_next_index="sales_previus_next_index"
											:loading_previus_sale="loading_previus_sale"
											:loading_next_sale="loading_next_sale"
											:updating_previus_sale="updating_previus_sale"
											:previus_sale="previus_sale"
											:user="user"
											:percentage_card="percentage_card"
											:with_card="with_card"
											:loading_add_article="loading_add_article"
											@changeWithCard="changeWithCard"
											@nextSale="nextSale"
											@previusSale="previusSale"
											@updatePreviusSale="updatePreviusSale"
											@cancelPreviusSale="cancelPreviusSale"></total-previus-sales>
						<cargando 
						:is_loading="loading_add_article" 
						:is_loading_2="loading_previus_sale" 
						:is_loading_3="loading_next_sale" 
						size="md"></cargando>
						<articles-table 
						v-show="!loading_add_article 
								&& !loading_previus_sale 
								&& !loading_next_sale 
								&& articles.length"
						:articles="articles"
						:special_price_id="special_price_id"
						@calculateTotal="calculateTotal"></articles-table>
					</b-container>
				</div>
				<template v-slot:footer v-if="isProvider(user)">
					<card-footer></card-footer>
				</template>
			</b-card>
		</b-col>
	</b-row>
</div>
</template>
<script>

import ArticleNotRegister from '../components/vender/modals/ArticleNotRegister.vue'
import ChangePercentageCard from '../components/vender/modals/ChangePercentageCard.vue'
import Clients from '../components/vender/modals/Clients.vue'

// Componentes
import Cargando from '../components/common/Cargando.vue'
import HeaderForm from '../components/vender/components/HeaderForm.vue'
import SpecialPrices from '../components/vender/components/SpecialPrices.vue'
import ArticlesTable from '../components/vender/components/ArticlesTable.vue'
import Markers from '../components/vender/components/Markers.vue'
import TotalPreviusSales from '../components/vender/components/TotalPreviusSales.vue'
import CardFooter from '../components/vender/components/CardFooter.vue'
export default {
	components: {
		ArticleNotRegister,
		ChangePercentageCard,
		Clients,
		
		// Componentes
		Cargando,
		HeaderForm,
		SpecialPrices,
		ArticlesTable,
		Markers,
		TotalPreviusSales,
		CardFooter,
	},
	data() {
		return {
			article: {
				id: null,
				bar_code: '',
				name: '',
			},
			loading_add_article: false,
			vendiendo: false,
			articles: [],

			total: 0,
			cantidad_articulos: 0,
			cantidad_unidades: 0,
			with_card: false,
			updating_percentage_card: false,

			// Precios especiales
			special_price_id: 0,

			// PreviusSale
			sales_previus_next_index: 0,
			loading_previus_sale: false,
			loading_next_sale: false,
			updating_previus_sale: false,
			previus_sale: {},
			loading_articles: false,


		}
	},
	computed: {
		user() {
			return this.$store.state.auth.user
		},
		percentage_card : {
			set(percentage_card) {
				this.user.percentage_card = percentage_card
			},
			get() {
				return this.user.percentage_card
			}
		},
		special_prices() {
			return this.$store.state.special_prices
		},
	},
	beforeRouteLeave(to, from, next) {
		if (this.articles.length) {
			let leave = window.confirm('¿Seguro que queres salir? vas a perder los artículos ingresados en esta venta')
			if (leave) {
				next()
			} else {
				next(false)
			}
		} else {
			next()
		}
	},
	watch: {
		with_card() {
			this.calculateTotal()
		},
		user() {
			this.percentage_card = this.user.percentage_card
		},
		special_price_id() {
			this.calculateTotal()
		}
	},
	methods: {
		// Metodos de total y previus sales
		changeWithCard() {
			if (this.with_card) {
				this.with_card = false
			} else {
				this.with_card = true
			}
			this.calculateTotal()
		},
		previusSale() {
			this.sales_previus_next_index ++
			this.loading_previus_sale = true
			this.loading_articles = true
			this.$api.get('sales/previus-next/'+this.sales_previus_next_index)
			.then(res => {
				this.loading_articles = false
				this.loading_previus_sale = false
				this.previus_sale = res.data
				this.articles = res.data.articles
				this.formatPreviusSale()
				this.calculateTotal()
			})
			.catch(err => {
				console.log(err)
			})
		},
		nextSale() {
			this.sales_previus_next_index --
			this.loading_articles = true
			this.loading_next_sale = true
			this.$api.get('sales/previus-next/'+this.sales_previus_next_index)
			.then(res => {
				this.loading_articles = false
				this.loading_next_sale = false
				this.previus_sale = res.data
				this.articles = res.data.articles
				this.formatPreviusSale()
				this.calculateTotal()
			})
			.catch(err => {
				console.log(err)
			})
		},
		updatePreviusSale() {
			this.updating_previus_sale = true
			this.loading_articles = true
			this.$api.put('sales/'+this.previus_sale.id, {
				articles: this.articles,
				with_card: this.with_card,
			})
			.then(() => {
				this.loading_articles = false
				this.updating_previus_sale = false
				this.$toast.success('Venta actualizada correctamente')
			})
			.catch(err => {
				this.$toast.error('Error al actualizar la venta, recargue la pagina e intentelo nuevamente, por favor ;)')
				this.updating_previus_sale = false
				console.log(err)
			})
		},
		cancelPreviusSale() {
			this.with_card = false
			this.articles = []
			this.sales_previus_next_index = 0
			this.previus_sale = {}
			this.calculateTotal()
		},
		formatPreviusSale() {
			this.articles.forEach(article => {
				article.amount = parseInt(article.pivot.amount)
				if (article.uncontable == 1) {
					article.measurement_original = article.measurement
				}
			})
			if (this.previus_sale.percentage_card) {
				console.log('con tarjet')
				this.with_card = true
			} else {
				console.log('sin tarjeta')
				this.with_card = false
			}
		},

		// Porcentaje de tarjetas
		updatePercentageCard(percentage_card) {
			this.updating_percentage_card = true
			this.$api.get('set-percentage-card/'+percentage_card)
			.then(() => {
				this.updating_percentage_card = false
				this.percentage_card = percentage_card
				this.$bvModal.hide('change-percentage-card')
				this.$toast.success('Porcentaje para tarjeta actualizado correctamente')
			})
			.catch(err => {
				console.log(err)
			})
		},

		isRepeated() {
			var repetido = false
			this.articles.forEach(article => {
				if (article.bar_code == this.article.bar_code || article.id == this.article.id) {
					if (article.uncontable == 0) {
						article.amount++
						this.$toast.success('El artículo ya esta en la venta, se aumento una unidad')
						this.calculateTotal()
						repetido = true
						this.possible_articles = []
					}
				}
			})
			return repetido
		},
		isAvailable() {
			var available = false
			this.available_articles.forEach(article => {
				if (this.article.bar_code != '') {
					if (article.bar_code == this.article.bar_code) {
						available = true
					}
				} else {
					if (article.name == this.article.name) {
						available = true
					}
				}
			})
			return available
		},
		addArticle() {
			var repetido = this.isRepeated()
			if (!repetido) {
				this.loading_add_article = true
				// Si el id del articulo no es null es porque se busco por nombre
				if (this.article.id) {
					this.$api.get(`articles/${this.article.id}`)
					.then(res => {
						this.loading_add_article = false
						let article = res.data
						if (this.isProvider(this.user)) {
							article.amount = this.article.amount
						} else {
							article.amount = 1
						}
						this.articles.unshift(article)
						if (article.uncontable == 1) {
							article.measurement_original = article.measurement
							setTimeout(() => {
								document.getElementById(`amount-measurement-${article.id}`).focus()
							}, 500)
						} else {
							this.calculateTotal()
						}
						this.focusHeaderForm()
					})
					.catch(err => {
						this.$toast.error('Error, recargue la pagina por favor!')
						this.loading_add_article = false
						console.log(err)
					})
				} else {
					this.$api.get(`articles/get-by-bar-code/${this.article.bar_code}`)
					.then(res => {
						this.loading_add_article = false
						let article = res.data
						if (article) {
							if (this.isProvider(this.user)) {
								article.amount = this.article.amount
							} else {
								article.amount = 1
							}
							this.articles.unshift(article)
							if (article.uncontable == 1) {
								article.measurement_original = article.measurement
								setTimeout(() => {
									document.getElementById(`amount-measurement-${article.id}`).focus()
								}, 500)
							} else {
								this.calculateTotal()
							}
							this.focusHeaderForm()
						} else {
							this.$bvModal.show('article-not-register')
						}
					})
					.catch(err => {
						this.$toast.error('Error, recargue la pagina por favor!')
						this.loading_add_article = false
						console.log(err)
					})
				}
			}
		},
		focusHeaderForm() {
			this.article.amount = ''
			if (this.article.bar_code.length > 0) {
				this.article.bar_code = ''
				document.getElementById('article-bar-code').focus()
			}
		},
		calculateTotal() {
			this.total = 0
			this.cantidad_articulos = 0
			this.cantidad_unidades = 0
			this.articles.forEach(article => {
				this.cantidad_articulos++
				let price
				if (this.special_price_id == 0) {
					if (article.old_price) {
						price = Number(article.old_price)
					} else {
						price = Number(article.price)
					}
				} else {
					price = this.getSpecialPrice(article)
				}
				let amount = Number(article.amount)
				if (article.uncontable == 0) {
					this.total += price * amount
					this.cantidad_unidades += amount
				} else {
					this.cantidad_unidades++
					if (article.measurement == article.measurement_original) {
						this.total += price * amount
					} else {
						this.total += price * amount / 1000
					}
				}
				if (article.stock) {
					if (article.uncontable == 0) {
						article.quedarian = article.stock - amount
					} else {
						if (article.measurement == article.measurement_original) {
							article.quedarian = article.stock - amount
						} else {
							article.quedarian = article.stock - (amount / 1000)
						}
					}
				} else {
					article.quedarian = 'sin datos'
				}
			})
			if (this.with_card) {
				var percentage_card = 0
				if (this.previus_sale.percentage_card) {
					percentage_card = this.percentageCardFormated(this.previus_sale.percentage_card)
				} else {
					percentage_card = this.percentageCardFormated(this.percentage_card)
				}
				this.total = this.total * percentage_card
			}
			let input_name = document.getElementsByClassName('autocomplete-input')[0]
			input_name.value = ""
			if (this.article.bar_code != '') {
				document.getElementById('article-bar-code').focus()
			} else {
				input_name.focus()
			}
			this.article.bar_code = ''
			this.article.name = ''
			this.article.id = null
			this.article.amount = ''
		},
		getSpecialPrice(article) {
			let special_price_ = article.price
			article.special_prices.forEach(special_price => {
				if (special_price.pivot.special_price_id == this.special_price_id) {
					special_price_ = Number(special_price.pivot.price)
				}
			})
			return special_price_
		},
		setSpecialPrice(special_price) {
			this.special_price_id = special_price
		},

		// Metodo que llega del modal clientes
		vender_a_cliente(client_id, debt) {
			if (this.articles.length > 0) {
				this.vendiendo = true
				this.$api.post('sales', {
					articles: this.articles,
					with_card: this.with_card,
					client_id: client_id,
					debt: debt,
					special_price_id: this.special_price_id
				})
				.then(() => {
					this.$bvModal.hide('clients')
					this.vendiendo = false
					this.articles = []	
					this.total = 0
					this.cantidad_articulos = 0
					this.cantidad_unidades = 0
					this.with_card = false
					this.$toast.success('Venta realizada correctamente')
					document.getElementById('bar-code').focus()
				})
				.catch(err => {
					console.log(err)
				})
			} else {
				this.$toast.error('Debe ingresar al menos un artículo para realizar una venta')
				this.bar_code = ''
				document.getElementById('bar_code').focus()
			}
		},

		vender() {
			if (this.articles.length > 0) {
				this.vendiendo = true
				this.$api.post('sales', {
					articles: this.articles,
					with_card: this.with_card,
					client_id: -1,
					debt: -1,
					special_price_id: this.special_price_id
				})
				.then(res => {
					this.vendiendo = false
					console.log('aca: '+res.data)
					this.articles = []	
					this.total = 0
					this.cantidad_articulos = 0
					this.cantidad_unidades = 0
					this.with_card = false
					this.$toast.success('Venta realizada correctamente')
					document.getElementById('article-bar-code').focus()
				})
				.catch(err => {
					console.log(err)
				})
			} else {
				this.$toast.error('Debe ingresar al menos un artículo para realizar una venta')
				this.bar_code = ''
				document.getElementById('bar_code').focus()
			}
		},
		updateArticlesList() {
			this.getBarCodes()
			this.getNames()
			this.getAvailableArticles()
			this.$bvModal.hide('article-not-register')
		},
	}	
}
</script>
<style scoped lang="sass">

.list 
	width: 98%
	position: absolute
	z-index: 500
	max-height: 200px
	overflow-y: scroll

.article-name 
	font-size: 1rem
	padding: 10px

.list-group-border 
	border: 1px solid rgba(51, 51,51, .6)
	border-radius: 0.25rem 0.25rem 0 0

.p-price-mobile 
	font-size: 1.5rem

.btn-movil 
	padding: 8px 16px


.col-relative 
	position: relative
	padding: 0px


</style>