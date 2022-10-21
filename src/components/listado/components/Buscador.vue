<template>
<div>
	<inactive-articles></inactive-articles>
	<b-row
	class="m-b-15">
		<!-- Buscador -->
		<b-col cols="12" class="col-autocomplete" md="6">
			<!-- <autocomplete 
			v-intro-step="1"
			v-intro="'Busca un producto mediante su nombre'"
			:search="search" 
			@keydown.enter="filterArticles"
			ref="article-search"			
			:get-result-value="getResultValue"
			placeholder="Buscar un artículo"
			@submit="setArticle"></autocomplete> -->

			<search-nav
			:models="modelsStoreFromName('article')"
			model_name="article"
			:properties_to_filter="properties_to_filter"></search-nav>

		</b-col>
		<b-col class="botones-opciones" 
		cols="12" 
		md="6">
			<b-dropdown
			class="m-l-10" 
			text="Mas"
			right
			variant="primary">
				<b-dropdown-item
				v-if="hasExtencion('combos')"
				v-b-modal="'combos'">
					<i class="icon-print"></i>
					Combos
				</b-dropdown-item>
				<b-dropdown-item
				v-b-modal="'prices-lists'">
					<i class="icon-print"></i>
					Listas de precios
				</b-dropdown-item>
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
				<b-dropdown-item
				v-b-modal="'inactive-articles'">
					<i class="icon-trash"></i>
					Articulos inactivos
				</b-dropdown-item>
			</b-dropdown>
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
</div>
</template>
<script>
import InactiveArticles from '@/components/listado/modals/inactive-articles/Index'
import SearchNav from '@/components/common/search-nav/Index'
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
export default {
	components: {
		InactiveArticles,
		SearchNav,
		Autocomplete,
	},
	data() {
		return {
			query: '',
		}
	},
	computed: {
		properties_to_filter() {
			return [
				{
					text: 'Nombre',
					key: 'name',
					type: 'text',
					value: '',
				},
				{
					text: 'Codigo de Barras',
					key: 'bar_code',
					type: 'text',
					value: '',
				},
				{
					text: 'Codigo Proveedor',
					key: 'provider_code',
					type: 'text',
					value: '',
				},
				{
					text: 'N°',
					key: 'num',
					type: 'text',
					value: '',
				},
			]
		},
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
		filterArticles() {
			let query = this.$refs.['article-search'].value
			let articles = this.articles.filter(art => {
				return this.nameIncludes(art, query) || 
						this.barCodeInclues(art, query)
			})
			this.$store.commit('articles/setArticlesToShow', articles)
			this.$store.commit('articles/setFiltered', articles)
			if (query.length < 2) {
				this.$store.commit('articles/setArticlesToShow')
			} 
			return []
		},
		search(input) {
            this.$store.commit('articles/setFromFilter', false)
            this.$store.commit('articles/setFiltered', [])
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
</style>