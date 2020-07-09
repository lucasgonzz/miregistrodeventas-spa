<template>
<div id="listado">	
	<show-image 
	:article="article"
	:user="user"></show-image>
	<add-image 
	:article="article"
	:user="user"
	@updateArticlesList="updateArticlesList"></add-image>
	<add-category 
	:categories="categories"
	:selected_articles="selected_articles"
	:article="article"
	@updateArticlesList="updateArticlesList"></add-category>
	<edit-article 
	:user="user" 
	:article="article" 
	:providers="providers" 
	:categories="categories"
	:actualizando="actualizando"
	@updateArticle="updateArticle"
	@clearArticle="clearArticle"></edit-article>
	<add-marker 
	@deleteMarkerGroup="deleteMarkerGroup"
	@addMarkerToGroup="addMarkerToGroup"
	@getMarkerGroups="getMarkerGroups"
	@updateArticlesList="updateArticlesList"
	:marker_groups="marker_groups"
	:deleting_marker_group="deleting_marker_group"
	:saving_marker_in_marker_group="saving_marker_in_marker_group"
	:article="article"></add-marker>
	<is-marker 
	:article="article"
	:deleting_marker="deleting_marker"
	@deleteMarker="deleteMarker"></is-marker>
	<update-by-porcentage 
	@updateArticlesList="updateArticlesList"
	:selected_articles="selected_articles"></update-by-porcentage>
	<!-- <confirmar-eliminacion 
	:article="article" 
	@destroyArticle="destroyArticle"></confirmar-eliminacion> -->
	<descargar-pdf 
	:selected_articles="selected_articles.selected_articles"
	:articles_id="selected_articles.articles_id"
	:filtro="filtro"></descargar-pdf>
	<print-tickets :selected_articles="selected_articles"></print-tickets>
	<delete-articles }
	:deleting_articles="deleting_articles"
	:selected_articles="selected_articles"
	@deleteArticles="deleteArticles"></delete-articles>
	<create-offer :selected_articles="selected_articles"
	@createOffer="createOffer"></create-offer>
	<providers-history :article="article"></providers-history>
	<filtrar 
	:filtro="filtro" 
	:user="user" 
	:providers="providers"
	@uncheckProviders="uncheckProviders"
	@filter="filter"></filtrar>
	<b-row class="justify-content-center">
		<b-col>
			<b-card no-body>
				<template v-slot:header>
					<card-header :is_desktop="is_desktop"
								:is_loading="is_loading"
								:selected_articles="selected_articles"
								:user="user"
								:is_filter="is_filter"
								:pagination="pagination"
								:pagesNumber="pagesNumber"
								@setLoading="setLoading"
								@getArticles="getArticles"
								@setArticle="setArticle"
								@selectPossibleResult="selectPossibleResult"
								@updateArticlesList="updateArticlesList"
								@updateArticleList="updateArticleList"></card-header>
				</template>
				<b-container fluid class="p-t-10">
					<cargando :is_loading="is_loading" size="md"></cargando>
					<volver-a-listar
					:searched="searched"
					:is_filter="is_filter"
					@volverAListar="volverAListar"></volver-a-listar>
					<div v-show="!is_loading">
						<info-filtrados :filtro="filtro" :is_filter="is_filter" 
										:providers="providers"
										:articles-length="articles.length">
						</info-filtrados>

						<articles-table :is_loading="is_loading"
										:articles="articles"
										:article="article"
										:selected_articles="selected_articles"
										:pagination="pagination"
										:user="user"
										@addImage="addImage"
										@showImage="showImage"
										@providersHistory="providersHistory"
										@setArticle="setArticle"></articles-table>
					</div>
				</b-container>
			</b-card>
		</b-col>
	</b-row>
</div>
</template>

