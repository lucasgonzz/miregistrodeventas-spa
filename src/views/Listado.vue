<template>
<div id="listado">	

	<stock-min></stock-min>
	<stock-0></stock-0>

	<import-articles></import-articles>
    <confirm
    :text="text_delete"
    :actions="['article/delete']"
    id="delete-articles"
    toast="Articulos eliminados"></confirm>
	<edit-article></edit-article>

	<update-iva></update-iva>
	<update-sub-category></update-sub-category>
	<update-by-porcentage></update-by-porcentage>
	<update-brand></update-brand>
	<update-props></update-props>

	<providers-history></providers-history>
	<filtrar></filtrar>
	<images-copy></images-copy>
	<article-images></article-images>
	<article-images-colors></article-images-colors>
	<article-variants></article-variants>
	<articles-pdf></articles-pdf>
	<prices-lists></prices-lists>
	<create-prices-list></create-prices-list>
	<combos></combos>

	<stock-info></stock-info>
	
	<header-listado></header-listado>
	<filtered-selected></filtered-selected>

	<list></list>
	
</div>
</template>

<script>
// Modals
import StockMin from '@/components/listado/modals/StockMin'
import Stock0 from '@/components/listado/modals/Stock0'
import ImportArticles from '@/components/listado/modals/import/Index'
// import ImportArticles from '@/components/listado/modals/ImportArticles.vue'
import ImagesCopy from '@/components/listado/modals/images/ImagesCopy.vue'
import ArticleImages from '@/components/listado/modals/images/Index.vue'
import ArticleImagesColors from '@/components/listado/modals/images/Colors.vue'
import ArticleVariants from '@/components/listado/modals/images/ArticleVariants.vue'
import Filtrar from '../components/listado/modals/Filtrar.vue'
import EditArticle from '../components/common/EditArticle.vue'
import UpdateIva from '../components/listado/modals/update/Iva.vue'
import UpdateSubCategory from '../components/listado/modals/update/SubCategory.vue'
import UpdateByPorcentage from '../components/listado/modals/UpdateByPorcentage.vue'
import UpdateBrand from '../components/listado/modals/UpdateBrand.vue'
import UpdateProps from '../components/listado/modals/UpdateProps.vue'
import Confirm from '../components/common/Confirm.vue'
import ProvidersHistory from '../components/listado/modals/ProvidersHistory.vue'
import ArticlesPdf from '../components/listado/modals/ArticlesPdf.vue'
import PricesLists from '../components/listado/modals/prices-lists/Index.vue'
import CreatePricesList from '../components/listado/modals/prices-lists/Create.vue'
import Combos from '../components/listado/modals/combos/Index.vue'
import StockInfo from '@/components/listado/modals/stock-info/Index.vue'

