<template>
	<b-card 
	class="shadow-5 b-r-1 title-image"
	title="Imagenes">
		<vue-horizontal-list 
		:items="titles" :options="options">
			<template v-slot:default="{ item }">
				<div
				class="title">
					<b-form-input
					class="m-b-15"
					v-model="item.header"
					placeholder="Titulo"></b-form-input>
					<b-form-textarea
					class="m-b-15"
					v-model="item.lead"
					placeholder="Texto"></b-form-textarea>
					<div
					class="cont-img"
					v-if="item.image_url">
						<img 
						class="s b-r-1"
						:src="imageUrl(item.image_url)">
						<b-button 
						@click="uploadTitlePhoto(item)"
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
						v-model="item.color"
						placeholder="Color"></b-form-input>
					</b-form-group>
					<b-button 
					block
					class="m-t-15"
					@click="update(item)"
					variant="primary">
						<btn-loader
						:loader="loading"
						text="Actualizar"></btn-loader>
					</b-button>
				</div>
			</template>
		</vue-horizontal-list>
	</b-card>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import VueHorizontalList from "vue-horizontal-list"
export default {
	components: {
		BtnLoader,
		VueHorizontalList,
	},
	computed: {
		titles() {
			return this.$store.state.titles.titles
		}
	},
	data() {
		return {
			loading: false,
			options: {
				responsive: [
					{ size: 1 },
				],
				list: {
					// 1200 because @media (min-width: 1200px) and therefore I want to switch to windowed mode
					windowed: 0,

					// Because: #app {padding: 80px 24px;}
					padding: 20,
				},
				position: {
					start: 0,
				},
				navigation: {
					// when to show navigation
					start: 0,
					color: "#000",
				},
				autoplay: { play: false, repeat: false, speed: 2500 },
			},
		}
	},
	methods: {
		update(title) {
			this.loading = true 
			this.$api.put('titles', title)
			.then(res => {
				this.loading = false 
				this.$store.commit('titles/update', res.data.title)
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
	.title 
		width: 100%
		margin-top: -10px
		margin-bottom: -10px
		// margin: auto
		.cont-img 
			display: flex
			width: 100%
			justify-content: space-around
			align-items: center
			margin-bottom: 15px
			img 	
				width: 50%
		.col-form-label
			font-size: .7em 
</style>