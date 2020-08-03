<template>
<b-modal id="article-not-register" title="Artículo no registrado">
    <b-container fluid>
        <div class="row">
            <div class="col">
                Regitra <button class="btn btn-primary btn-sm" @click.prevent="openRegisterArticle">
                        <i class="icon-level-down"></i>
                        aca
                    </button> tu artículo para poder ingresarlo en esta venta
            </div>
        </div>
    </b-container>
    <template v-slot:modal-footer>
        <b-button 
        variant="primary" 
        @click="run"
        data-dismiss="modal">
            <i class="icon check"></i>
            Listo, ya lo ingrese
        </b-button>
    </template>
</b-modal>
</template>
<script>
export default {
    methods: {
        openRegisterArticle() {
            window.open('ingresar')
        },
        run() {
            this.$store.dispatch('articles/getArticlesNames')
            this.$bvModal.hide('article-not-register')
        }
    }
}
</script>