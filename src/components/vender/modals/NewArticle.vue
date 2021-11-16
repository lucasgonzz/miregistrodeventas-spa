<template>
<b-modal id="new-article" title="Artículo Nuevo" hide-footer>
    <b-form-group>
        <b-form-input
        type="number"
        id="new-article-price"
        min="0"
        v-model="new_article.price"
        placeholder="Ingrese el precio del artículo"
        @keyup.enter="saveNewArticle"></b-form-input>
    </b-form-group>
    <b-form-group>
        <b-button
        block
        variant="primary"
        @click="saveNewArticle">
            <btn-loader
            text="Listo"
            :loader="loading"></btn-loader>
        </b-button>
    </b-form-group>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import vender from '@/mixins/vender'
export default {
    mixins: [vender],
    components: {
        BtnLoader,
    },
    data() {
        return {
            loading: false,
        }
    },
    computed: {
        new_article() {
            return this.$store.state.vender.new_article
        },
    },
    methods: {
        saveNewArticle() {
            if (this.check()) {
                this.loading = true
                this.$api.post('articles/new-article', this.new_article)
                .then(res => {
                    this.loading = false
                    let article = res.data.article
                    this.$toast.success('Articulo guardado')
                    this.$store.commit('articles/addArticle', article)
                    this.$store.commit('articles/setArticlesToShow')
                    this.addArticleForSale(article)
                    this.$bvModal.hide('new-article')
                    if (this.is_provider) {
                        setTimeout(() => {
                            document.getElementById('article-amount').focus()
                        }, 300)
                    }
                })
                .catch(err => {
                    this.loading = false
                    console.log(err)
                })
            }
        },
        check() {
            console.log(this.new_article.price)
            if (this.new_article.price == '' || typeof this.new_article.price == 'undefined') {
                this.$toast.error('Ingrese un precio para el articulo')
                return false
            } else {
                return true
            }
        },
    }
}
</script>