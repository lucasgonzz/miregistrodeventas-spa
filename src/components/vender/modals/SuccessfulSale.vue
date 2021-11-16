<template>
<b-modal id="successful-sale" title="Venta realizada correctamente" hide-footer>
    <p class="text-with-icon">
        Venta realizada con exito
        <span class="icon-check"></span>
    </p>
    <div
    class="j-around align-center">
        <b-button 
        variant="primary"
        @click="pdfClient">
            <i class="icon-print"></i>
            Factura para el Cliente
        </b-button>
        <b-button 
        variant="success"
        @click="pdfCommerce">
            <i class="icon-print"></i>
            Factura para el Comercio
        </b-button>
    </div>
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
            var link = process.env.VUE_APP_API_URL+`/sales/pdf/${this.sale.id}/0`
            window.open(link)
        },
        pdfCommerce() {
            var link = process.env.VUE_APP_API_URL+`/sales/pdf/${this.sale.id}/1`
            window.open(link)
        },
    }
}
</script>