<template>
	<div
	class="title-image">
		<b-form-input
		class="m-b-15"
		v-model="title.header"
		placeholder="Titulo"></b-form-input>
		<b-form-textarea
		class="m-b-15"
		v-model="title.lead"
		placeholder="Texto"></b-form-textarea>
		<div
		v-if="title.image_url">
			<img 
			class="m-b-15"
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
		<b-form-input
		class="m-t-15"
		v-model="title.color"
		placeholder="Color"></b-form-input>
		<b-button 
		block
		class="m-t-15"
		@click="update"
		variant="primary">
			<btn-loader
			:loader="loading"
			text="Actualizar"></btn-loader>
		</b-button>
	</div>
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
	img 	
		width: 100%
</style>