<template>
<b-container fluid>
	<b-row class="m-0">
		<!-- Buscador -->
		<b-col cols="12" class="col-autocomplete" md="6" lg="8" xl="4">
			<autocomplete 
			v-intro-step="1"
			v-intro="'Busca un producto mediante su nombre'"
			:search="search" 
			auto-select
			ref="article-search"			
			:get-result-value="getResultValue"
			placeholder="Buscar un artículo"
			@submit="setArticle"></autocomplete>
		</b-col>
		<!-- Botones pdf-filtrar -->
		<b-col class="botones-opciones" 
		cols="12" 
		sm="12" 
		md="6"
		lg="4"
		xl="4">
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
		<!-- Pagination -->
		<b-col class="col-pagination" cols="12" 
		md="6" 
		xl="4">
			<pagination @changePage="changePage" 
				v-intro-step="5"
				v-intro="'Pagina tus productos de 10 en 10'"
				:is_filter="is_filter"
				:pagination="pagination"
				:is_loading="is_loading"
				:pages-number="pagesNumber"></pagination>
		</b-col>
		<!-- Opciones articulos seleccionados -->
		<b-col cols="12" 
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
				<!-- <b-dropdown-item
				v-b-modal="'create-offer'">
					<i class="icon-sale-ticket"></i>
					Oferta
				</b-dropdown-item> -->
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
		</b-col>
	</b-row>
</b-container>
</template>
<script>
import Pagination from './Pagination.vue'
// Components
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
export default {
	props: [
		'is_loading',
		'is_filter', 'pagination', 'pagesNumber',
		'is_desktop', 'selected_articles', 'user'
	],
	components: {
		Pagination,
		// Components
		Autocomplete
	},
	computed: {
		show_selected_articles_options() {
			if (this.selected_articles.selected_articles.length) { 
				return true 
			}
			return false
		},
		articles() {
			return this.$store.state.articles.articles
		},
		bar_codes() {
			return this.$store.state.articles.bar_codes
		}
	},
	methods: {
		search(input) {
			if (input.length < 3) { return [] }
			if (this.bar_codes.includes(input)) {
				console.log('entro')
				this.$api.get(`articles/get-by-bar-code/${input}`)
				.then(res => {
					this.$emit('selectPossibleResult', res.data)
				})
			} else {
				return this.articles.filter(article => {
					return article.name.toLowerCase().startsWith(input.toLowerCase())
				})
			}
		},
		getResultValue(article) {
			return `${article.name}  |  ${this.price(article.price)}`
		},
		async setArticle(article) {
			try {
				this.$emit('setLoading', true)
				let res = await this.$api.get(`articles/${article.id}`)
				if (res) {
					this.$emit('setLoading', false)
					this.$emit('selectPossibleResult', res.data)
				}
			} catch(err) {
				console.log(err)
			}
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
.col-12 
	@media screen and (max-width: 768px)
		margin-bottom: .75rem
		&:nth-last-child(2)
			margin-bottom: 0
		&:last-child
			margin-top: .75rem
			margin-bottom: 0

	@media screen and (min-width: 768px) and (max-width: 1200px)
		margin-bottom: .75rem
		&:nth-last-child(2), &:last-child
			margin-bottom: 0
	@media screen and (min-width: 1200px)
		&:last-child
			margin-top: .75rem

.container-fluid
	margin: 0
	padding: 0

.col-center
	display: flex
	align-items: center

.botones-opciones
	align-items: center	
	@media screen and (min-width: 576px) and (max-width: 768px)
		display: flex
		justify-content: center
	@media screen and (min-width: 768px) and (max-width: 992px)
		display: flex
		justify-content: flex-end
	@media screen and (min-width: 992px)
		display: flex
		justify-content: flex-end
	@media screen and (min-width: 1200px)
		display: flex
		justify-content: center

.botones-opciones.j-start
	@media screen and (max-width: 576px)
		display: flex
		justify-content: center
	@media screen and (min-width: 576px) and (max-width: 768px)
		display: flex
		justify-content: flex-start

.opciones-articulos-seleccionados
	@media screen and (min-width: 768px)
		display: flex
		justify-content: flex-end
		align-items: center

.col-pagination
	align-items: center
	@media screen and (min-width: 768px)
		display: flex
		justify-content: flex-start
	@media screen and (min-width: 1200px)
		display: flex
		justify-content: flex-end
</style>