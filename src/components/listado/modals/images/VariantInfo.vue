<template>
	<b-form 
	v-show="article.images.length > 1"
	class="m-t-15"
	inline>
		<label>
			{{ text }}
		</label>
		<b-button
		@click="setVariants"
		size="sm"
		variant="primary">
			<btn-loader
			:text="button_text"
			:loader="loading"></btn-loader>
		</b-button>
		<b-button
		v-if="article.variants.length"
		v-b-modal="'article-variants'"
		size="sm"
		variant="primary">
			Ver modelos
		</b-button>
	</b-form>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	components: {
		BtnLoader,
	},
	data() {
		return {
			loading: false,
		}
	},
	computed: {
		article() {
			return this.$store.state.articles.images_to_show
		},
		text() {
			if (this.article.variants.length) {
				return 'Son modelos diferentes'
			}
			return 'Son el mismo modelo'
		},
		button_text() {
			if (this.article.variants.length) {
				return 'No, son el mismo'
			}
			return 'No, son diferentes'
		}
	},
	methods: {
		setVariants() {
			if (this.article.variants.length) {
				this.loading = true
				this.$api.delete('/articles/variants/'+this.article.id)
				.then(res => {
					this.loading = false
					this.$toast.success('Artículo actualizado')
					this.$store.commit('articles/update', res.data.article)
					this.$bvModal.hide('article-images')
				})
				.catch(err => {
					this.loading = false
					this.$toast.error('Error al actualizar artículo')
					console.log(err)
				})
			} else {
				this.$bvModal.show('article-variants')
			}
		}
	}
}
</script>