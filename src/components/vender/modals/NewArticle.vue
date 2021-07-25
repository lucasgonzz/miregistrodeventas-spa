<template>
<b-modal id="new-article" title="Artículo Nuevo" hide-footer>
    <b-form-group>
        <b-form-input
        type="number"
        min="0"
        v-model="price"
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
export default {
    components: {
        BtnLoader,
    },
    data() {
        return {
            price: '',
            loading: false,
        }
    },
    computed: {
        bar_code() {
            return this.$store.state.vender.new_article_bar_code
        },
    },
    methods: {
        saveNewArticle() {
            if (this.check()) {
                let price = this.price
                this.loading = true
                this.$api.post('articles/new-article', {
                    price,
                    bar_code: this.bar_code,
                })
                .then(res => {
                    console.log(res)
                    this.$toast.success('Articulo guardado')
                    this.$store.commit('articles/addNewArticle', res.data.article)
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        check() {
            if (this.price == '') {
                this.$toast.error('Ingrese un precio para el articulo')
                return false
            }
            return true
        },
        openRegisterArticle() {
            window.open('ingresar')
        },
        run() {
            this.$store.dispatch('articles/getArticles')
            this.$store.dispatch('articles/getBarCodes')
            this.$bvModal.hide('article-not-register')
        }
    }
}
</script>