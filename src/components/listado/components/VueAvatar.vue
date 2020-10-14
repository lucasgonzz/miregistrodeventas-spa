<template>
	<div
	class="cont">
		<div
		v-if="cropped_image">
			<div 
			class="img-container">
				<img :src="cropped_image_src" alt="">
			</div>
			<b-button
			block
			variant="primary"
			@click="save">
				<btn-loader
				:loader="loading">
					Guardar
				</btn-loader>
			</b-button>
			<b-button
			block
			variant="primary"
			@click="back">
				Atras
			</b-button>
		</div>
		<div
		v-else>
			<vue-avatar
			:width=800
			:height=800
			:border="10"
			ref="vueavatar"
			class="avatarr"
			@vue-avatar-editor:image-ready="onImageReady"
			>
			</vue-avatar>
			<div
			v-show="img_selected">
				<br>
				<vue-avatar-scale
				ref="vueavatarscale"
				@vue-avatar-editor-scale:change-scale="onChangeScale"
				:width=320
				:min=1
				:max=3
				:step=0.02
				>
				</vue-avatar-scale>
				<br>
				<img src="" id="img-1">
				<b-button 
				block
				variant="primary"
				@click="saveClicked">
					Listo
				</b-button>					
			</div>
		</div>
	</div>
</template>			
<script>
import VueAvatar from '@/components/listado/components/vue-avatar/VueAvatar.vue'
import VueAvatarScale from '@/components/listado/components/vue-avatar/VueAvatarScale.vue'
import BtnLoader from '@/components/common/BtnLoader2.vue'
export default {
	props: ['article', 'img', 'img_selected'],
	components: {
		VueAvatar,
		VueAvatarScale,
		BtnLoader
	},
	data() {
		return {
			cropped_image: null,
			cropped_image_src: null,
			loading: false,
		}
	},
	methods: {
        save() {
            this.loading = true
            let formData = new FormData()
            this.cropped_image.toBlob((blob) => {
	            formData.append('file', blob)
	            this.$api.post('articles/image/'+this.article.id, formData)
	            .then(res => {
	                console.log(res.data)
	                this.loading = false
	                this.$bvModal.hide('add-image')
	                this.$toast.success('Foto añadida correctamente')
	                this.back()
	                this.$emit('updateArticlesList')
	            })
	            .catch(err => {
	                this.loading = false
	                console.log(err)
	                this.$toast.error('Error al guardar la foto')
	            })
            })
        },
		back() {
			this.$emit('setImgSelected', false)
			this.cropped_image = null
			this.cropped_image_src = null
		},
		onChangeScale (scale) {
			this.$refs.vueavatar.changeScale(scale)
		},
		saveClicked(){
			var img = this.$refs.vueavatar.getImageScaled()
			this.cropped_image = img
			this.cropped_image_src = img.toDataURL()
		},
		onImageReady(scale){
			this.$emit('setImgSelected', true)
			this.$refs.vueavatarscale.setScale(scale)
		}
	}
}
</script>
<style scoped lang="sass">
.cont
	// width: 320px
.img-container
	width: 100%
	margin-bottom: 1em
</style>