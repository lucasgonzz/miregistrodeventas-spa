<template>
	<div
	class="images"
	v-if="model.id">
		<div>
			<div
			v-if="model.image_url">
				<img 
				class="b-r-1 shadow-1 m-b-10"
				:src="image(model)">
				<b-button
				size="sm"
				block 
				variant="primary"
				@click="uploadImage(model_name, model, modelPlural(model_name)+'/update', model_name)">
					Cambiar imagen
				</b-button>
				<hr>
			</div>
			<div
			class="p-l-25 p-r-25"
			v-else-if="model.images">
				<carousel
				class="m-b-10"
				v-if="model.images && model.images.length"
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
						<b-button
						@click="setDelete(image)"
						variant="danger">
							Eliminar imagen
						</b-button>
						<vue-load-image>
							<img
							slot="image"
							class="slide-img" 
							:src="imageUrl(image.url)" 
							:alt="app_name+'-'+model.name">
							<img 
							slot="preloader"
							src="@/assets/spinner.gif"/>
							<div slot="error">
								Imagen no encontrada
							</div>
						</vue-load-image>
					</slide>
				</carousel>
				<b-button
				size="sm"
				block 
				variant="primary"
				@click="uploadImage(model_name, model, modelPlural(model_name)+'/update'), model_name">
					Agregar imagen
				</b-button>
			</div>
		</div>
	</div>
</template>
<script>
import VueLoadImage from 'vue-load-image'
import { Carousel, Slide } from 'vue-carousel'
export default {
	props: ['model', 'model_name'],
	components: {
		VueLoadImage,
	    Carousel,
	    Slide
	},
	methods: {
		setDelete(image) {
			this.$store.commit(this.modelPlural(this.model_name)+'/setDeleteImage', image)
			this.$bvModal.show('delete-'+this.model_name+'-image')
		}
	}
}
</script>
<style scoped lang="sass">
.images
	img 
		width: 100%
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