<template>
<b-modal id="add-image" :title="`Agregar foto para ${this.article.name}`" scrollable>
    <b-container fluid>
        <cargando :is_loading="loading" tam="md"></cargando>
        <b-row v-show="!loading">
            <b-col cols="12">
                <b-form-file
                v-model="file"
                :state="Boolean(file)"
                v-on:change="onFileChange" 
                lang="es"
                placeholder="Elegi una foto o arrastrala hasta aca..."
                drop-placeholder="Arrastra el archivo hasta aca..."
                ></b-form-file>
                <div class="mt-3" v-if="file">Foto seleccionada: {{ file.name }}</div>
            </b-col>
            <b-col cols="12">
                <!-- Carrusel -->
                <b-carousel
                v-show="!loading"
                id="carousel"
                controls
                indicators>
                    <b-carousel-slide
                    v-for="image in article.images"
                    :key="image.id"
                    :img-src="imageUrl(image)"></b-carousel-slide>                    
                </b-carousel>
            </b-col>
        </b-row>
    </b-container>
</b-modal>
</template>
<script>
import cargando from '../../common/Cargando'
export default {
    props: ['article', 'user'],
    components: {
        cargando
    },
    data() {
        return {
            loading: false,
            file: null,
            deleting_image: false,
            seting_first_image: false,
        }
    },
    methods: {
        deleteImage(image) {
            this.deleting_image = true
            this.$api.get('articles/delete-image/'+image.id)
            .then(() => {
                this.deleting_image = false
                this.$toast.success('Imagen eliminada correctamente')
                this.$emit('updateArticlesList')
                this.$bvmodal.hide('add-image')
            })
            .catch(err => {
                this.deleting_image = false
                console.log(err)
                this.$toast.error('Error al eliminar la imagen')
            })
        },
        setFirstImage(image) {
            this.seting_first_image = true
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
        imageUrl(image) {
            return this.api_url + '/storage/articles/' + this.user.id + '/' + image.url
        },
        onFileChange(e) {
            this.file = e.target.files[0]
            this.loading = true
            let formData = new FormData()
            formData.append('file', this.file)

            this.$api.post('articles/image/'+this.article.id, formData)
            .then(res => {
                console.log(res.data)
                this.loading = false
                this.$bvModal.hide('add-image')
                this.$toast.success('Foto añadida correctamente')
                this.file = null
                this.$emit('updateArticlesList')
            })
            .catch(err => {
                this.loading = false
                console.log(err)
                this.$toast.error('Error al guardar la foto')
            })

        }
    }
}
</script>
