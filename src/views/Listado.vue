<template>
<div id="listado">	
	<confirm-delete></confirm-delete>
	<add-category ></add-category>
	<edit-article></edit-article>
	<update-by-porcentage></update-by-porcentage>
	<update-category></update-category>
	<update-brand></update-brand>
	<providers-history></providers-history>
	<filtrar></filtrar>
	<images-copy></images-copy>
	<article-images></article-images>
	<article-images-colors></article-images-colors>
	<article-variants></article-variants>
	<articles-pdf></articles-pdf>
	<prices-lists></prices-lists>
	<create-prices-list></create-prices-list>
	
	<buscador></buscador>
	<info-filtrados></info-filtrados>
	<articles-table></articles-table>
	<articles-mobile></articles-mobile>
	<add-articles></add-articles>
</div>
</template>

<script>
// Modals
import ImagesCopy from '@/components/listado/modals/images/ImagesCopy.vue'
import ArticleImages from '@/components/listado/modals/images/Index.vue'
import ArticleImagesColors from '@/components/listado/modals/images/Colors.vue'
import ArticleVariants from '@/components/listado/modals/images/ArticleVariants.vue'
import Filtrar from '../components/listado/modals/Filtrar.vue'
import EditArticle from '../components/common/EditArticle.vue'
import UpdateByPorcentage from '../components/listado/modals/UpdateByPorcentage.vue'
import UpdateCategory from '../components/listado/modals/UpdateCategory.vue'
import UpdateBrand from '../components/listado/modals/UpdateBrand.vue'
import ConfirmDelete from '../components/listado/modals/ConfirmDelete.vue'
import ProvidersHistory from '../components/listado/modals/ProvidersHistory.vue'
import AddCategory from '../components/listado/modals/AddCategory.vue'
import ArticlesPdf from '../components/listado/modals/ArticlesPdf.vue'
import PricesLists from '../components/listado/modals/prices-lists/Index.vue'
import CreatePricesList from '../components/listado/modals/prices-lists/Create.vue'

// Components
import Buscador from '../components/listado/components/Buscador.vue'
import ArticlesTable from '../components/listado/components/articles-list/ArticlesTable.vue'
import ArticlesMobile from '../components/listado/components/articles-list/ArticlesMobile.vue'
import AddArticles from '../components/listado/components/AddArticles.vue'
import InfoFiltrados from '../components/listado/components/InfoFiltrados.vue'
			
export default {
	components: {
		ArticlesPdf,
		PricesLists,
		CreatePricesList,
		ImagesCopy,
		ArticleImages,
		ArticleImagesColors,
		ArticleVariants,
		Filtrar,
		EditArticle,
		UpdateByPorcentage,
		UpdateCategory,
		UpdateBrand,
		ConfirmDelete,
		// PrintTickets,
		ProvidersHistory,
		AddCategory,

		// Components
		Buscador,
		ArticlesTable,
		ArticlesMobile,
		AddArticles,
		InfoFiltrados,
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
	computed: {
		special_prices() {
			return this.$store.state.special_prices
		},
	}
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