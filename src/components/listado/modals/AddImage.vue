<template>
<b-modal id="add-image" :title="`Agregar foto para ${this.article.name}`" scrollable>
    <b-container fluid>
        <cargando :is_loading="loading" tam="sm"></cargando>
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
                <div v-show="!loading" id="carrousel-article-images" class="carousel slide m-t-10" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li 
                        v-for="(image, index) in article.images"
                        :key="image.id" 
                        data-target="#carrousel-article-images" 
                        :data-slide-to="index" 
                        :class="index == 0 ? 'active' : ''"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div 
                        v-for="(image, index) in article.images" 
                        :key="image.id"
                        class="carousel-item"
                        :class="index == 0 ? 'active' : ''">
                            <img :src="imageUrl(image)" class="d-block w-100" :alt="article.name">
                            <div class="carousel-caption d-none d-md-block">
                                <button class="btn btn-danger btn-sm"
                                        @click="deleteImage(image)">
                                    <i class="icon-trash-3" v-show="!deleting_image"></i>
                                    <span class="spinner-border spinner-border-sm" v-show="deleting_image"></span>
                                    Eliminar
                                </button>
                                <button class="btn btn-success btn-sm"
                                        @click="setFirstImage(image)">
                                    <i class="icon-camera" v-show="!seting_first_image"></i>
                                    <span class="spinner-border spinner-border-sm" v-show="seting_first_image"></span>
                                    Principal
                                </button>
                            </div>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carrousel-article-images" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Anterior</span>
                    </a>
                    <a class="carousel-control-next" href="#carrousel-article-images" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Siguiente</span>
                    </a>
                </div>
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
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                }
            }
            let formData = new FormData()
            formData.append('file', this.file)

            this.$api.post('articles/image/'+this.article.id, formData, config)
            .then(res => {
                console.log(res.data)
                this.loading = false
                this.$bvmodal.hide('add-image')
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
<style scoped>

</style>