<script>
// Modals
import DescargarPdf from '../components/listado/modals/DescargarPdf.vue'
import Filtrar from '../components/listado/modals/Filtrar.vue'
import EditArticle from '../components/common/EditArticle.vue'
import UpdateByPorcentage from '../components/listado/modals/UpdateByPorcentage.vue'
import CreateOffer from '../components/listado/modals/CreateOffer.vue'
import AddMarker from '../components/listado/modals/AddMarker.vue'
import IsMarker from '../components/listado/modals/IsMarker.vue'
import PrintTickets from '../components/listado/modals/PrintTickets.vue'
import DeleteArticles from '../components/listado/modals/DeleteArticles.vue'
import ProvidersHistory from '../components/listado/modals/ProvidersHistory.vue'
// import ConfirmarEliminacion from '../components/listado/modals/ConfirmarEliminacion.vue'
import ShowImage from '../components/listado/modals/ShowImage.vue'
import AddImage from '../components/listado/modals/AddImage.vue'
import AddCategory from '../components/listado/modals/AddCategory.vue'

// Components
import InfoFiltrados from '../components/listado/components/InfoFiltrados.vue'
import CardHeader from '../components/listado/components/CardHeader.vue'
import ArticlesTable from '../components/listado/components/ArticlesTable.vue'
import VolverAListar from '../components/listado/components/VolverAListar.vue'
import Cargando from '../components/common/Cargando.vue'
			
