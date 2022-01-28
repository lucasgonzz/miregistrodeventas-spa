<template>
<b-modal id="article-images" hide-footer hide-header body-class="p-0" size="lg">
	<b-carousel
	id="article-images-carousel"
	v-model="slide" 
	:interval="0"
	controls
	indicators
	background="#ababab"
	img-width="1024"
	img-height="480">
		<b-carousel-slide 
		v-for="image in article.images"
		:key="image.id">
			<template v-slot:img>
				<vue-load-image>
					<div slot="image" :data-src="imageUrl(image.url)"></div>
					<b-skeleton-img></b-skeleton-img>
					<div slot="error">Error al cargar la imagen</div>
				</vue-load-image>
				<img
				class="d-block img-fluid"
				:src="imageUrl(image.url)"
				:alt="article.name+'-image-'+image.id"
				>
			</template>
		</b-carousel-slide>
	</b-carousel>
	<div
	class="p-15 j-center">
		<b-button
		@click="imagenPrincipal()"
		variant="success">
			<btn-loader
			:loader="loading"
			text="Imagen principal"></btn-loader>
		</b-button>
		<b-button
		class="m-l-10"
		@click="deleteImg()"
		variant="danger">
			<btn-loader
			:loader="deleting"
			text="Eliminar"></btn-loader>
		</b-button>
	</div>
	<div
	class="p-15 p-t-0">
		<b-button
		variant="primary"
		block
		@click="uploadArticlePhoto(article)">
			Agregar foto
		</b-button>
		<variant-info></variant-info>
	</div>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import VariantInfo from '@/components/listado/modals/images/VariantInfo'
import VueLoadImage from 'vue-load-image'
export default {
	name: 'ArticleImages',
	components: {
		BtnLoader,
		VariantInfo,
		VueLoadImage,
	},
	data() {
		return {
			slide: 0,
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
</style>