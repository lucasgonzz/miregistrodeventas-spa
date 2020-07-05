<template>
<b-modal id="descargar-pdf" title="Descargar mis artículos" scrollable>
    <b-container>
        <b-row>
            <b-col>
                <b-card header="¿Que artículos queres descargar?">
                    <b-form-radio
                    v-model="articulosADescargar"
                    value="todos">
                        Todos
                    </b-form-radio>
                    <b-form-radio
                    v-model="articulosADescargar"
                    value="esta-pagina">
                        Esta página
                    </b-form-radio>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card header="¿Que columnas queres que se muestren?">
                    <b-form-checkbox
                    v-model="columnasParaImprimir"
                    value="bar_code">
                        Codigo de barras
                    </b-form-checkbox>
                    <b-form-checkbox
                    v-model="columnasParaImprimir"
                    value="name">
                        Nombre
                    </b-form-checkbox>
                    <b-form-checkbox
                    v-model="columnasParaImprimir"
                    value="cost">
                        Costo
                    </b-form-checkbox>
                    <b-form-checkbox
                    v-model="columnasParaImprimir"
                    value="price">
                        Precio
                    </b-form-checkbox>
                    <b-form-checkbox
                    v-model="columnasParaImprimir"
                    value="previus_price">
                        Precio anterior
                    </b-form-checkbox>
                    <b-form-checkbox
                    v-model="columnasParaImprimir"
                    value="stock">
                        Stock
                    </b-form-checkbox>
                    <b-form-checkbox
                    v-model="columnasParaImprimir"
                    value="created_at">
                        Fecha en que se agrego
                    </b-form-checkbox>
                    <b-form-checkbox
                    v-model="columnasParaImprimir"
                    value="updated_at">
                        Ultima fecha en que se actualizo
                    </b-form-checkbox>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card header="Orientacion">
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
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card header="Cabecera">
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
            </b-col>
        </b-row>
    </b-container>
    <template v-slot:modal-footer>
        <a :href="getLink()" target="_blank" class="btn btn-danger">
            <i class="icon-download"></i>
            Generar Pdf
        </a>
    </template>
</b-modal>
</template>
<script>
export default {
    props: ['articles_id', 'filtro', 'selected_articles'],
    data() {
        return {
            articulosADescargar: 'esta-pagina',
            columnasParaImprimir: ['name', 'cost', 'price', 'created_at'],
            orientation: 'normal',
            // design: 'blanco-negro',
            header: ['date', 'company_name'],
        }
    },
    methods: {
        getLink() {
            var link = 'pdf/' + this.getColumnasParaImpirimir().join('-') + '/'
            if (this.articulosADescargar == 'esta-pagina') {
                this.articles_id.forEach( id => {
                    link += id + '-'
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
            if (this.columnasParaImprimir.includes('bar_code')) {
                columns.push('bar_code')
            }
            if (this.columnasParaImprimir.includes('name')) {
                columns.push('name')
            }
            if (this.columnasParaImprimir.includes('cost')) {
                columns.push('cost')
            }
            if (this.columnasParaImprimir.includes('price')) {
                columns.push('price')
            }
            if (this.columnasParaImprimir.includes('previus_price')) {
                columns.push('previus_price')
            }
            if (this.columnasParaImprimir.includes('stock')) {
                columns.push('stock')
            }
            if (this.columnasParaImprimir.includes('created_at')) {
                columns.push('created_at')
            }
            if (this.columnasParaImprimir.includes('updated_at')) {
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