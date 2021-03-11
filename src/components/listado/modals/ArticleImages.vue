<template>
<b-modal id="article-images" hide-footer hide-header body-class="p-0">
	<b-carousel
	id="article-images-carousel"
	v-model="slide"
	:interval="4000"
	controls
	indicators
	background="#ababab"
	img-width="1024"
	img-height="480">
		<b-carousel-slide 
		v-for="image in article.images"
		:key="image.id"
		:img-src="imageUrl(image)">
			<b-button
			@click="imagenPrincipal(image)"
			variant="success">
				<btn-loader
				:loader="loading"
				text="Imagen principal"></btn-loader>
			</b-button>
			<b-button
			class="m-l-10"
			@click="deleteImg(image)"
			variant="danger">
				<btn-loader
				:loader="deleting"
				text="Eliminar"></btn-loader>
			</b-button>
		</b-carousel-slide>
	</b-carousel>
	<div
	class="p-15">
		<b-button
		variant="primary"
		block
		@click="uploadPhoto(article)">
			Agregar foto
		</b-button>
	</div>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	name: 'ArticleImages',
	components: {
		BtnLoader
	},
	data() {
		return {
			slide: 1,
			loading: false,
			deleting: false,
		}
	},
	computed: {
		article() {
			return this.$store.state.articles.images_to_show
		}
	},
	methods: {
		imagenPrincipal(image) {
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
		deleteImg(image) {
			this.deleting = true
			this.$api.delete(`images/${image.id}`)
			.then(res => {
				console.log(res.data.article)
				this.deleting = false
				this.$store.commit('articles/update', res.data.article)
				this.$bvModal.hide('article-images')
				this.$toast.error('Imagen eliminada')
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