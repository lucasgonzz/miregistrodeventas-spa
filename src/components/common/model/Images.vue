<template>
	<div
	class="images"
	v-if="model.id">

	    <confirm
	    text="la imagen"
	    :actions="[model_name+'/deleteImage']"
	    :id="'delete-'+model_name+'-image'"
	    toast="Imagen eliminada"></confirm>

		<div>
			<div
			class="p-l-25 p-r-25"
			v-if="typeof model.images != 'undefined' && model.images">
				<carousel
				class="m-b-10"
				v-if="model.images.length"
				navigationEnabled
				navigationNextLabel="<i class='icon-right'></i>"
				navigationPrevLabel="<i class='icon-left'></i>"
				:paginationActiveColor="variant_color"
				paginationColor="#A9A9A9"
				:paginationPadding="5"
				loop
				:perPage="1"
				:adjustableHeight="true">
					<slide
					v-for="(image, index) in model.images"
					:data-index="index"
					:key="image.id">
						<vue-load-image>
							<img
							slot="image"
							class="slide-img" 
							:src="imageUrl(image.url)">
							
					        <b-spinner
							slot="preloader"
					        variant="success"></b-spinner>

							<div slot="error">
								Imagen no encontrada
							</div>
						</vue-load-image>
						<b-button
						@click="setDelete(image)"
						variant="danger">
							Eliminar imagen
						</b-button>
					</slide>
				</carousel>
				<b-button
				size="sm"
				block 
				variant="primary"
				@click="uploadImage(model_name, model)">
					Agregar imagen
				</b-button>
			</div>
			<div
			v-else-if="has_image">
				<div
				class="j-center">
					<vue-load-image>
						<img
						slot="image"
						class="slide-img b-r-1 shadow m-b-10" 
						:src="image(model)">

				        <b-spinner
						slot="preloader"
				        variant="success"></b-spinner>

						<div slot="error">
							Imagen no encontrada
						</div>
					</vue-load-image>
				</div>
				<b-button
				size="sm"
				block 
				class="m-b-10"
				@click="setDelete(model[image_prop])"
				variant="outline-danger">
					Eliminar imagen
				</b-button>
				<b-button
				size="sm"
				block 
				variant="outline-primary"
				@click="uploadImage(model_name, model)">
					Cambiar imagen
				</b-button>
				<hr>
			</div>
		</div>
	</div>
</template>
<script>
import Confirm from '@/components/common/Confirm'
import VueLoadImage from 'vue-load-image'
import { Carousel, Slide } from 'vue-carousel'
export default {
	props: ['model', 'model_name'],
	components: {
		Confirm,
		VueLoadImage,
	    Carousel,
	    Slide
	},
	computed: {
		has_image() {
			if (this.from_cloudinary) {
				return typeof this.model.image_url != 'undefined' && this.model.image_url
			} 
			return typeof this.model.hosting_image_url != 'undefined' && this.model.hosting_image_url
		},
		image_prop() {
			if (this.from_cloudinary) {
				return 'image_url'
			}
			return 'hosting_image_url'
		}
	},
	methods: {
		setDelete(image) {
			console.log(image)
			this.$store.commit(this.model_name+'/setDeleteImage', image)
			this.$bvModal.show('delete-'+this.model_name+'-image')
		}
	}
}
</script>
<style scoped lang="sass">
.images
	img 
		max-width: 100%
	.VueCarousel-slide
		position: relative
		display: flex
		align-items: center
		&:hover > button 
			display: block
		button 
			position: absolute
			top: 50%
			transform: translateY(-50%)
			left: 50%
			transform: translateX(-50%)
			display: none 

	.slide-img
		max-width: 100%
		@media screen and (max-width: 992px)
			max-height: 70vh
		@media screen and (min-width: 992px)
			max-height: calc(100vh - 150px)
</style>