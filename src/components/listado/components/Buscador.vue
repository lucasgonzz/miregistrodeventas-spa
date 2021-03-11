<template>
<b-row>
	<!-- Buscador -->
	<b-col cols="12" class="col-autocomplete" md="6">
		<autocomplete 
		v-intro-step="1"
		v-intro="'Busca un producto mediante su nombre'"
		:search="search" 
		@keydown.enter="filterArticles"
		ref="article-search"			
		:get-result-value="getResultValue"
		placeholder="Buscar un artículo"
		@submit="setArticle"></autocomplete>
	</b-col>
	<!-- Botones pdf-filtrar -->
	<b-col class="botones-opciones" 
	cols="12" 
	md="6">
		<b-dropdown
		right
		variant="primary"
		v-show="selected_articles.length"
		:text="selected_articles.length+' articulos seleccionados'">
			<b-dropdown-item
			v-b-modal="'update-by-porcentage'">
				<i class="icon-plus"></i>
				Aumentar %
			</b-dropdown-item>
			<b-dropdown-item
			v-b-modal="'delete-articles'">
				<i class="icon-trash-3"></i>
				Eliminar
			</b-dropdown-item>
		</b-dropdown>
		<a 
		v-intro-step="2"
		v-intro="'Exporta un exel de tus productos'"
		href="articles/exel" 
		class="btn btn-sm-only-sm btn-success m-l-5">
			<i class="icon-download"></i>
			Exel
		</a>
		<b-button 
		v-intro-step="3"
		v-intro="'Genera un PDF de tus productos'"
		variant="danger"
		v-b-modal="'descargar-pdf'"
		class="m-l-5">
			<i class="icon-download"></i>
			Pdf
		</b-button>
		<b-button 
		variant="secondary"
		v-intro-step="4"
		v-intro-position="'left'"
		v-intro="'Filtra tus productos mediante diferentes opciones'"
		class="m-l-5" 
		v-b-modal="'listado-filtrar'"
		data-step="2"
		data-intro="Filtre sus artículos segun el proveedor o un rango de precios.">
			<i class="icon-filter"></i>
			Filtrar
		</b-button>
	</b-col>
	<!-- Opciones articulos seleccionados -->
	<!-- <b-col cols="12" 
	md="6"
	xl="12"
	class="opciones-articulos-seleccionados"
	v-show="show_selected_articles_options">
		<b-dropdown 
		id="dropdown-opciones-articulos-seleccionados"
		:text="selected_articles.selected_articles.length+' seleccionados'">
			<b-dropdown-item
			v-b-modal="'add-category'">
				<i class="icon-plus"></i>
				Agregar categoria
			</b-dropdown-item>
			<b-dropdown-item
			v-if="canUse('online', user)" 
			@click="addOnline">
				<i class="icon-network"></i>
				Agregar a Online
			</b-dropdown-item>
			<b-dropdown-item
			v-if="canUse('online', user)" 
			@click="removeOnline">
				<i class="icon-network"></i>
				Quitar de Online
			</b-dropdown-item>
			<b-dropdown-item
			v-b-modal="'update-by-porcentage'">
				<i class="icon-plus"></i>
				Aumentar %
			</b-dropdown-item>
			<b-dropdown-item
			v-if="canUse('tickets', user)"
			v-b-modal="'print-tickets'">
				<span class="icon-tag"></span>
				Tickets	
			</b-dropdown-item>
			<b-dropdown-item
			v-b-modal="'delete-articles'">
				<i class="icon-trash-3"></i>
				Eliminar
			</b-dropdown-item>
		</b-dropdown>
	</b-col> -->
</b-row>
</template>
<script>
import Pagination from './Pagination.vue'
// Components
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
export default {
	components: {
		Pagination,
		// Components
		Autocomplete
	},
	data() {
		return {
			query: '',
		}
	},
	computed: {
		selected_articles() {
			return this.$store.state.articles.selected_articles
		},
		// show_selected_articles_options() {
		// 	if (this.selected_articles.selected_articles.length) { 
		// 		return true 
		// 	}
		// 	return false
		// },
		articles() {
			return this.$store.state.articles.articles
		},
		bar_codes() {
			return this.$store.state.articles.bar_codes
		}
	},
	methods: {
		filterArticles() {
			let query = this.$refs.['article-search'].value
			let articles = this.articles.filter(art => {
				return this.nameIncludes(art, query) || 
						this.barCodeInclues(art, query)
			})
			this.$store.commit('articles/setArticlesToShow', articles)
			if (query.length >= 2) {
			} else {
				this.$store.commit('articles/setArticlesToShow')
			}
			return []
		},
		search(input) {
			if (input.length < 2) {
				this.$store.commit('articles/setArticlesToShow')
			} 
			return []
		},
		nameIncludes(article, input) {
			if (article.name.toLowerCase().includes(input.toLowerCase())) {
				return true
			}
			return false
		},
		barCodeInclues(article, input) {
			if (article.bar_code) {
				if (article.bar_code.includes(input)) {
					return true
				}
			}
			return false
		},
		getResultValue(article) {
			return `${article.name}  |  ${this.price(article.price)}`
		},
		setArticle(article) {
			this.$store.commit('articles/setArticlesToShow', [article])
		},
		// showIntro() {
		// 	introJs().setOption('showProgress', true).setOption('hidePrev', true).setOption('hideNext', true).start()
		// },
		addOnline() {
			this.$api.get('articles/set-online/'+this.selected_articles.selected_articles.join('-'))
			.then(() => {
				this.$toast.success('Agregados a online correctamente')
				this.$emit('updateArticlesList')
			})
			.catch(err => {
				this.$toast.error('Error al agregar a online')
				console.log(err)
			})
		},
		removeOnline() {
			this.$api.get('articles/remove-online/'+this.selected_articles.selected_articles.join('-'))
			.then(() => {
				this.$toast.success('Eliminados de online correctamente')
				this.$emit('updateArticlesList')
			})
			.catch(err => {
				this.$toast.error('Error al agregar a online')
				console.log(err)
			})
		},

		// Pagination
		changePage(page){
			this.pagination.current_page = page;
			this.$emit('getArticles', page)
			// this.getArticles(page);
		},
	},
}
</script>
<style scoped lang="sass">
.container-fluid
	padding: 0

.botones-opciones
	display: flex
	flex-direction: row
	align-items: center	
	justify-content: flex-end
	// @media screen and (min-width: 576px) and (max-width: 768px)
	// 	justify-content: center
	// @media screen and (min-width: 768px) and (max-width: 992px)
	// 	justify-content: flex-end
	// @media screen and (min-width: 992px)
	// 	justify-content: flex-end
	// @media screen and (min-width: 1200px)
	// 	justify-content: center

// .botones-opciones.j-start
// 	@media screen and (max-width: 576px)
// 		display: flex
// 		justify-content: center
// 	@media screen and (min-width: 576px) and (max-width: 768px)
// 		display: flex
// 		justify-content: flex-start

// .opciones-articulos-seleccionados
// 	@media screen and (min-width: 768px)
// 		display: flex
// 		justify-content: flex-end
// 		align-items: center
// .col-pagination
// 	display: flex
// 	align-items: center
// 	flex-direction: row
// 	@media screen and (min-width: 768px)
// 		justify-content: flex-start 
// 	@media screen and (min-width: 1200px)
// 		justify-content: flex-end
</style>