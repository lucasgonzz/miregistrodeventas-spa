<template>
<b-modal id="print-sales" title="Imprimir Remito" hide-footer>
    <b-card header="En el remito se mostrara" no-body>
        <div>
            <b-form-checkbox
            v-model="company_name"
            :value="1"
            :unchecked-value="0">
                Nombre del comercio
            </b-form-checkbox>
            <b-form-checkbox
            v-model="articles_cost"
            :value="1"
            :unchecked-value="0">
                Costo de los artículos
            </b-form-checkbox>
            <b-form-checkbox
            v-model="articles_subtotal_cost"
            :value="1"
            :unchecked-value="0">
                Subtotal de los costos
            </b-form-checkbox>
            <b-form-checkbox
            v-model="articles_total_price"
            :value="1"
            :unchecked-value="0">
                La suma de los precios de los artículos por cada página
            </b-form-checkbox>
            <b-form-checkbox
            v-model="articles_total_cost"
            :value="1"
            :unchecked-value="0">
                La suma de los costos de los artículos por cada página
            </b-form-checkbox>
            <b-form-checkbox
            v-model="borders"
            :value="1"
            :unchecked-value="0">
                Bordes
            </b-form-checkbox>
            <b-form-group
            class="m-b-0 m-t-10">
                <b-button
                block
                variant="primary"
                @click="generatePdf">
                    <i class="icon-print"></i>
                    Generar remito
                </b-button>
            </b-form-group>
        </div>
    </b-card>
</b-modal>
</template>
<script>
export default {
    name: 'PrintSales',
    data() {
        return {
            company_name: 1,
            articles_cost: 0,
            articles_subtotal_cost: 0,
            articles_total_price: 1,
            articles_total_cost: 0,
            borders: 0,
            // articles_per_page: 25,
        }
    },
    computed: {
        sale() {
            return this.$store.state.sales.sale_to_print
        },
        selected_sales() {
            return this.$store.state.sales.selected_sales
        },
    },
    methods: {
        generatePdf() {
            var sales_id_ = []
            this.selected_sales.forEach(sale => {
                sales_id_.push(sale.id)
            })
            console.log(this.selected_sales)
            console.log(sales_id_)
            var link = process.env.VUE_APP_API_URL+'/sales/pdf/'+sales_id_.join('-')+
            '/'+this.company_name+
            '/'+this.articles_cost+
            '/'+this.articles_subtotal_cost+
            '/'+this.articles_total_price+
            '/'+this.articles_total_cost+
            '/'+this.borders
            // '/'+this.articles_per_page
            window.open(link)
            this.$bvModal.hide('print-sales')
            this.clear()
        },
        clear() {
            this.company_name = 1
            this.articles_cost = 0
            this.articles_subtotal_cost = 0
            this.articles_total_price = 1
            this.articles_total_cost = 0
            this.borders = 0
        }
    }
}
</script>