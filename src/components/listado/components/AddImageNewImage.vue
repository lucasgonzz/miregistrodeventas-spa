<template>
    <b-row
    class="j-center">
        <b-col
        cols="12"
        sm="8"
        md="6"
        lg="6">
            <b-button
            @click="addWidget">Widget</b-button>
            <!-- <b-form-file class="mt-3" plain multiple @change="onAddFiles"></b-form-file> -->
        </b-col>
    </b-row>
</template>
<script>
import AvatarCropper from "vue-avatar-cropper"
import Cargando from "@/components/common/Cargando"
export default {
	props: ['article'],
	data() {
		return {
			img_selected: false,
            image: null,
            loading: false,
            myWidget: null,
		}
	},
    components: {
        AvatarCropper,
        Cargando,
    },
    computed: {
        uploadUrl() {
            return process.env.VUE_APP_API_URL+`/api/articles/image/${this.article.id}`
        },
    	title() {
    		if ( ! this.img_selected) {
    			return 'Eligí tu imagen'
    		}
    		return 'Recorta la imagen'
    	}
    },
    created() {
        this.setCn()
    },
	methods: {
        setCn() {
            this.myWidget = cloudinary.createUploadWidget({
                cloudName: 'lucas-cn', 
                uploadPreset: 'my_preset',
                cropping: true
            }, (error, result) => { 
                    if (!error && result && result.event === "success") { 
                        console.log('Done! Here is the image info: ', result.info); 
                    }
                }
            )
        },
        addWidget() {
            this.myWidget.open()
        },
        onAddFiles(files) {
            console.log(files)
        },
        upload(cropper) {
            this.loading = true
            let formData = new FormData()
            cropper.getCroppedCanvas({width: 800, height: 800}).toBlob((blob) => {
                formData.append('file', blob)
                console.log(formData)
                this.$api.post('articles/image/'+this.article.id, formData)
                .then(res => {
                    this.loading = false
                    console.log(res.data)
                    this.$bvModal.hide('add-image')
                    this.$toast.success('Foto añadida correctamente')
                    // this.back()
                    this.$emit('updateArticlesList')
                    // cropper.reset()
                })
                .catch(err => {
                    this.loading = false
                    console.log(err)
                    this.$toast.error('Error al guardar la foto')
                })
            })
        },
        // upload(event) {
        //     this.image = URL.createObjectURL(event.target.files[0])
        // },
		// setImgSelected(value) {
		// 	this.img_selected = value
		// },
		updateArticlesList() {
			this.$emit('updateArticlesList')
		}
	}
}
</script>
<style scoped lang="sass">
.row 
    height: 400px
.col-12
    flex-direction: column
    justify-content: center
    align-items: center
</style>