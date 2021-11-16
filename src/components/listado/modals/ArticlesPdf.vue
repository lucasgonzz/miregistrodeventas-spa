<template>
<b-modal 
id="articles-pdf" 
title="Descargar mis artículos"
hide-footer>
    <b-card 
    class="shadow p-10 b-r"
    header="¿Que artículos queres descargar?">
        <b-form-radio
        v-model="articulos_a_descargar"
        value="todos">
            Todos
        </b-form-radio>
        <b-form-radio
        v-model="articulos_a_descargar"
        value="esta-pagina">
            Esta página
        </b-form-radio>
    </b-card>
    <b-card 
    class="shadow p-10 b-r"
    header="¿Que columnas queres que se muestren?">
        <b-form-checkbox
        v-model="columnas_para_imprimir"
        value="bar_code">
            Codigo de barras
        </b-form-checkbox>
        <b-form-checkbox
        v-model="columnas_para_imprimir"
        value="name">
            Nombre
        </b-form-checkbox>
        <b-form-checkbox
        v-model="columnas_para_imprimir"
        value="cost">
            Costo
        </b-form-checkbox>
        <b-form-checkbox
        v-model="columnas_para_imprimir"
        value="price">
            Precio
        </b-form-checkbox>
        <b-form-checkbox
        v-model="columnas_para_imprimir"
        value="previus_price">
            Precio anterior
        </b-form-checkbox>
        <b-form-checkbox
        v-model="columnas_para_imprimir"
        value="stock">
            Stock
        </b-form-checkbox>
        <b-form-checkbox
        v-model="columnas_para_imprimir"
        value="created_at">
            Fecha en que se agrego
        </b-form-checkbox>
        <b-form-checkbox
        v-model="columnas_para_imprimir"
        value="updated_at">
            Ultima fecha en que se actualizo
        </b-form-checkbox>
    </b-card>
    <b-card 
    class="shadow p-10 b-r"
    header="Orientacion">
        <b-form-radio
        v-model="orientation"
        value="normal">
            Normal
        </b-form-radio>
        <b-form-radio
        v-model="orientation"
        value="apaisado">
            Apaisado
        </b-form-radio>
    </b-card>
    <b-card 
    class="shadow p-10 b-r"
    header="Cabecera">
        <b-form-checkbox
        v-model="header"
        value="date">
            Fecha
        </b-form-checkbox>
        <b-form-checkbox
        v-model="header"
        value="company_name">
            Nombre del comercio
        </b-form-checkbox>
    </b-card>
    <b-button 
    block
    :href="getLink()" 
    target="_blank" 
    variant="danger">
        <i class="icon-download"></i>
        Generar Pdf
    </b-button>
</b-modal>
</template>
<script>
export default {
    data() {
        return {
            articulos_a_descargar: 'esta-pagina',
            columnas_para_imprimir: ['name', 'cost', 'price', 'created_at'],
            orientation: 'normal',
            header: ['date', 'company_name'],
        }
    },
    computed: {
        articles_to_show() {
            return this.$store.state.articles.articles_to_show
        },
    },
    methods: {
        getLink() {
            var link = process.env.VUE_APP_API_URL+'/pdf/' + this.getColumnasParaImpirimir().join('-') + '/'
            if (this.articulos_a_descargar == 'esta-pagina') {
                this.articles_to_show.forEach( article => {
                    link += article.id + '-'
                })
                link = link.substring(0, link.length-1)
            } else {
                link += 'todos'
            }
            link += '/' + this.orientation + '/'
            if (this.header.length) {
              link += this.header.join('-')
            }
            return link
        },
        getColumnasParaImpirimir() {
            var columns = []
            if (this.columnas_para_imprimir.includes('bar_code')) {
                columns.push('bar_code')
            }
            if (this.columnas_para_imprimir.includes('name')) {
                columns.push('name')
            }
            if (this.columnas_para_imprimir.includes('cost')) {
                columns.push('cost')
            }
            if (this.columnas_para_imprimir.includes('price')) {
                columns.push('price')
            }
            if (this.columnas_para_imprimir.includes('previus_price')) {
                columns.push('previus_price')
            }
            if (this.columnas_para_imprimir.includes('stock')) {
                columns.push('stock')
            }
            if (this.columnas_para_imprimir.includes('created_at')) {
                columns.push('created_at')
            }
            if (this.columnas_para_imprimir.includes('updated_at')) {
                columns.push('updated_at')
            }
            return columns
        }
    }
}
</script>
<style scoped>
.row {
    margin-bottom: 15px;
}
</style>