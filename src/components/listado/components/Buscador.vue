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
	<b-col class="botones-opciones" 
	cols="12" 
	md="6">
		<b-dropdown
		right
		variant="primary"
		v-show="selected_articles.length"
		:text="selected_articles.length+' seleccionados'">
			<b-dropdown-item
			@click="selectAll">
				<i class="icon-check"></i>
				Seleccionar todo
			</b-dropdown-item>
			<b-dropdown-item
			@click="deselectAll">
				<i class="icon-not"></i>
				Deseleccionar todo
			</b-dropdown-item>
			<b-dropdown-item
			v-b-modal="'update-by-porcentage'">
				<i class="icon-plus"></i>
				Aumentar %
			</b-dropdown-item>
			<b-dropdown-item
			v-b-modal="'update-category'">
				<i class="icon-redo"></i>
				Categoria
			</b-dropdown-item>
			<b-dropdown-item
			v-b-modal="'update-brand'">
				<i class="icon-redo"></i>
				Marca
			</b-dropdown-item>
			<b-dropdown-item
			v-b-modal="'delete-articles'">
				<i class="icon-trash"></i>
				Eliminar
			</b-dropdown-item>
		</b-dropdown>
		<b-dropdown
		class="m-l-10" 
		text="Mas"
		right
		variant="primary">
			<b-dropdown-item
			@click="excel">
				<i class="icon-upload"></i>
				Exportar Excel
			</b-dropdown-item>
			<b-dropdown-item
			v-b-modal="'import-articles'">
				<i class="icon-download"></i>
				Importar Excel
			</b-dropdown-item>
		</b-dropdown>
		<b-button
		class="m-l-10" 
		v-b-modal="'prices-lists'"
		variant="primary">
			<i class="icon-print"></i>
			Listas de precios
		</b-button>
		<!-- <a 
		v-intro-step="2"
		v-intro="'Exporta un exel de tus productos'"
    	:href="getExelLink()" 
    	target="_blank"
		class="btn btn-sm-only-sm btn-success m-l-10">
			<i class="icon-download"></i>
			Exel
		</a> -->
		<!-- <b-button 
		v-intro-step="3"
		v-intro="'Genera un PDF de tus productos'"
		variant="danger"
		v-b-modal="'articles-pdf'"
		class="m-l-10">
			<i class="icon-download"></i>
			Pdf
		</b-button> -->
		<b-button 
		variant="secondary"
		v-intro-step="4"
		v-intro-position="'left'"
		v-intro="'Filtra tus productos mediante diferentes opciones'"
		class="m-l-10" 
		v-b-modal="'listado-filtrar'"
		data-step="2"
		data-intro="Filtre sus artículos segun el proveedor o un rango de precios.">
			<i class="icon-filter"></i>
			Filtrar
		</b-button>
	</b-col>
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
		articles() {
			return this.$store.state.articles.articles
		},
		bar_codes() {
			return this.$store.state.articles.bar_codes
		}
	},
	methods: {
		excel() {
            var link = process.env.VUE_APP_API_URL+'/articles/excel/export'
            window.open(link)
		},
		selectAll() {
			this.$store.commit('articles/setAllArticlesSelected', true)
		},
		deselectAll() {
			this.$store.commit('articles/setAllArticlesSelected', false)
		},
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
            this.$store.commit('articles/setIsFilter', false)
			if (input.length < 2) {
				this.$store.commit('articles/setArticlesToShow')
			} 
			return []
		},
		nameIncludes(article, input) {
			if (article.name && article.name.toLowerCase().includes(input.toLowerCase())) {
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
	@media screen and (max-width: 768px)
		margin-top: 1em
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