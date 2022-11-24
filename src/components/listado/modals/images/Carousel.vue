<template>
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
				<!-- <vue-load-image>
					<div slot="image" :data-src="imageUrl(image)"></div>
					<b-skeleton-img></b-skeleton-img>
					<div slot="error">Error al cargar la imagen</div>
				</vue-load-image> -->
				<img
				class="d-block img-fluid"
				:src="imageUrl(image)"
				:alt="article.name+'-image-'+image.id">
			</template>
		</b-carousel-slide>
	</b-carousel>
</template>
<script>
import VueLoadImage from 'vue-load-image'
import article_images from '@/mixins/article_images'
export default {
	name: 'ArticleImagesCarousel',
	mixins: [article_images],
	components: {
		VueLoadImage,
	},
	computed: {
		article() {
			return this.$store.state.articles.images_to_show
		},
		slide: {
			get() {
				return this.$store.state.articles.images_slide
			},
			set(value) {
				this.$store.commit('articles/setImagesSlide', value)
			}
		},
	},
}
</script>