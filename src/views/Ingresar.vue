<template>
<div id="ingresar">
	<credit-cards></credit-cards>
	<deposits></deposits>
	<price-types></price-types>
	<brands></brands>
	<conditions></conditions>
	<categories></categories>
	<sub-categories></sub-categories>
	<edit-article
	@clearArticle="clearArticle"></edit-article>

	<locations></locations>	

	<print-tickets :articles="articles_to_print"></print-tickets>
	<b-row class="justify-content-center">
		<b-col
		cols="12" 
		md="8">

			<title-agregar></title-agregar>
			
			<bar-code-name 
			:article="article"></bar-code-name>

			<cost-price 
			@saveArticle="saveArticle"
			:article="article"></cost-price>

			<stock-provider 
			:article="article"
			@saveArticle="saveArticle"></stock-provider>

			<category-subcategory 
			:article="article"></category-subcategory>

			<iva
			:article="article"></iva>

			<discounts
			:article="article"></discounts>

			<description
			:article="article"></description>

			<condition
			:article="article"></condition>

			<sizes
			:article="article"></sizes>

			<brand
			:article="article"></brand>

			<colors
			:article="article"></colors>

			<add-photo
			:article="article"></add-photo>

			<card-footer
			:articles="articles_to_print"
			:guardando="guardando"
			@saveArticle="saveArticle"></card-footer>
		</b-col>
	</b-row>
</div>
</template>
<script>
// Modals
import CreditCards from '@/components/ingresar/modals/credit-cards/Index'
import Deposits from '@/components/ingresar/modals/Deposits'
import Categories from '@/components/ingresar/modals/categories/Index'
import SubCategories from '@/components/ingresar/modals/sub-categories/Index'
import PriceTypes from '@/components/ingresar/modals/PriceTypes'
import Brands from '@/components/ingresar/modals/Brands'
import Conditions from '@/components/ingresar/modals/Conditions'
import EditArticle from '@/components/common/EditArticle'
import PrintTickets from '@/components/ingresar/modals/PrintTickets'
import BarCodes from '@/components/ingresar/modals/BarCodes'
import DeleteSpecialPrice from '@/components/ingresar/modals/DeleteSpecialPrice'

import Locations from '@/components/ingresar/modals/Locations'

// Components
import BarCodeName from '@/components/ingresar/components/barcode-name/Index'
// import BarCode from '@/components/ingresar/components/BarCode'
// import Name from '@/components/ingresar/components/Name'
import CostPrice from '@/components/ingresar/components/cost-price/Index'
import StockProvider from '@/components/ingresar/components/provider-stock/Index'
import CategorySubcategory from '@/components/ingresar/components/category-subcategory/Index'
import Tags from '@/components/ingresar/components/Tags'
import Iva from '@/components/ingresar/components/Iva'
import Discounts from '@/components/ingresar/components/Discounts'
import Description from '@/components/ingresar/components/Description'
import Condition from '@/components/ingresar/components/Condition'
import Sizes from '@/components/ingresar/components/Sizes'
import Brand from '@/components/ingresar/components/Brand'
import Colors from '@/components/ingresar/components/Colors'
import AddPhoto from '@/components/ingresar/components/AddPhoto'
import CardFooter from '@/components/ingresar/components/CardFooter'
import TitleAgregar from '@/components/ingresar/components/TitleAgregar'