export default {
	components: {
		DescargarPdf,
		Filtrar,
		EditArticle,
		IsMarker,
		AddMarker,
		CreateOffer,
		UpdateByPorcentage,
		DeleteArticles,
		PrintTickets,
		ProvidersHistory,
		// ConfirmarEliminacion,
		ShowImage,
		AddImage,
		AddCategory,

		// Components
		InfoFiltrados,
		CardHeader,
		ArticlesTable,
		VolverAListar,
		Cargando,
	},
	data() {
		return {
			articles: [],
			actualizando: false,
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
			is_loading: false,
			all_selected_articles: false,

			// Marcadores
			marker_groups: [],
			saving_marker_in_marker_group: 0,
			deleting_marker_group: 0,
			deleting_marker: false,

			// Buscar
			search_query: '',
			possible_articles: [],
			loading_possible_articles: true,
			searched: false,

			// Provedores
			providers: [],
			proiders_history: [],

			// Categorias
			categories: [],

			// Objeto para contuserar el seleccionados de articulos para 
			// ser importados en pdf, exel y para imprimir los tickets
			selected_articles: {
				is_all_selected: false,
				selected_articles: [],
				articles: [],
				articles_id: [],
				selected_pages: [],
			},
			idsArticles: [],
			deleting_articles: false,

			// Filtros
			filtro: {
				'mostrar': 'todos',
				'ordenar': 'nuevos-viejos',
				'precio_entre': {
					'min': '',
					'max': '',
				},
				'fecha_entre': {
					'min': '',
					'max': '',
				},
				'provider': 0,
				// 'providers': [],
			},
			is_filter: false,

			// Pagination
			// current_page: 0,
			pagination: {
				'total' : 0,
				'current_page' : 0,
				'per_page' : 0,
				'last_page' : 0,
				'from' : 0,
				'to' : 0,
			},
			offset: 2,

			is_desktop: false,

			columnas_para_imprimir: ['bar_code', 'name', 'cost', 'price', 'created_at', 'updated_at'],
		}
	},
	methods: {
		// editArticle(article) {
		// 	this.setArticle(article)
		// 	this.$bvModal.show('edit-article')
		// },
		selectPossibleResult(result) {
			this.searched = true
			this.articles = []
			this.articles.push(result)
			this.pagination.current_page = 0
		},
		setLoading(value) {
			this.is_loading = value
		},
		updateArticleList(article_name) {
			this.is_loading = true
			this.$api.get('articles/search/'+article_name)
			.then(res => {
				this.is_loading = false
				this.articles = res.data
			})
			.catch(() => {
				this.$toast.error('Error al buscar el artículo')
			})
		},



		/* --------------------------------------------------------------------------
			* Se fija si la pagina actual aparece en las paginas seleccionadas
			* Si aparece marca la casilla de todos los articulos seleccionados
			* Sino la desmarca
		-------------------------------------------------------------------------- */
		setIsAllSelected() {
			if (this.selected_articles.selected_pages.includes(this.pagination.current_page)) {
				this.selected_articles.is_all_selected = true
			} else {
				this.selected_articles.is_all_selected = false
			}
		},
		/* --------------------------------------------------------------------------
			* Recorre todos los articulos y agrega los id a la propiedad
			de los articulos seleccionados que almacena los id de los artículos
			que hay en la pagina
			* Se la usa en filtrar y en getArticles
		-------------------------------------------------------------------------- */
		setArticlesId() {
			this.selected_articles.articles_id = []
			this.articles.forEach( article => {
				this.selected_articles.articles_id.push(article.id)
			})
		},
		
		/* -----------------------------------------------------------------------------------
			* Ofrese los posibles resultados para la busqueda de artículos
		----------------------------------------------------------------------------------- */
		setPossibleArticles() {
			if (this.search_query.length > 1) {
				this.loading_possible_articles = true
				this.$api.get('articles/pre-search/'+this.search_query)
				.then( res => {
					this.loading_possible_articles = false
					if (res.data.length) {
						this.possible_articles = res.data
					} else {
						this.$toast.error('No se encontraron articulos, pruebe con otro nombre, por favor')						
					}
					// $('.resultados').show()
					// $('.input-search').addClass('input-search-resultados')
				})
				.catch((err) => {
					console.log(err)
				})
			} else {
				this.possible_articles = []
			}
		},
		
		/* -----------------------------------------------------------------------------------
			* Cuando hacemos click en la lista de los posibles articulos a mostrar
			setea el search_cuery y llama al metodo search
		----------------------------------------------------------------------------------- */
		selectPossibleArticle(query) {
			this.search_query = query
			this.search()
		},
		/* -----------------------------------------------------------------------------------
			* Hace una llamada al metodo search del contuserador de articulos
		----------------------------------------------------------------------------------- */
		search() {
			this.searched = true
			this.is_loading = true
			this.possible_articles = []
			this.$api.get('articles/search/'+this.search_query)
			.then( res => {
				this.is_loading = false
				var articles = res.data
				if (articles.length > 0) {
					this.articles = res.data
					this.filterProviders()
					this.setArticlesId()
				} else {
					this.$toast.error('No se encontraron artículos con ese criterio')
				}
			})
			.catch((err) => {
				console.log(err)
			})
		},


		/*
			ARTICULOS
		-----------------------------------------------------------------------------------
			* Obtiene los articulos
			* Setea los id de los articulos que ha obtenido
			* Setea si la casilla de todos los articulos seleccionados esta o no activada
			* Filtra los proveedores para que no aparescan mas de una vez en la lista
		-----------------------------------------------------------------------------------
		*/
		getArticles(page) {
			this.is_loading = true
			this.$api.get('articles?page=' + page)
			.then( res => {
				this.is_loading = false
				this.articles = res.data.articles.data;
				this.pagination = res.data.pagination;
				this.setArticlesId()
				this.setIsAllSelected()
				this.filterProviders()
				// Se pasa el nombre de la medida a español
			})
			.catch((err) => {
				console.log(err)
			})
		},
		showImage(article) {
			this.setArticle(article)
			this.$bvModal.show('show-image')
		},
		addImage(article) {
			this.setArticle(article)
			this.$bvModal.show('add-image')
		},
		
		/* -----------------------------------------------------------------------------------
			* Envia el objeto articulo al metodo update del contuserador de articulos
			* Esconde el modal de editar articulo
			* Envia notificacion de ariculo actualizado con exito
			* Reinicia las propiedades del articulo
		----------------------------------------------------------------------------------- */
		updateArticle() {
			this.actualizando = true
			this.$api.put('articles/'+this.article.id, this.article)
			.then(() => {
				this.actualizando = false
				this.updateArticlesList()
				this.$bvModal.hide('edit-article')
				this.$toast.success(`${this.article.name} se actualizo con exito`)
				this.clearArticle()
			})
			.catch((err) => {
				console.log(err)
			})
		},
		updateArticlesList(after_delete_articles = false) {
			if (after_delete_articles) {
				this.getArticles(this.pagination.current_page)
			} else {
				if (this.searched) {
					this.search()
				} else if (this.is_filter) {
					this.filter(this.filtro)
				} else {
					this.getArticles(this.pagination.current_page)
				}
			}
			// this.selected_articles.is_all_selected = false
		},
		/* -----------------------------------------------------------------------------------
			* Setea el objeto de articulo
			* Muestra modal de eliminar articulo
		----------------------------------------------------------------------------------- */


		// Marcadores
		deleteMarker(marker_id) {
			this.deleting_marker = true
			this.$api.delete('markers/'+marker_id)
			.then(() => {
				this.deleting_marker = false
				this.updateArticlesList()
				this.$bvModal.hide('is-marker')
				this.$toast.success('Marcador eliminado correctamente')
			})
			.catch((err) => {
				console.log(err)
			})
		},
		addMarkerToGroup(marker_group_id, article_id) {
			this.saving_marker_in_marker_group = marker_group_id
			this.$api.get('marker-groups/add-marker-to-group/'+marker_group_id+'/'+article_id)
			.then(() => {
				this.saving_marker_in_marker_group = 0
				this.updateArticlesList()
				this.$bvModal.hide('add-marker')
				this.$toast.success('Marcador agregado correctamente')
				this.getMarkerGroups()
			})
		},

		getMarkerGroups() {
			this.$api.get('marker-groups')
			.then(res => {
				this.marker_groups = res.data
			})
			.catch((err) => {
				console.log(err)
			})
		},

		deleteMarkerGroup(marker_group_id) {
			this.deleting_marker_group = marker_group_id
			this.$api.delete('marker-groups/'+marker_group_id)
			.then(() => {
				this.deleting_marker_group = 0
				this.getMarkerGroups()
				this.updateArticlesList()
				this.$toast.success('Grupo de marcadores eliminado correctamente')
			})
		},
		deleteOffer(article) {
			this.$api.delete('articles/delete-offer/'+article.id)
			.then(() => {
				this.updateArticlesList()
				this.$toast.success('Oferta eliminada correctamente')
			})
			.catch((err) => {
				console.log(err)
			})
		},
		setArticle(article) {
			this.article.id = article.id
			this.article.uncontable = article.uncontable
			this.article.online = article.online
			this.article.bar_code = article.bar_code
			if (article.category_id) {
				this.article.category_id = article.category_id
				this.article.category = article.category
			} else {
				this.article.category_id = 0
			}
			this.article.measurement = article.measurement
			this.article.name = article.name
			this.article.images = article.images
			this.article.cost = article.cost
			this.article.price = article.price
			this.article.online_price = article.online_price
			this.article.offer_price = article.offer_price
			if (article.offer_price != null) {
				this.article.offer_price = article.offer_price
			}
			this.article.marker = article.marker
			this.article.previus_price = article.previus_price
			this.article.stock = article.stock
			this.article.new_stock = 0
			if (!this.isProvider(this.user)) {
				this.article.provider_id = article.providers[0].id
				this.article.providers = article.providers
			}
			this.article.created_at = article.created_at
			this.article.updated_at = article.updated_at
			this.article.creado = this.date(article.created_at)+' '+this.since(article.created_at)
			this.article.actualizado = this.date(article.updated_at)+' '+this.since(article.updated_at)
		},
		
		/* -----------------------------------------------------------------------------------
			* Envia id del articulo a aliminar al metodo delete del contuserador de
			articulos
			* Obtiene los datos de los articulos actualizados
			* Esconde modal de eliminacionde articulo
			* Envia notificacion de eliminacion exitosa
		----------------------------------------------------------------------------------- */
		destroyArticle(article_id) {
			this.$api.delete('articles/'+article_id)
			.then(() => {
				this.selected_articles.selected_articles = []
				this.updateArticlesList()
				this.$bvModal.hide('listado-delete-article')
				this.$toast.success('Artículo eliminado correctamente')
			})
			.catch((err) => {
				console.log(err)
			})
		},
		
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
			if (!this.isProvider(this.user)) {
				this.article.provider = this.article.providers[this.article.providers.length - 1].id
			}
			this.article.created_at = ''
			this.previus_next = 0
		},

		/* -----------------------------------------------------------------------------------
			* False la propiedad que indica si esta filtrado o no
			* False la propiedad que indica si esta buscando o no
			* Deja el campo del earch_query vacio
			* Actualiza los articulos 
		----------------------------------------------------------------------------------- */
		volverAListar() {
			this.is_filter = false
			this.searched = false
			this.search_query = ''
			this.selected_articles.selected_articles = []
			this.getArticles(this.pagination.current_page)
		},

		// Modals
		// Metodos del header

		createOffer() {
			this.$api.post('articles/create-offer', {
				articles: this.selected_articles.articles,
				// porcentage: porcentage
			})
			.then(() => {
				this.updateArticlesList()
				this.$bvModal.hide('create-offer')
				this.$toast.success('Ofertas creadas correctamente')
			})
			.catch(err => {
				console.log(err)
			})
		},
		// updateArticlesList(cost, price, decimals) {
		// 	this.updating_by_porcentage = true
		// 	this.$api.post('articles/update-by-porcentage', {
		// 		cost,
		// 		price,
		// 		decimals,
		// 		articles_ids: this.selected_articles.selected_articles
		// 	})
		// 	.then(res => {
		// 		this.updating_by_porcentage = false
		// 		// console.log(res.data)
		// 		this.updateArticlesList()
		// 		$('#update-by-porcentage').modal('hide')
		// 	})
		// 	.catch(err => {
		// 		this.$toast.error('Error al actualizar')
		// 		this.updating_by_porcentage = false
		// 		console.log(err)
		// 	})
		// },
		deleteArticles() {
			this.deleting_articles = true
			this.$api.delete('articles/delete-articles/'+this.selected_articles.selected_articles.join('-'))
			.then((res) => {
				this.deleting_articles = false
				this.selected_articles.selected_articles = []
				this.updateArticlesList(true)
				this.$toast.success('Artículos eliminados correctamente')
				this.$bvModal.hide('delete-articles')
				console.log(res.data)
			})
			.catch((err) => {
				this.deleting_articles = false
				console.log(err)
			})
		},
		uncheckProviders() {
			if (this.filtro.providers.length > 0) {
				this.filtro.providers = []
			} else {
				this.setProvidersFilter()
			}
		},
		/* --------------------------------------------------------------------------
			* Toma los valores de filtrado y los manda al metodo de filtrado 
			de los artículos
			* Setea la propiedad de filtrado como verdadera
			* Agrega los articulos obtenidos a los articulos
			* Setea los id de los artiuclos
			* Filtra los proveedores para que aparescan solo una vez en la lista
		-------------------------------------------------------------------------- */
		filter(filtro) {
			this.is_loading = true
			this.$bvModal.hide('listado-filtrar')
			this.$api.post('articles/filter', {
				mostrar: filtro.mostrar,
				ordenar: filtro.ordenar,
				precio_entre: filtro.precio_entre,
				fecha_entre: filtro.fecha_entre,
				provider: filtro.provider
			})
			.then( res => {
				this.is_loading = false
				this.is_filter = true
				console.log('aca: ')
				console.log(res.data)
				this.articles = res.data
				this.setArticlesId()
				this.filterProviders()
			})
			.catch( err => {
				console.log(err)
			})
		},
		

		getProviders() {
			this.$api.get('providers')
			.then( res => {
				this.providers = res.data
			})
			.catch( err => {
				console.log(err)
			})
		},
		filterProviders() {
			if (!this.isProvider(this.user)) {
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

		// Categorias
		getCategories() {
			this.$api.get('categories')
			.then(res => {
				this.categories = res.data
			})
			.catch(err => {
				console.log(err)
				// this.getCategories()
			})
		},
	},
	created() {
		this.getArticles(1)
		if (!this.isProvider(this.user)) {
			this.getProviders()
		}
		this.getMarkerGroups()
		this.getCategories()
	},
	computed: {
		user() {
			return this.$store.state.auth.user
		},
		isActived: function(){
			return this.pagination.current_page;
		},
		pagesNumber(){

			if(!this.pagination.to){
				return [];
			}

			var from = this.pagination.current_page - this.offset;
			
			if(from < 1){
				from = 1;
			}

			var to = from + (2 * this.offset);
			if(to >= this.pagination.last_page){
				to = this.pagination.last_page;
			}

			var pagesArray = [];
			while(from <= to){
				pagesArray.push(from);
				from++;
			}
			return pagesArray;
		}	
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