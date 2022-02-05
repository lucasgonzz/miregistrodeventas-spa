<template>
<div id="ingresar">
	<delete-category></delete-category>
	<article-variants></article-variants>
	<delete-provider></delete-provider>
	<delete-special-price></delete-special-price>
	<create-special-price></create-special-price>
	<special-prices></special-prices>
	<create-brand></create-brand>
	<edit-brand></edit-brand>
	<brands></brands>
	<create-category></create-category>
	<create-sub-category></create-sub-category>
	<categories
	@setArticleCategory="setArticleCategory"></categories>
	<edit-category></edit-category>
	<edit-sub-category></edit-sub-category>
	<providers
	@setArticleProvider="setArticleProvider"></providers>
	<create-provider></create-provider>
	<edit-article
	@clearArticle="clearArticle"></edit-article>
	<print-tickets :articles="articles_to_print"></print-tickets>
	<b-row class="justify-content-center">
		<b-col
		cols="12" 
		lg="6">
			<!-- <uncontable 
			:article="article"></uncontable> -->
			<title-agregar></title-agregar>
			<bar-code 
			:article="article"></bar-code>
			<hr>
			<name 
			:article="article"
			ref="nameComponent"
			@setArticle="setArticle"></name>
			<hr>

			<cost-price 
			:article="article"
			:user="user"
			:porcentage_for_price="porcentage_for_price"></cost-price>
			<hr>

			<stock-provider 
			:article="article"
			@saveArticle="saveArticle"></stock-provider>
			<hr>

			<categories-subcategories 
			:article="article"
			@saveArticle="saveArticle"></categories-subcategories>
			<hr>

			<tags
			:article="article"></tags>
			<hr>

			<description
			:article="article"></description>
			<hr>

			<condition
			:article="article"></condition>
			<hr>

			<brand
			:article="article"></brand>
			<hr>

			<colors
			:article="article"></colors>
			<hr>

			<add-photo
			:article="article"></add-photo>
			<hr>

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
import DeleteCategory from '../components/ingresar/modals/categories/Delete.vue'
import ArticleVariants from '../components/listado/modals/images/ArticleVariants.vue'
import Providers from '../components/ingresar/modals/providers/Index.vue'
import CreateProvider from '../components/ingresar/modals/providers/Create.vue'
import Categories from '../components/ingresar/modals/categories/Index.vue'
import CreateCategory from '../components/ingresar/modals/categories/CreateCategory.vue'
import CreateSubCategory from '../components/ingresar/modals/categories/CreateSubCategory.vue'
import EditCategory from '../components/ingresar/modals/categories/EditCategory.vue'
import EditSubCategory from '../components/ingresar/modals/categories/EditSubCategory.vue'
import SpecialPrices from '../components/ingresar/modals/special-prices/Index.vue'
import CreateSpecialPrice from '../components/ingresar/modals/special-prices/Create.vue'
import Brands from '../components/ingresar/modals/brands/Index.vue'
import CreateBrand from '../components/ingresar/modals/brands/Create.vue'
import EditBrand from '../components/ingresar/modals/brands/Edit.vue'
import EditArticle from '../components/common/EditArticle.vue'
import PrintTickets from '../components/ingresar/modals/PrintTickets.vue'
import BarCodes from '../components/ingresar/modals/BarCodes.vue'
import DeleteProvider from '../components/ingresar/modals/DeleteProvider.vue'
import DeleteSpecialPrice from '../components/ingresar/modals/DeleteSpecialPrice.vue'

// Components
import BarCode from '../components/ingresar/components/BarCode.vue'
import Name from '../components/ingresar/components/Name.vue'
import CostPrice from '../components/ingresar/components/CostPrice.vue'
import StockProvider from '../components/ingresar/components/StockProvider.vue'
import CategoriesSubcategories from '../components/ingresar/components/CategoriesSubcategories.vue'
import Tags from '../components/ingresar/components/Tags.vue'
import Description from '../components/ingresar/components/Description.vue'
import Condition from '../components/ingresar/components/Condition.vue'
import Brand from '../components/ingresar/components/Brand.vue'
import Colors from '../components/ingresar/components/Colors.vue'
import AddPhoto from '../components/ingresar/components/AddPhoto.vue'
import CardFooter from '../components/ingresar/components/CardFooter.vue'
import TitleAgregar from '../components/ingresar/components/TitleAgregar.vue'

