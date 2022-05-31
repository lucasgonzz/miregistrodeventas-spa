<template>
<b-row
class="d-lg-none">
	<b-col>
		<div
		class="cards-container"
		v-if="!loading">
			<article-card
			v-show="articles.length"
			v-for="article in articles"
			:article="article"></article-card>
		</div>
		<articles-card-loading
		v-else
		:hide-header="false"
		:rows="articles.length"
		:columns="8"
		:table-props="{ bordered: true, striped: true }"
		></articles-card-loading>
		<p 
		v-show="!articles.length"
		class="text-with-icon">
			<i class="icon-not"></i>
			No hay artículos
		</p>
	</b-col>
</b-row>
</template>
<script>
import ArticleCard from '@/components/listado/components/articles-list/ArticleCard'
import ArticlesCardLoading from '@/components/listado/components/articles-list/ArticlesCardLoading'
export default {
	names: 'EditArticles',
	components: {
		ArticleCard,
		ArticlesCardLoading,
	},
	computed: {
		loading() {
			return this.$store.state.articles.loading
		},
		articles() {
			return this.$store.state.articles.articles_to_show
		},
	},
	methods: {
		isFeatured(article) {
			if (article.featured) {
				return 'success'
			}
			return 'outline-success'
		},
		setFeatured(article) {
			this.loading_featured = article.id
			this.$api.get(`/articles/set-featured/${article.id}`)
			.then(res => {
				this.$toast.success('Articulo agregado en destacados')
				this.loading_featured = 0
				this.$store.commit('articles/update', res.data.article)
			})
			.catch(err => {
				this.$toast.error('Error al agregar articulo en destacados')
				this.loading_featured = 0
				console.log(err)
			})
		},
		showImages(article, index) {
			this.$refs.articlesTable.unselectRow(index)
			this.$store.commit('articles/setImagesToShow', article)
			this.$bvModal.show('article-images')
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
		editArticle(article) {
			this.$store.commit('articles/setEdit', this.setArticle(article))
			this.$bvModal.show('edit-article')
		},
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
<style scoped lang="sass">
.cards-container
	display: flex
	flex-wrap: wrap
	justify-content: space-between
</style>