// Components
import HeaderListado from '../components/listado/components/header/Index'
// import ArticlesTable from '../components/listado/components/articles-list/ArticlesTable.vue'
// import ArticlesMobile from '../components/listado/components/articles-list/ArticlesMobile.vue'
import List from '@/components/listado/components/list/Index'
import FilteredSelected from '@/components/listado/components/filtered-selected/Index' 
export default {
	components: {
		StockMin,
		Stock0,
		ImportArticles,
		ArticlesPdf,
		PricesLists,
		CreatePricesList,
		Combos,
		StockInfo,
		ImagesCopy,
		ArticleImages,
		ArticleImagesColors,
		ArticleVariants,
		Filtrar,
		EditArticle,
		UpdateIva,
		UpdateSubCategory,
		UpdateByPorcentage,
		UpdateBrand,
		UpdateProps,
		Confirm,
		// PrintTickets,
		ProvidersHistory,

		// Components
		HeaderListado,
		// ArticlesTable,
		// ArticlesMobile,
		List,
		FilteredSelected, 
	},
	computed: {
		special_prices() {
			return this.$store.state.special_prices.special_prices
		},
		from_filter() {
			return this.$store.state.articles.from_filter
		},
		text_delete() {
			if (this.from_filter) {
				return 'todos los articulos filtrados'
			}
			return 'los articulos seleccionados'
		},
		articles_to_show() {
			return this.$store.state.articles.articles_to_show
		},
		loading() {
			return this.$store.state.articles.loading
		},
	},
	beforeRouteLeave(to, from, next) {
		this.$store.commit('article/setSelected', [])
		next()
	},
	data() {
		return {
			article: {
				id: 0, 
				bar_code: '',
				category_id: 0,
				provider_id: 0,
				name: '', 
				cost: 0, 
				price: 0, 
				stock: 0, 
				new_stock: 0, 
				stock_null: 0,
				providers: [], 
				created_at: '', 
				updated_at: '', 
				creado: '', 
				actualizado: '', 
				act_fecha: 1, 
			},

			// Filtros
			filtro: {
				mostrar: 'todos',
				type: 0,
				ordenar: 'nuevos-viejos',
				precio_entre: {
					min: '',
					max: '',
				},
				fecha_entre: {
					min: '',
					max: '',
				},
				provider: 0,
				category: 0
			},

			columnas_para_imprimir: ['bar_code', 'name', 'cost', 'price', 'created_at', 'updated_at'],
		}
	},
	methods: {

		
		/* -----------------------------------------------------------------------------------
			* Envia id del articulo a aliminar al metodo delete del contuserador de
			articulos
			* Obtiene los datos de los articulos actualizados
			* Esconde modal de eliminacionde articulo
			* Envia notificacion de eliminacion exitosa
		----------------------------------------------------------------------------------- */
		
		
		/* -----------------------------------------------------------------------------------
			* Resetea las propiedades del objeto articulo
		----------------------------------------------------------------------------------- */
		clearArticle() {
			this.article.id = ''
			this.article.bar_code = ''
			this.article.category_id = 0
			this.article.name = ''
			this.article.cost = ''
			this.article.price = ''
			this.article.stock = 0
			this.article.new_stock = 0
			this.article.stock_null = 0
			if (!this.is_provider(this.user)) {
				this.article.provider = 0
			}
			if (this.special_prices.length) {
				this.special_prices.forEach(special_price => {
					this.article[special_price.name] = ''
				})
			}
			this.article.created_at = ''
			this.previus_next = 0
		},

		deleteArticles() {
			this.deleting_articles = true
			this.$api.delete(`articles/delete-articles/${articles_id}`)
			.then(() => {
				this.deleting_articles = false
				this.$toast.success('Artículos eliminados correctamente')
			})
			.catch((err) => {
				this.deleting_articles = false
				console.log(err)
			})
		},
		/* --------------------------------------------------------------------------
			* Toma los valores de filtrado y los manda al metodo de filtrado 
			de los artículos
			* Setea la propiedad de filtrado como verdadera
			* Agrega los articulos obtenidos a los articulos
			* Setea los id de los artiuclos
			* Filtra los proveedores para que aparescan solo una vez en la lista
		-------------------------------------------------------------------------- */
		filterProviders() {
			if (!this.is_provider) {
				// Se crea una propiedad en los articulos donde estan solo 
				// los proveedores que no se repiten
				this.articles.forEach( article => {
					var providers_ids = []
					var providers = []
					this.orderProvidersHistory(article)
					article.providers.forEach( provider => {
						if (!providers_ids.includes(provider.id)) {
							providers_ids.push(provider.id)
							providers.push(provider)
						}
					})
					article.providers_not_repeated = providers
				})
			}
		},
		providersHistory(article) {
			this.article = article
			this.orderProvidersHistory(this.article)
			this.$bvModal.show('providers-history')
		},
	},
}
</script>
<style scoped>
td {
	vertical-align: middle;	
}

/* Buscar articulos */
.resultados {
	position: absolute;
	top: 100%;
	width: 100%;
	z-index: 500;
}

.buscador {
	position: relative;
}

.dropdown {
	display: inline-block;
}

.dropdown-item.c-p:hover {
	background: #3490dc;
	color: #FFF;
}

.input-search {
	width: 100%;
}

.spinner-listado {
	position: absolute;
	width: 100vw;
	height: 100vh;
	background: #FFF;
	z-index: 500;
}

.td-price {
	position: relative;
	font-weight: bold
}

.ticket-price {
	position: absolute;
	font-size: 30px;
	color: #E23535;
	top: -5px;
	left: -20px;
}

/* Centra el cuadrado de articulos seleccionados en telefono*/
.col-center {
	display: flex;
	justify-content: center;
}

.col-end {
	display: flex;
	justify-content: flex-end;
}

</style>