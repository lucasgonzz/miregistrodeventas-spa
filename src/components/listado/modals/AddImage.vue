<template>
<b-modal id="add-image" :title="`Agregar foto para ${this.article.name}`" size="xl" hide-footer>
    <b-container fluid>
        <b-row>
            <b-col 
            cols="12">
                <add-image-nav
                :view="view"
                @setView="setView"></add-image-nav>
            </b-col>
        </b-row>
        <add-image-carousel
        @updateArticlesList="updateArticlesList"
        v-if="view == 'images'"
        :article="article"></add-image-carousel>
        <add-image-new-image
        @updateArticlesList="updateArticlesList"
        v-if="view == 'add-image'"
        :article="article"></add-image-new-image>
    </b-container>
</b-modal>
</template>
<script>
import AddImageNav from '@/components/listado/components/AddImageNav'
import AddImageCarousel from '@/components/listado/components/AddImageCarousel'
import AddImageNewImage from '@/components/listado/components/AddImageNewImage'
import Cargando from '../../common/Cargando'
export default {
    props: ['article', 'user'],
    components: {
        AddImageNav,
        AddImageCarousel,
        AddImageNewImage,
        Cargando,
    },
    data() {
        return {
            loading: false,
            view: 'add-image'
            // copperSrc: null
        }
    },
    methods: {
        setView(view) {
            this.view = view
        },
        imageUrl(image) {
            return process.env.VUE_APP_API_URL + '/storage/articles/' + this.user.id + '/' + image.url
        },
        updateArticlesList() {
            this.$emit('updateArticlesList')
        },
    },
    created() {
        this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
            if (modalId == 'add-image') {
                if (!this.article.images || this.article.images.length == 0) {
                    this.view = 'add-image'
                }
            }
        })
    }
}
</script>
<style scoped lang="sass">
.col-12 
    flex-direction: column !important   
    @media screen and (max-width: 778px)
        margin-bottom: 1em
.add-image-title
    font-size: 1.2em
.img-container
    width: 100%
    .img-preview
        display: block

        /* This rule is very important, please don't ignore this */
        max-width: 100%
</style>
