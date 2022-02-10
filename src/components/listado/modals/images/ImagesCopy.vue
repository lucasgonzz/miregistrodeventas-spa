<template>
<b-modal
id="images-copy"
:title="title"
size="lg"
hide-footer>
	<select-article
	:selected_article="selected_article"
	text="Busque un articulo para copiar sus imagenes"
	@articleSelected="articleSelected"></select-article>
	<b-form-group>
		<b-form-checkbox
		v-model="copy_descriptions">
			Copiar descripcion
		</b-form-checkbox>
	</b-form-group>
	<b-button
	v-if="selected_article"
	@click="copyImages"
	variant="primary">
		<btn-loader
		:loader="loading"
		text="Copiar imagenes"></btn-loader>
	</b-button>
</b-modal>
</template>
<script>
import SelectArticle from '@/components/common/SelectArticle'
import BtnLoader from '@/components/common/BtnLoader'
export default {
	components: {
		SelectArticle,
		BtnLoader,
	},
	data() {
		return {
			selected_article: null,
			copy_descriptions: false,
			loading: false,
		}
	},
	computed: {
		title() {
			return 'Copiar imagenes para '+this.images_copy.name
		},
		images_copy() {
			return this.$store.state.articles.images_copy
		},
	},
	methods: {
		isSelectedArticle(article) {
			return this.selected_article && this.selected_article.id == article.id
		},
		articleSelected(article) {
			if (this.isSelectedArticle(article)) {
				this.selected_article = null
			} else {
				this.selected_article = article
			}
			console.log(this.selected_article)
		},
		copyImages() {
			this.loading = true 
			this.$api.put('articles/images-copy', {
				from: this.selected_article.id,
				to: this.images_copy.id,
				copy_descriptions: this.copy_descriptions,
			})
			.then(res => {
				this.loading = false
				this.$toast.success('Imagenes copiadas')
				this.$store.commit('articles/update', res.data.article)
				this.$bvModal.hide('images-copy')
			})
			.catch(err => {
				this.loading = false
				this.$toast.error('Error al copiar imagenes')
				console.log(err)
			})
		}
	}
}
</script>