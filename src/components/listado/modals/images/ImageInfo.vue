<template>
<div>
	<b-button
	block
	@click="imagenPrincipal()"
	variant="success">
		<btn-loader
		:loader="loading"
		text="Imagen principal"></btn-loader>
	</b-button>
	<b-button
	block
	@click="deleteImg()"
	variant="danger">
		<btn-loader
		:loader="deleting"
		text="Eliminar"></btn-loader>
	</b-button>
	<color-info></color-info>
	<hr>
	<b-button
	block
	@click="uploadArticlePhoto(article)"
	variant="primary"
	block>
		<i class="icon-camera"></i>
		Agregar foto
	</b-button>
</div>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import ColorInfo from '@/components/listado/modals/images/ColorInfo'
import article_images from '@/mixins/article_images'
export default {
	name: 'ArticleImages',
	mixins: [article_images],
	components: {
		BtnLoader,
		ColorInfo,
	},
	data() {
		return {
			loading: false,
			deleting: false,
		}
	},
	methods: {
		imagenPrincipal() {
			this.loading = true
			this.$api.get(`articles/set-first-image/${this.selected_image.id}`)
			.then(res => {
				console.log(res.data.article)
				this.loading = false
				this.$store.commit('articles/update', res.data.article)
				this.$bvModal.hide('article-images')
			})
			.catch(err => {
				console.log(err)
				this.loading = false
				this.$toast.error('Error al poner imagen principal, intentelo mas tarde')
			})
		},
		deleteImg() {
			this.deleting = true
			this.$api.delete(`images/${this.selected_image.id}`)
			.then(res => {
				console.log(res.data.article)
				this.deleting = false
				this.$store.commit('articles/update', res.data.article)
				this.$bvModal.hide('article-images')
				this.$toast.success('Imagen eliminada')
			})
			.catch(err => {
				console.log(err)
				this.deleting = false
				this.$toast.error('Error al eliminar la imagen')
			})
		},
	}
}
</script>
<style lang="sass">
#article-images
	[class^='col']
		padding: 0
</style>