// Mixins
import mixin from '@/mixins/ingresar'
export default {
	name: 'Ingresar',
	components: {
		DeleteCategory,
		ArticleVariants,
		Providers,
		CreateProvider,
		Categories,
		CreateCategory,
		CreateSubCategory,
		EditCategory,
		EditSubCategory,
		SpecialPrices,
		CreateSpecialPrice,
		Brands,
		CreateBrand,
		EditBrand,
		EditArticle,
		PrintTickets,
		BarCodes,
		DeleteProvider,
		DeleteSpecialPrice,

		// Uncontable,
		BarCode,
		Name,
		CostPrice,
		StockProvider,
		CategoriesSubcategories,
		Tags,
		Description,
		Condition,
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
				category_id: 9,
				provider_id: 0,
				brand_id: 0,
				new_bar_code: '',
				name: '',
				cost: '',
				price: '',
				stock: '',
				tags: [],
				descriptions: [{}],
				colors: [],
				condition_id: null,
				new_stock: 0,
				stock_null: false,
				act_fecha: 1,
				add_photo: false,
				created_at: new Date().toISOString().slice(0,10),
			},

			// Spinners
			guardando: false,
			articles_to_print: [],
			porcentage_for_price: 0,
		}
	},
	computed: {
		user() {
			return this.$store.state.auth.user
		},
		special_prices() {
			return this.$store.state.special_prices.special_prices
		},
		articles() {
			return this.$store.state.articles.articles
		},
		bar_codes() {
			return this.$store.state.articles.bar_codes
		}
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
			if (this.article.price == '') {
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
			// if (this.article.provider_id == 0 && !this.is_provider(this.user)) {
			// 	ok = false
			// 	this.$toast.error('Debe seleccionar un preveedor')
			// 	document.getElementById('article-provider').focus()
			// }
			// Controla que le codigo de barras no este registrado
			if (this.bar_codes.includes(this.article.bar_code)) {
				ok = false
				this.$toast.error('Ya hay un artículo con este codigo de barras')
			}

			// Controla que si no tiene codigo de barras no haya otro
			// articulo sin codigo de barras con el mismo nombre
			if (this.article.bar_code == '') {
				if (this.articles.length) {
					this.articles.forEach(article => {
						if (article.name && article.name.toLowerCase() == this.article.name.toLowerCase() && ok) {
							if (article.bar_code === null) {
								ok = false
								this.$toast.error('Ya hay un articulo con ese nombre y sin un codigo de barras, cambie el nombre o asignele un codigo de barras');
							}
						}
					})
				}
			}
			return ok
		},

		// Articles
		saveArticle() {
			if (this.validate()) {
				this.guardando = true
				this.$api.post('articles', this.article)
				.then( res => {
					this.guardando = false
					var article = res.data.article
					if (this.article.bar_code != '') {
						this.$store.commit('articles/addBarCode', this.article.bar_code)
					}
					this.$store.commit('articles/addArticle', article)
					this.$store.commit('articles/setArticlesToShow')
					this.articles_to_print.push(article)
					this.clearArticle()
					this.$toast.success('Articulo guardado')
					document.getElementById('article-bar-code').focus()
					if (this.article.add_photo) {
						this.uploadPhoto(article)
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
		setArticle(article) {
			if (this.special_prices.length && article.special_prices.length) {
				article.special_prices.forEach(special_price => {
					this.article[special_price.name] = special_price.pivot.price
				})
			}
			this.article.creado = this.date(article.created_at) + ' ' 
									+ this.since(article.created_at)
			this.article.actualizado = this.date(article.updated_at) + ' ' 
										+ this.since(article.updated_at)
			this.article.id = article.id
			if (article.category_id) {
				this.article.category_id = article.category_id
			} else {
				this.article.category_id = 0
			}
			this.article.online = article.online
			this.article.uncontable = article.uncontable
			this.article.bar_code = article.bar_code
			this.article.measurement = article.measurement
			this.article.name = article.name
			this.article.cost = article.cost
			this.article.price = article.price
			this.article.online_price = article.online_price
			this.article.offer_price = article.offer_price
			if (!this.is_provider(this.user)) {
				this.article.provider_id = article.providers[article.providers.length - 1].id
				this.article.providers = article.providers
			}
			this.article.stock = article.stock
			this.article.new_stock = 0
			this.article.stock_null = false
		},
		clearArticle() {
			this.article.bar_code = ''
			this.article.name = ''
			this.article.cost = ''
			this.article.price = ''
			this.article.online_price = ''
			this.article.stock = ''
			this.article.new_stock = ''
			this.article.stock_null = 0
			this.article.stock_null = false
			this.article.tags = []
			this.article.descriptions = [{}]
			this.colors = []
			this.condition_id = null
			if (this.special_prices.length) {
				this.special_prices.forEach(special_price => {
					this.article[special_price.name] = ''
				})
			}
			this.$refs.nameComponent.clearName()
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