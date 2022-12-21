<template>
<b-modal id="article-images" :title="title" hide-footer body-class="p-0" size="lg">
	<b-row>
		<b-col
		lg="8">
			<carousel></carousel>
		</b-col>
		<b-col
		class="p-15"
		lg="4">
			<image-info></image-info>
		</b-col>
	</b-row>
</b-modal>
</template>
<script>
import Carousel from '@/components/listado/modals/images/Carousel'
import ImageInfo from '@/components/listado/modals/images/ImageInfo'
import BtnLoader from '@/components/common/BtnLoader'
import article_images from '@/mixins/article_images'
export default {
	name: 'ArticleImagesIndex',
	mixins: [article_images],
	components: {
		Carousel,
		ImageInfo,
		BtnLoader,
	},
	computed: {
		title() {
			return 'Imagenes de '+this.article.name
		}
	}
}
</script>
<style lang="sass">
#article-images
	.row 
		width: 100%
		margin: 0
	[class^='col']
		padding: 0
</style>