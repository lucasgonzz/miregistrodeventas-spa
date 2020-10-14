<template>
	<b-row
	class="j-center">
        <b-col
        v-show="article.images.length"
        class="m-b-10"
        cols="12">
            <b-carousel
            v-model="slide"
            id="carousel"
            controls
            indicators>
                <b-carousel-slide
                v-for="image in article.images"
                :key="image.id"
                :img-src="imageUrl(image, user)">
                </b-carousel-slide>                    
            </b-carousel>
        </b-col>
        <b-col
        v-show="article.images.length"
        class="col-buttons"
        cols="12"
        sm="10"
        lg="6">
            <b-button
            variant="danger"
            @click="deleteImage">
                <btn-loader :loading="deleting_image" icon="trash-3"></btn-loader>
                Eliminar
            </b-button>
            <b-button
            variant="success"
            @click="setFirstImage">
                <btn-loader :loading="seting_first_image"></btn-loader>
                Imagen principal
            </b-button>
        </b-col>
        <b-col
        v-show="article.images.length == 0"
        class="col-buttons"
        cols="12"
        sm="10"
        lg="6">
        <p>
            Este artículo no tiene imagenes
        </p>
        </b-col>
	</b-row>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	props: ['article'],
	components: {
		BtnLoader
	},
    data() {
        return {
            slide: 0,
            deleting_image: false,
            seting_first_image: false,
        }
    },
    computed: {
    	user() {
    		return this.$store.state.auth.user
    	}
    },
    methods: {
        imageUrl(image) {
            return process.env.VUE_APP_API_URL + '/storage/articles/' + this.user.id + '/' + image.url
        },
        deleteImage() {
            this.deleting_image = true
            let image = this.article.images[this.slide]
            this.$api.get('articles/delete-image/'+image.id)
            .then(() => {
                this.deleting_image = false
                this.$toast.success('Imagen eliminada correctamente')
                this.$emit('updateArticlesList')
                this.$bvModal.hide('add-image')
            })
            .catch(err => {
                this.deleting_image = false
                console.log(err)
                this.$toast.error('Error al eliminar la imagen')
            })
        },
        setFirstImage() {
            this.seting_first_image = true
            let image = this.article.images[this.slide]
            this.$api.get('articles/set-first-image/'+image.id)
            .then(() => {
                this.$toast.success('Imagen actualizada correctamente')
                this.$emit('updateArticlesList')
                this.seting_first_image = false
            })
            .catch(err => {
                this.seting_first_image = false
                console.log(err)
                this.$toast.error('Error al actualizar la imagen')
            })
        },
    }
}
</script>
<style scoped lang="sass">
.carousel
    width: 500px
.carousel-control-next-icon:after
    content: '>'
    font-size: 3em
    color: #333
.carousel-control-prev-icon:after 
    content: '<'
    font-size: 3em
    color: #333
.carousel-image-number
    font-size: 1.2em
.col-buttons
    justify-content: space-between
</style>