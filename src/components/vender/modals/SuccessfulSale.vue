<template>
<b-modal id="successful-sale" title="Venta realizada correctamente" hide-footer>
    <b-container>
        <div class="row">
            <div class="col-12">
                <h5>En la factura se mostrara</h5>
            </div>
            <div class="col-12">
                <div class="form-group">
                    <div class="custom-control custom-checkbox my-1 mr-sm-2">
                        <input type="checkbox" 
                                v-model="company_name" 
                                true-value="1"
                                false-value="0"
                                class="custom-control-input" id="company_name">
                        <label class="custom-control-label" for="company_name">El nombre del negocio</label>
                    </div>
                </div>
                <div class="form-group">
                    <div class="custom-control custom-checkbox my-1 mr-sm-2">
                        <input type="checkbox" 
                                v-model="borders" 
                                true-value="1"
                                false-value="0"
                                class="custom-control-input" id="borders">
                        <label class="custom-control-label" for="borders">Bordes</label>
                    </div>
                </div>
                <!-- <div class="form-group" v-show="articles_per_page != 0">
                    <div class="form-group">
                        <label for="cantidad-registros">Artículos por página</label>
                        <input type="number" 
                                v-model="articles_per_page"
                                :min="min"
                                :max="max"
                                class="form-control">
                    </div>
                </div> -->
            </div>
        </div>
        <div class="row m-t-5">
            <div class="col">
                <button @click="pdfClient"
                        class="btn btn-primary btn-block">
                    <i class="icon-print"></i>
                    Factura para el Cliente
                </button>
            </div>
            <div class="col">
                <button @click="pdfCommerce"
                        class="btn btn-primary btn-block">
                    <i class="icon-print"></i>
                    Factura para el negocio
                </button>
            </div>
        </div>
    </b-container>
</b-modal>
</template>
<script>
export default {
    data() {
        return {
            company_name: 1,
            borders: 0,
            articles_per_page: 0,
            max: 0,
            min: 0,
        }
    },
    computed: {
        sale() {
            return this.$store.state.vender.sale
        }
    },
    watch: {
        sale() {
            if (this.sale.articles.length > 10) {
                this.articles_per_page = this.sale.articles.length / 2
                this.min = 5
                this.max = this.sale.articles.length
            }
        }
    },
    methods: {
        pdfClient() {
            var link = process.env.VUE_APP_API_URL+`/sales/pdf/${this.sale.id}/${this.company_name}/0/0/1/0/${this.borders}`
            // var link = process.env.VUE_APP_API_URL+'/sales/cliente/'+this.company_name+
            //             '/'+this.borders+
            //             '/'+this.sale.id
            window.open(link)
        },
        pdfCommerce() {
            var link = process.env.VUE_APP_API_URL+`/sales/pdf/${this.sale.id}/${this.company_name}/1/1/1/1/${this.borders}`
            // var link = process.env.VUE_APP_API_URL+`/sales/pdf/${this.sale.id}/${this.company_name}/1/1/1/1/${this.borders}`
            window.open(link)
        },
    }
}
</script>