// Mixins
import mixin from '@/mixins/ingresar'
export default {
	name: 'Ingresar',
	components: {
		CreditCards,
		Deposits,
		Categories,
		SubCategories,
		PriceTypes,
		Brands,
		Conditions,
		EditArticle,
		PrintTickets,
		BarCodes,
		DeleteSpecialPrice,
		Locations,

		// Uncontable,
		BarCodeName,
		// BarCode,
		// Name,
		CostPrice,
		StockProvider,
		CategorySubcategory,
		Tags,
		Iva,
		Discounts,
		Description,
		Condition,
		Sizes,
		Brand,
		Colors,
		AddPhoto,
		CardFooter,
		TitleAgregar,
	},
	mixins: [mixin],
	data() {
		return {
			article: {
				bar_code: '',
				provider_code: '',
				category_id: 0,
				sub_category_id: 0,
				provider_id: 0,
				provider_price_list_id: 0,
				apply_provider_percentage_gain: 0,
				brand_id: 0,
				iva_id: 2,
				discounts: [{percentage: ''}],
				new_bar_code: '',
				name: '',
				cost: '',
				cost_in_dollars: 0,
				price: '',
				percentage_gain: '',
				stock: '',
				deposits: [],
				tags: [],
				descriptions: [{}],
				sizes_id: [],
				colors: [],
				condition_id: null,
				new_stock: 0,
				stock_null: false,
				act_fecha: 1,
				add_photo: false,
				// created_at: new Date().toISOString().slice(0,10),
			},

			// Spinners
			guardando: false,
			articles_to_print: [],
		}
	},
	computed: {
		deposits() {
			return this.$store.state.deposit.models
		},
	},
	created() {
		this.listenEditArticle()
	},
	methods: {
		listenEditArticle() {
			this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
				if (this.article.name != '' && modalId == 'edit-article') {
					this.clearArticle()
				}
			})
		},
		showIntro() {
			// this.$introJs().setOption('showProgress', true).setOption('hidePrev', true).setOption('hideNext', true).start()
		},
		changeToName() {
			this.$jQuery('#name').focus()
		},
		changeToDate() {
			this.$jQuery('#created_at').focus()
		},

		// Codigos de barra
		getGeneratedBarCodes() {
			this.$api.get('bar-codes')
			.then( res => {
				this.generated_bar_codes = res.data
			})
			.catch( err => {
				console.log(err)
			})
		},
		showCamera() {
			this.$jQuery('#take-photo').modal('show')
			this.start_video = true
		},
		setFile(file) {
			this.file = file
			this.$jQuery('#name').focus()
		},
		validate() {
			var ok = true
			let provider = this.modelsStoreFromName('provider').find(model => {
				return model.id == this.article.provider_id
			})
			if (this.article.price == '' && this.article.percentage_gain == '' && (typeof provider == 'undefined' || !provider.percentage_gain)) {
				ok = false
				this.$toast.error('El campo precio es obligatorio')
				document.getElementById('article-price').focus()
			}
			if (this.article.name == '') {
				ok = false
				this.$toast.error('El campo nombre es obligatorio')
				document.getElementById('article-name').focus()
			}
			if (this.article.name.includes('/')) {
				ok = false
				this.$toast.error("El nombre no puede contener una barra '/'")
				document.getElementById('article-name').focus()
			}
			return ok
		},

		// Articles
		saveArticle() {
			if (this.validate()) {
				this.guardando = true
				this.$api.post('article', this.article)
				.then( res => {
					this.guardando = false
					var article = res.data.model
					this.$store.commit('article/add', article)
					this.articles_to_print.push(article)
					this.clearArticle()
					this.$toast.success('Articulo guardado')
					document.getElementById('article-bar-code').focus()
					if (this.article.add_photo) {
						this.uploadImage('article', article)
					}
				})
				.catch( err => {
					this.$toast.error('Error al guardar el artículo, revise sus datos e intentelo nuevamente por favor')
					this.guardando = false
					console.log(err)
				})
			}
		},
		updateArticle() {
			this.actualizando = true
			this.$api.put('articles/'+this.article.id, this.article)
			.then(res => {
				this.actualizando = false
				var article = res.data
				this.articles_to_print.push(article)
				this.clearArticle()
				this.$store.dispatch('articles/update', article)
				this.$toast.success('Artículo actualizado correctamente')
				this.$bvModal.hide('edit-article')
			})
			.catch( err => {
				this.$toast.error('Error al actualizar el artículo, revise sus datos e intentelo nuevamente por favor')
				console.log(err)
			})
		},
		toPrintTickets() {
			articles_id = this.getIds(this.articles_to_print)
			var link = 'imprimir-precios/'+articles_id.join('-')
			window.open(link)
		},
		// setArticle(article) {
		// 	if (this.special_prices.length && article.special_prices.length) {
		// 		article.special_prices.forEach(special_price => {
		// 			this.article[special_price.name] = special_price.pivot.price
		// 		})
		// 	}
		// 	this.article.creado = this.date(article.created_at) + ' ' 
		// 							+ this.since(article.created_at)
		// 	this.article.actualizado = this.date(article.updated_at) + ' ' 
		// 								+ this.since(article.updated_at)
		// 	this.article.id = article.id
		// 	if (article.category_id) {
		// 		this.article.category_id = article.category_id
		// 	} else {
		// 		this.article.category_id = 0
		// 	}
		// 	this.article.online = article.online
		// 	this.article.uncontable = article.uncontable
		// 	this.article.bar_code = article.bar_code
		// 	this.article.measurement = article.measurement
		// 	this.article.name = article.name
		// 	this.article.cost = article.cost
		// 	this.article.price = article.price
		// 	this.article.online_price = article.online_price
		// 	this.article.offer_price = article.offer_price
		// 	if (!this.is_provider(this.user)) {
		// 		this.article.provider_id = article.providers[article.providers.length - 1].id
		// 		this.article.providers = article.providers
		// 	}
		// 	this.article.stock = article.stock
		// 	this.article.new_stock = 0
		// 	this.article.stock_null = false
		// },
		clearArticle() {
			this.article.bar_code = ''
			this.article.provider_code = ''
			this.article.name = ''
			this.article.cost = ''
			this.article.cost_in_dollars = 0
			this.article.price = ''
			this.article.percentage_gain = ''
			this.article.apply_provider_percentage_gain = 0
			this.article.online_price = ''
			this.article.stock = ''
			this.article.stock_min = ''
			this.article.new_stock = ''
			this.article.stock_null = 0
			this.article.stock_null = false
			this.article.tags = []
			this.article.descriptions = [{}]
			this.sizes_id = []
			this.colors = []
			this.condition_id = null
			// if (this.special_prices.length) {
			// 	this.special_prices.forEach(special_price => {
			// 		this.article[special_price.name] = ''
			// 	})
			// }
			document.getElementById('article-bar-code').focus()
			if (document.getElementById('ingresar-article-name')) {
				document.getElementById('ingresar-article-name').value = ''
			}
		},
		setArticleProvider(provider) {
			this.article.provider_id = provider.id
		},
		setArticleCategory(category) {
			this.article.category_id = category.id
		}
	}
}
</script>
<style lang="sass">
#ingresar
	.form-row 
		margin-bottom: 0
	hr 
		// border: 1px solid #000
		border: .1px solid rgba(0, 0, 0, .1) !important
		width: 100%
		margin-top: 0
	.card-header
		align-items: center
	.card-footer
		padding: 0
	.spinner-anterior 
		margin-bottom: 4px !important
	.form-group 
		margin-bottom: .5rem
	.spinner-border-sm 
		margin-bottom: 2px
	.col-12
		flex-direction: column 
</style>