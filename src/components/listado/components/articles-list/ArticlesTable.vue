<template>
<b-row>
	<b-col>
		<div
		v-if="!loading">
			<b-table 
			class="shadow-1 b-r-1"
			v-show="articles.length"
			:items="items" 
			head-variant="dark" 
			:fields="fields" 
			striped 
			responsive 
			hover 
			selectable 
			ref="articlesTable"
			select-mode="multi"
			@row-selected="onRowSelected">
				<template #cell(selected)="{ rowSelected }">
					<template v-if="rowSelected">
						<span aria-hidden="true">
							<i class="icon-check text-primary"></i>
						</span>
					</template>
					<template v-else>
						<span aria-hidden="true">&nbsp;</span>
					</template>
				</template>
				<template #cell(photo)="data">
					<vue-load-image
					v-if="articles[data.index].images.length">
						<img 
						class="b-r-1"
						slot="image"
						:src="articleImageUrl(articles[data.index])" 
						@click="showImages(articles[data.index])">
						<img slot="preloader" src="@/assets/spinner2.gif"/>
						<div slot="error">Imagen no encontrada</div>
					</vue-load-image>
					<b-dropdown 
					v-else 
					variant="primary"
					right>
						<template 
						v-slot:button-content>
							<i class="icon-camera"></i>
						</template>
						<b-dropdown-item
						@click="uploadArticlePhoto(articles[data.index])">
							Buscar foto
						</b-dropdown-item>
						<b-dropdown-item
						@click="setImagesCopy(articles[data.index])">
							Copiar de otro articulo
						</b-dropdown-item>
					</b-dropdown>
				</template>
				<template #cell(options)="data">
					<div class="buttons">
						<!-- Online -->
						<b-button 
						v-if="has_online"
						@click="setArticleOnline(articles[data.index])"
						size="sm"
						:variant="isArticleOnline(articles[data.index])">
							<btn-loader
							icon="not"
							:index="articles[data.index].id"
							:loader="loading_online"></btn-loader>
						</b-button>
						<b-button 
						v-if="has_online"
						class="m-l-10"
						@click="setFeatured(articles[data.index])"
						size="sm"
						:variant="isFeatured(articles[data.index])">
							<span class="spinner-border spinner-border-sm" v-show="loading_featured == articles[data.index].id"></span>
							<i v-show="loading_featured != articles[data.index].id" class="icon-check"></i>
						</b-button>
						<!-- Proveedores -->
						<b-button 
						v-if="articles[data.index].providers"
						@click="providersHistory(articles[data.index])"
						size="sm"
						class="m-l-10"
						v-intro-step="6"
						v-intro-position="'left'"
						v-intro="'Mira los proveedores de un producto, los costos y precios que se pagaron en cada fecha'">
							<i class="icon-users"></i>
						</b-button>
						<!-- Editar -->
						<b-button 
						variant="primary"
						v-intro-step="7"
						v-intro-position="'left'"
						v-intro="'Actualiza los datos de un producto'"
						size="sm"
						@click="editArticle(articles[data.index])" 
						class="btn-listado btn-listado-edit m-l-10">
							<i class="icon-edit"></i>
						</b-button>
						<!-- Dolar calculator -->
						<b-button 
						v-if="articles[data.index].with_dolar"
						variant="success"
						size="sm"
						@click="setArticleDolarCalculator(articles[data.index])" 
						class="m-l-10">
							<i class="icon-dolar"></i>
						</b-button>
					</div>
				</template>
			</b-table>
			<p 
			v-show="!articles.length"
			class="text-with-icon">
				<i class="icon-not"></i>
				No hay artículos
			</p>
		</div>
		<b-skeleton-table
		v-else
		:hide-header="false"
		:rows="articles.length"
		:columns="8"
		:table-props="{ bordered: true, striped: true }"
		></b-skeleton-table>
	</b-col>
