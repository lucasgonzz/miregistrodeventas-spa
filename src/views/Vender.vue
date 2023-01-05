<template>
<div id="vender">
	<!-- <clients></clients>
	<select-variant></select-variant> -->
	<successful-sale></successful-sale>
	<new-article></new-article>
	<change-percentage-card></change-percentage-card>
	<update-price></update-price>

	<articles-loading-advise></articles-loading-advise>

	<nav-component></nav-component>

	<client></client>	
	<remito></remito>	
	<btn-save></btn-save>	

</div>
</template>
<script>
// Modals
import NewArticle from '../components/vender/modals/NewArticle.vue'
import Clients from '../components/vender/modals/clients/Index.vue'
import SelectVariant from '../components/vender/modals/SelectVariant.vue'
import SuccessfulSale from '../components/vender/modals/SuccessfulSale.vue'
import ChangePercentageCard from '../components/vender/modals/ChangePercentageCard.vue'
import UpdatePrice from '../components/vender/modals/UpdatePrice.vue'

// Componentes
import ArticlesLoadingAdvise from '@/components/common/ArticlesLoadingAdvise'
import NavComponent from '../components/vender/components/NavComponent'
import Client from '../components/vender/components/client/Index'
import Remito from '../components/vender/components/remito/Index'
import BtnSave from '../components/vender/components/BtnSave'

// Mixins
import Vender from '@/mixins/vender'
export default {
	components: {
		NewArticle,
		Clients,
		SelectVariant,
		SuccessfulSale,
		ChangePercentageCard,
		UpdatePrice,
		
		// Componentes
		ArticlesLoadingAdvise,
		NavComponent,
		Client,
		Remito,
		BtnSave,
	},
	mixins: [Vender],
	computed: {
		items() {
			return this.$store.state.vender.items
		}
	},
	beforeRouteLeave(to, from, next) {
		if (this.items.length) {
			let leave = window.confirm('Conservar esta venta con sus articulos')
			if (leave) {
				next()
			} else {
				// this.clearVender()
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