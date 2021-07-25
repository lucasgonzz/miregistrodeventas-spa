<template>
<div id="vender">
	<clients></clients>
	<select-variant></select-variant>
	<create-client></create-client>
	<successful-sale
	:sale="sale"></successful-sale>
	<new-article></new-article>
	<change-percentage-card></change-percentage-card>

	<header-form></header-form>

	<menu-data></menu-data>

	<previus-sale-data></previus-sale-data>

	<articles-table 
	:special_price_id="special_price_id"></articles-table>

	<button-clients></button-clients>
	
	<cargando 
	size="md"></cargando>

</div>
</template>
<script>
// import Vue from 'vue'

// Modals
import NewArticle from '../components/vender/modals/NewArticle.vue'
import ChangePercentageCard from '../components/vender/modals/ChangePercentageCard.vue'
import Clients from '../components/vender/modals/clients/Index.vue'
import SelectVariant from '../components/vender/modals/SelectVariant.vue'
import CreateClient from '../components/vender/modals/clients/CreateClient.vue'
import SuccessfulSale from '../components/vender/modals/SuccessfulSale.vue'

// Componentes
import Cargando from '../components/common/Cargando.vue'
import HeaderForm from '../components/vender/components/HeaderForm.vue'
import SpecialPrices from '../components/vender/components/SpecialPrices.vue'
import ArticlesTable from '../components/vender/components/ArticlesTable.vue'
import Markers from '../components/vender/components/Markers.vue'
import MenuData from '../components/vender/components/MenuData.vue'
import PreviusSaleData from '../components/vender/components/PreviusSaleData.vue'
import ButtonClients from '../components/vender/components/ButtonClients.vue'