</b-row>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import VueLoadImage from 'vue-load-image'
import edit_articles from '@/mixins/edit_articles'
export default {
	names: 'EditArticles',
	mixins: [edit_articles],
	props: ['articles', 'loading'],
	components: {
		VueLoadImage,
		BtnLoader,
	},
	data() {
		return {
			loading_select_all_articles: false,
			loading_featured: 0,
		}
	},
	watch: {
		all_articles_selected() {
			console.log('watch de all_articles_selected')
			if (this.all_articles_selected) {
				this.$refs.articlesTable.selectAllRows()
			} else {
				this.$refs.articlesTable.clearSelected()
			}
		}
	},
	computed: {
		all_articles_selected() {
			return this.$store.state.articles.all_articles_selected
		},
		fields() {
			let fields = []
			fields.push({ key: 'selected', label: '' })
			if (this.can('articles.images')) {
				fields.push({ key: 'photo', label: 'Foto' })
			}
			fields.push({ key: 'num', label: 'Cod Unico' })
			if (this.hasExtencion('providers')) {
				fields.push({ key: 'provider_code', label: 'Cod Prov' })
			}
			fields.push({ key: 'bar_code', label: 'Cod Barras' })
			fields.push({ key: 'name', label: 'Nombre', sortable: true })
			if (this.can('articles.cost')) {
				fields.push({ key: 'cost', label: 'Costo', sortable: true })
			}
			fields.push({ key: 'price', label: 'Precio', sortable: true })
			if (this.can('articles.stock')) {
				fields.push({ key: 'stock', label: 'Stock', sortable: true })
				fields.push({ key: 'stock_min', label: 'Stock Min', sortable: true })
			}
			fields.push({ key: 'options', label: 'Opciones', sortable: true})
			return fields
		},
		items() {
			let items = []
			this.articles.forEach(article => {
				items.push({
					id: article.id,
					num: article.num,
					provider_code: article.provider_code,
					bar_code: this.barCode(article),
					name: article.name,
					cost: this.articleCost(article),
					price: this.articlePriceListado(article),
					stock: article.stock,
					stock_min: article.stock_min,
					brand: this.brand(article),
					sub_category: this.subCategory(article),
				})
			})
			return items
		},
		special_prices() {
			return this.$store.state.special_prices.special_prices
		},
	},
	methods: {
		setArticleDolarCalculator(article) {
			this.$store.commit('articles/setEdit', article)
			this.$bvModal.show('dolar-calculator')
		},
		articlePriceListado(article) {
			let price = this.articlePrice(article)
			if (article.with_dolar) {
				price += ' ('+this.articlePrice(article, false, true, true)+')'
			}
			return price
		},
		setImagesCopy(article) {
			this.$store.commit('articles/setImagesCopy', article)
			this.$bvModal.show('images-copy')
		},
		onRowSelected(items) {
			this.$store.commit('articles/setSelectedArticles', items)
		},
		barCode(article) {
			if (article.bar_code) {
				return article.bar_code
			} else {
				return '-'
			}
		},
		subCategory(article) {
			if (article.sub_category) {
				return article.sub_category.name
			} else {
				return '-'
			}
		},
		getSpecialPrice(article, special_price_) {
			if (article.special_prices && article.special_prices.length) {
				let s_price = 0
				article.special_prices.forEach(special_price => {
					if (special_price.pivot.special_price_id == special_price_.id && special_price.pivot.price) {
						s_price = special_price
					}
				})
				if (s_price != 0) {
					return this.price(s_price.pivot.price)
				} else {
					return '-'
				}
			} else {
				return '-'
			}
		},
		providersHistory(article) {
			this.orderProvidersHistory(article)
			this.$store.commit('articles/setProvidersHistory', article)
			this.$bvModal.show('providers-history')
		},

		/* -----------------------------------------------------------------------------------
			* Setea las propiedades del articulos con las del articulo pasado por parametro
		----------------------------------------------------------------------------------- */
		deleteArticle(article) {
			this.$store.commit('articles/setDelete', article)
			this.$bvModal.show('delete-article')
		},
		showImage(article) {
			this.$emit('showImage', article)
		},
		addImage(article) {
			this.$emit('addImage', article)
		}
	},
}
</script>
<style scoped>
/*.table-responsive {
	max-height: 65vh;
}
.table-responsive::-webkit-scrollbar  {
	display: none;
}*/
.buttons {
	min-width: 140px;
	display: flex;
	justify-content: center;
}
.infinite-loading-container {
	width: 100%; 
	height: 30px;
}
.spinner-border-sm.text-primary {
	position: absolute;
	top: 4px;
}
img {
	width: 150px;
}
.td-checkbox {
	position: relative;
}
.icon-network {
	position: absolute;
	right: -5px;
	top: 0px;
	z-index: 500;
	font-size: 1.5em;
}
.badge {
	position: absolute;
	top: 5px;
	right: -15px;
	z-index: 500;
}
</style>