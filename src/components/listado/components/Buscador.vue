<template>
<div>
	<inactive-articles></inactive-articles>
	<b-row>
		<b-col>
			<horizontal-nav
			show_filter_modal
			:show_btn_create="false"
			model_name="article">
				<template v-slot:buttons>
					<b-dropdown
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
						v-b-modal="'import-article'">
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
					class="m-l-15"
					v-b-modal="'articles-stock-min'"
					variant="warning"
					v-if="articles_stock_min.length">
						{{ articles_stock_min.length }} articulos con stock minimo
					</b-button>

					<b-button
					class="m-l-15"
					v-b-modal="'articles-stock-0'"
					variant="danger"
					v-if="articles_stock_0.length">
						{{ articles_stock_0.length }} articulos sin stock 
					</b-button>
				</template>
			</horizontal-nav>
		</b-col>
	</b-row>
</div>
</template>
<script>
import HorizontalNav from '@/components/common/horizontal-nav/Index'
import InactiveArticles from '@/components/listado/modals/inactive-articles/Index'
import SearchNav from '@/components/common/search-nav/Index'
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
export default {
	components: {
		HorizontalNav,
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
			return this.$store.state.article.models
		},
		bar_codes() {
			return this.$store.state.articles.bar_codes
		},
		articles_stock_min() {
			return this.articles.filter(article => {
				return article.stock && article.stock_min && article.stock <= article.stock_min  
			})
		},
		articles_stock_0() {
			return this.articles.filter(article => {
				return article.stock <= 0
			})
		},
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