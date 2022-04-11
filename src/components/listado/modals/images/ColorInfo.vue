<template>
<div
class="m-t-10">
	<div 
	v-if="selected_image.color"
	:style="{backgroundColor: selected_image.color.value}"
	class="color shadow-1 c-p"
	v-b-modal="'article-images-colors'">
		<p>
			{{ selected_image.color.name }}
		</p>
	</div>
	<b-button
	v-else 
	block 
	variant="primary"
	v-b-modal="'article-images-colors'">
		Asignar color
	</b-button>
	<div
	v-if="color_without_image">
		<hr>
		<p>
			Los siguientes colores no tienen imagen asignada
		</p>
		<div 
		:style="{backgroundColor: color_without_image.value}"
		class="color shadow-1 c-p">
			<p>
				{{ color_without_image.name }}
			</p>
		</div>
	</div>
</div>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import article_images from '@/mixins/article_images'
export default {
	name: 'ArticleImages',
	mixins: [article_images],
	components: {
		BtnLoader,
	},
	computed: {
		color_without_image() {
			let color_without_image = null
			this.article.colors.forEach(color => {
				let image = this.article.images.find(image => {
					return image.color_id == color.id
				})
				if (image == undefined) {
					color_without_image = color 
				}
			})
			return color_without_image
		}
	},
	data() {
		return {
			loading: false,
			deleting: false,
		}
	},
	methods: {
		imagenPrincipal() {
			let image = this.article.images[this.slide]
			this.loading = true
			this.$api.get(`articles/set-first-image/${image.id}`)
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
			let image = this.article.images[this.slide]
			this.deleting = true
			this.$api.delete(`images/${image.id}`)
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