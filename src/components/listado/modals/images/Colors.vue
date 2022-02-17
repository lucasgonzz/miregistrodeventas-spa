<template>
<b-modal id="article-images-colors" hide-footer hide-header body-class="p-0" size="lg">
	<div class="p-15">
		<p>
			Seleccione el color al que pertenece la imagen
		</p>
		<div 
		class="cont-colors">
			<div 
			@click="setColor(color)"
			:class="isColorSelected(color)"
			v-for="color in article.colors"
			:key="color.id"
			:style="{backgroundColor: color.value}"
			class="color c-p shadow-1">
				<p>
					{{ color.name }}
				</p>
			</div>
		</div>
	</div>
</b-modal>
</template>
<script>
import article_images from '@/mixins/article_images'
export default {
	name: 'ArticleImagesIndex',
	mixins: [article_images],
	computed: {
		colors() {
			return this.$store.state.colors.colors
		},
	},
	methods: {
		setColor(color) {
			this.selected_image.color_id = color.id 
			this.$api.put('images/set-color', this.selected_image)
			.then(res => {
				this.$toast.success('Color adjuntado')
				this.$store.commit('articles/update', res.data.article)
				this.$bvModal.hide('article-images-colors')
				this.$bvModal.hide('article-images')
			})
			.catch(err => {
				console.log(err)
				this.$toast.error('Error al adjuntar imagen')
			})
		},
		isColorSelected(color) {
			if (this.selected_image && this.selected_image.color_id == color.id) {
				if (color.name == 'White') {
					return 'color-selected-white shadow-1'
				} else {
					return 'color-selected shadow-1'
				}
			}
			return ''
		},
	}
}
</script>