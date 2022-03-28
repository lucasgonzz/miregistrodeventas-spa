<template>
<div id="vender">
	<clients></clients>
	<select-variant></select-variant>
	<create-client></create-client>
	<successful-sale></successful-sale>
	<new-article></new-article>
	<change-percentage-card></change-percentage-card>
	<update-price></update-price>

	<header-form></header-form>

	<total-card-previus-sales></total-card-previus-sales>

	<previus-sale-data></previus-sale-data>

	<articles-table></articles-table>

	<button-clients></button-clients>
	
	<!-- <cargando 
	size="md"></cargando> -->

</div>
</template>
<script>
// Modals
import NewArticle from '../components/vender/modals/NewArticle.vue'
import Clients from '../components/vender/modals/clients/Index.vue'
import SelectVariant from '../components/vender/modals/SelectVariant.vue'
import CreateClient from '../components/vender/modals/clients/CreateClient.vue'
import SuccessfulSale from '../components/vender/modals/SuccessfulSale.vue'
import ChangePercentageCard from '../components/vender/modals/ChangePercentageCard.vue'
import UpdatePrice from '../components/vender/modals/UpdatePrice.vue'

// Componentes
import Cargando from '../components/common/Cargando.vue'
import HeaderForm from '../components/vender/components/header-form/Index.vue'
import ArticlesTable from '../components/vender/components/ArticlesTable.vue'
import TotalCardPreviusSales from '../components/vender/components/total-card-previus-sales/Index.vue'
import PreviusSaleData from '../components/vender/components/PreviusSaleData.vue'
import ButtonClients from '../components/vender/components/ButtonClients.vue'

// Mixins
import Vender from '@/mixins/vender'
export default {
	components: {
		NewArticle,
		Clients,
		SelectVariant,
		CreateClient,
		SuccessfulSale,
		ChangePercentageCard,
		UpdatePrice,
		
		// Componentes
		Cargando,
		HeaderForm,
		ArticlesTable,
		TotalCardPreviusSales,
		PreviusSaleData,
		ButtonClients,
	},
	mixins: [Vender],
	computed: {
		special_prices() {
			return this.$store.state.special_prices
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