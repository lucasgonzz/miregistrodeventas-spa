<template>
	<b-card 
	class="shadow-5 b-r-1 title-image"
	title="Imagen principal">
		<b-form-input
		class="m-b-15"
		v-model="title.header"
		placeholder="Titulo"></b-form-input>
		<b-form-textarea
		class="m-b-15"
		v-model="title.lead"
		placeholder="Texto"></b-form-textarea>
		<div
		class="cont-img"
		v-if="title.image_url">
			<img 
			class="s"
			:src="imageUrl(title.image_url)">
			<b-button 
			@click="uploadTitlePhoto()"
			variant="primary">
				Cambiar imagen
			</b-button>
		</div>
		<b-button 
		v-else
		@click="uploadTitlePhoto()"
		variant="primary">
			Subir imagen
		</b-button>
		<b-form-group
		label="Color de fondo">
			<b-form-input	
			v-model="title.color"
			placeholder="Color"></b-form-input>
		</b-form-group>
		<b-button 
		block
		class="m-t-15"
		@click="update"
		variant="primary">
			<btn-loader
			:loader="loading"
			text="Actualizar"></btn-loader>
		</b-button>
	</b-card>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	components: {
		BtnLoader,
	},
	computed: {
		title() {
			return this.$store.state.title.title
		}
	},
	data() {
		return {
			loading: false,
		}
	},
	methods: {
		update() {
			this.loading = true 
			this.$api.put('titles', this.title)
			.then(res => {
				this.loading = false 
				this.$store.commit('title/update', res.data.title)
				this.$toast.success('Titulo actualizado')
			})
			.catch(err => {
				this.loading = false 
				this.$toast.error('Error al actualizar')
				console.log(err)
			})
		}
	}
}
</script>
<style lang="sass">
.title-image
	.cont-img 
		display: flex
		justify-content: space-around
		align-items: center
		img 	
			width: 50%
</style>