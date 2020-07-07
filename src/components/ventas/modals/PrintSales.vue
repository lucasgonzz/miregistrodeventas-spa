<template>
<b-modal id="print-sales" :title="title">
    <b-container fluid>
        <b-row>
            <b-col>
                <b-card header="En el remito se mostrara">
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
                    </div>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
    <template v-slot:modal-footer>
        <b-button
        variant="danger"
        @click="generatePdf">
            Generar remito
        </b-button>
    </template>
</b-modal>
</template>
<script>
export default {
    props: ['sales_id'],
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
        title() {
            if (this.sales_id.length > 1) {
                return `Imprimir remitos de ${this.sales_id.length} ventas`
            }
            return 'Imprimir remito de venta'
        }
    },
    methods: {
        generatePdf() {
            var sales_id_ = []
            this.sales_id.forEach(sale_id => {
                sales_id_.push(sale_id)
            })
            var link = this.api_url+'/sales/pdf/'+sales_id_.join('-')+
            '/'+this.company_name+
            '/'+this.articles_cost+
            '/'+this.articles_subtotal_cost+
            '/'+this.articles_total_price+
            '/'+this.articles_total_cost+
            '/'+this.borders
            // '/'+this.articles_per_page
            window.open(link)
        },
    }
}
</script>