// Mixins
import Vender from '@/mixins/vender'
export default {
	components: {
		NewArticle,
		ChangePercentageCard,
		Clients,
		SelectVariant,
		CreateClient,
		SuccessfulSale,
		
		// Componentes
		Cargando,
		HeaderForm,
		SpecialPrices,
		ArticlesTable,
		Markers,
		MenuData,
		PreviusSaleData,
		ButtonClients,
	},
	mixins: [Vender],
	data() {
		return {
            client: null,
			with_card: false,
			// updating_percentage_card: false,

			// Precios especiales
			special_price_id: 0,

			// PreviusSale
			// sales_previus_next_index: 0,
			// loading_previus_sale: false,
			// loading_next_sale: false,
			// updating_previus_sale: false,
			// previus_sale: {},
			sale: {}
		}
	},
	computed: {
		user() {
			return this.$store.state.auth.user
		},
		// percentage_card : {
		// 	set(percentage_card) {
		// 		this.user.percentage_card = percentage_card
		// 	},
		// 	get() {
		// 		return this.user.percentage_card
		// 	}
		// },
		special_prices() {
			return this.$store.state.special_prices
		},
		articles_store() {
			return this.$store.state.articles.articles
		},
		articles_vender() {
			return this.$store.state.vender.articles
		}
	},
	beforeRouteLeave(to, from, next) {
		if (this.articles_vender.length) {
			let leave = window.confirm('Conservar esta venta con sus articulos')
			if (leave) {
				next()
			} else {
				this.clearVender()
				next()
			}
		} else {
			next()
		}
	},
	watch: {
		with_card() {
			// this.calculateTotal()
		},
		// user() {
		// 	this.percentage_card = this.user.percentage_card
		// },
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
				this.articles = this.setPreviusSalePirces(res.data.articles)
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
				this.articles = this.setPreviusSalePirces(res.data.articles)
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

		setClient(client) {
			this.client = client
		},

		// // Porcentaje de tarjetas
		// updatePercentageCard(percentage_card) {
		// 	this.updating_percentage_card = true
		// 	this.$api.get('set-percentage-card/'+percentage_card)
		// 	.then(() => {
		// 		this.updating_percentage_card = false
		// 		this.percentage_card = percentage_card
		// 		this.$bvModal.hide('change-percentage-card')
		// 		this.$toast.success('Porcentaje para tarjeta actualizado correctamente')
		// 	})
		// 	.catch(err => {
		// 		console.log(err)
		// 	})
		// },

		// isRepeated() {
		// 	var repetido = false
		// 	this.articles.forEach(article => {
		// 		if (article.bar_code == this.article.bar_code || article.id == this.article.id) {
		// 			if (article.uncontable == 0) {
		// 				if (this.isProvider(this.user)) {
		// 					article.amount = Number(article.amount)
		// 					article.amount += Number(this.article.amount)
		// 					console.log(article.amount)
		// 					console.log(Number(this.article.amount))
		// 					this.$toast.success(`El artículo ya esta en la venta, se aumentaron ${this.article.amount} unidades`)
		// 				} else {
		// 					article.amount++
		// 					this.$toast.success('El artículo ya esta en la venta, se aumento una unidad')
		// 				}
		// 				this.calculateTotal()
		// 				repetido = true
		// 				this.possible_articles = []
		// 			}
		// 		}
		// 	})
		// 	return repetido
		// },
		// isAvailable() {
		// 	var available = false
		// 	this.available_articles.forEach(article => {
		// 		if (this.article.bar_code != '') {
		// 			if (article.bar_code == this.article.bar_code) {
		// 				available = true
		// 			}
		// 		} else {
		// 			if (article.name == this.article.name) {
		// 				available = true
		// 			}
		// 		}
		// 	})
		// 	return available
		// },
		// addArticle() {
		// 	var repetido = this.isRepeated()
		// 	if (!repetido) {
		// 		let article = this.articles_store.find(article => article.id == this.article.id)
		// 		console.log(article)
		// 		article.original_price = article.price
		// 		if (this.isProvider(this.user)) {
		// 			article.amount = this.article.amount
		// 		} else {
		// 			article.amount = 1
		// 		}
		// 		article.quedarian = null
		// 		this.articles.unshift(article)
		// 		if (article.uncontable == 1) {
		// 			article.calculate_from_total = false
		// 			article.measurement_original = article.measurement
		// 			setTimeout(() => {
		// 				document.getElementById(`amount-measurement-${article.id}`).focus()
		// 			}, 500)
		// 		} else {
		// 			this.calculateTotal()
		// 		}
		// 	}
		// },
		// calculateTotal() {
		// 	console.log('calculateTotal')
		// 	this.total = 0
		// 	this.cantidad_articulos = 0
		// 	this.cantidad_unidades = 0
		// 	let price
		// 	let amount
		// 	this.articles.forEach(article => {
		// 		this.cantidad_articulos++
		// 		if (this.special_price_id == 0) {
		// 			price = Number(article.original_price)
		// 		} else {
		// 			price = this.getSpecialPrice(article)
		// 		}
		// 		amount = Number(article.amount)
		// 		if (article.uncontable == 0) {
		// 			article.total = price * amount
		// 			this.cantidad_unidades += amount
		// 		} else {
		// 			this.cantidad_unidades++
		// 			if (article.calculate_from_total) {
		// 				article.amount = Number((article.total / price).toFixed(2))
		// 			} else {
		// 				if (article.measurement == article.measurement_original) {
		// 					article.total = Number((price * amount).toFixed(2))
		// 				} else {
		// 					article.total = Number((price * amount / 1000).toFixed(2))
		// 				}
		// 			}
		// 		}
		// 		this.total += Number(article.total)
		// 		if (article.stock) {
		// 			if (article.uncontable == 0) {
		// 				article.quedarian = article.stock - amount
		// 			} else {
		// 				article.quedarian = '-'
		// 			}
		// 		} else {
		// 			article.quedarian = 'sin datos'
		// 		}
		// 	})
		// 	if (this.with_card) {
		// 		var percentage_card = 0
		// 		if (this.previus_sale.percentage_card) {
		// 			percentage_card = this.percentageCardFormated(this.previus_sale.percentage_card)
		// 		} else {
		// 			percentage_card = this.percentageCardFormated(this.percentage_card)
		// 		}
		// 		this.total = this.total * percentage_card
		// 	}
		// 	let input_name = document.getElementsByClassName('autocomplete-input')[0]
		// 	input_name.value = ""
		// 	if (this.article.bar_code != '') {
		// 		document.getElementById('article-bar-code').focus()
		// 	} else {
		// 		input_name.focus()
		// 	}
		// 	// this.article.bar_code = ''
		// 	// this.article.name = ''
		// 	// this.article.id = null
		// 	// this.article.amount = ''
		// 	// this.$set(this.article, 'amount', '')
		// 	// Vue.set(this.article, 'amount', '')
		// 	this.articles.push({})
		// 	this.articles.splice(this.articles.length-1,1)
		// },
		// setSpecialPrice(special_price) {
		// 	this.special_price_id = special_price
		// },

		// Metodo que llega del modal clientes
		// vender_a_cliente(debt) {
		// 	if (this.articles.length > 0) {
		// 		this.vendiendo = true
		// 		this.$api.post('sales', {
		// 			articles: this.articles,
		// 			with_card: this.with_card,
		// 			client_id: this.client.id,
		// 			debt: debt,
		// 			special_price_id: this.special_price_id
		// 		})
		// 		.then(res => {
		// 			this.$bvModal.hide('clients')
		// 			this.vendiendo = false
		// 			this.articles = []	
		// 			this.client = null
		// 			this.total = 0
		// 			this.cantidad_articulos = 0
		// 			this.cantidad_unidades = 0
		// 			this.with_card = false
		// 			this.$toast.success('Venta realizada correctamente')
		// 			document.getElementById('article-bar-code').focus()
		// 		})
		// 		.catch(err => {
		// 			console.log(err)
		// 		})
		// 	} else {
		// 		this.$toast.error('Debe ingresar al menos un artículo para realizar una venta')
		// 		this.bar_code = ''
		// 		document.getElementById('bar_code').focus()
		// 	}
		// },

		// vender(debt = null) {
		// 	if (this.articles.length > 0) {
		// 		this.vendiendo = true
		// 		this.$api.post('sales', {
		// 			articles: this.articles,
		// 			with_card: this.with_card,
		// 			client_id: this.client ? this.client.id : null,
		// 			debt: debt,
		// 			special_price_id: this.special_price_id
		// 		})
		// 		.then(res => {
		// 			this.vendiendo = false
		// 			this.articles = []	
		// 			this.total = 0
		// 			this.client = null
		// 			this.debt = null
		// 			this.cantidad_articulos = 0
		// 			this.cantidad_unidades = 0
		// 			this.with_card = false
		// 			this.$toast.success('Venta realizada correctamente')
		// 			this.$bvModal.hide('clients')
		// 			document.getElementById('article-bar-code').focus()
		// 			if (this.isProvider(this.user)) {
		// 				this.sale = res.data
		// 				this.$bvModal.show('successful-sale')
		// 			}
		// 		})
		// 		.catch(err => {
		// 			console.log(err)
		// 		})
		// 	} else {
		// 		this.$toast.error('Debe ingresar al menos un artículo para realizar una venta')
		// 		this.bar_code = ''
		// 		document.getElementById('bar_code').focus()
		// 	}
		// },
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


.col-total
	display: flex
	flex-direction: column
	justify-content: flex-start
	@media screen and (min-width: 768px)
		p 
			text-align: left
</style>