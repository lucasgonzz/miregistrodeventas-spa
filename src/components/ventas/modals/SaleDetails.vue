<template>
<b-modal id="sale-details" title="Detalles de la venta" size="lg" header-class="header-class" scrollable hide-footer body-class="p-0">
    <cobrar-deuda 
    :sale="sale"
    @salesFromClient="salesFromClient"></cobrar-deuda>
    <div class="table-responsive">                      
        <table class="table table-striped text-center">
            <thead>
                <th scope="col">Nombre</th>    
                <th scope="col">Cantidad</th>      
                <th scope="col" v-show="can('article.index.cost')">Costo</th>      
                <th scope="col" class="td-lg">Precio</th>      
                <th scope="col" v-show="can('article.index.cost')">Sub Total Costos</th>      
                <th scope="col">Sub Total</th>      
            </thead>
            <tbody>
                <tr 
                v-for="article in sale.articles"
                :key="article.id">
                    <td>{{ article.name }}</td>
                    <td>
                        {{ article.pivot.amount }}
                    </td>
                    <td v-show="can('Ver costos de articulos')">
                        <span v-if="article.pivot.cost">
                            {{ articleCost(article, true) }}
                        </span>
                        <span v-else>
                            -
                        </span>
                    </td>
                    <td class="td-lg">
                        <span v-if="article.uncontable == 1">
                            {{ price(article.pivot.price) }} el {{ article.measurement }}
                        </span>
                        <span v-else>
                            {{ articlePrice(article, true, true) }}
                        </span>
                        <p v-show="sale.percentage_card != null">
                            <i class="icon-credit-card text-primary"></i>
                            {{ price_with_card(article) }}
                        </p>
                    </td>
                    <td v-show="can('article.index.cost')">
                        {{ price(getSubTotalCostArticle(article)) }}
                    </td>
                    <td>
                        {{ price(getSubTotalPriceArticle(article)) }}
                        <p v-show="sale.percentage_card != null">
                            <i class="icon-credit-card text-primary"></i>
                            {{ total_with_card(article) }}
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</b-modal>
</template>
<script>
import CobrarDeuda from '../components/CobrarDeuda'
import Sales from '@/mixins/sales'
export default {
    name: 'SaleDetails',
    components: {
        CobrarDeuda
    },
    computed: {
        sale() {
            return this.$store.state.sales.sale_details
        }
    },
    mixins: [Sales],
    data() {
        return {
            actual_prices: false,
        }
    },
    methods: {
        salesFromClient(client) {
            this.$emit('salesFromClient', client)
        },
        price_with_card(article) {
            return this.price(parseFloat(article.price) * this.percentageCardFormated(this.sale.percentage_card))
        },
        total_with_card(article) {
            return this.price(parseFloat(article.price) * this.percentageCardFormated(this.sale.percentage_card) * article.pivot.amount)
        },
        // getSubTotal(article) {
        //     var sub_total_price
        //     if (article.uncontable == 1) {
        //         if (article.pivot.measurement != article.measurement) {
        //             sub_total_price = parseFloat(article.pivot.price) * article.pivot.amount / 1000
        //         } else {
        //             sub_total_price = parseFloat(article.pivot.price) * article.pivot.amount
        //         }
        //     } else {
        //         sub_total_price = parseFloat(article.pivot.price) * article.pivot.amount
        //     }
        //     return this.price(sub_total_price)
        // },
        // getSubTotalCost(article) {
        //     let sub_total_cost
        //     if (article.pivot.cost) {
        //         if (article.uncontable == 1) {
        //             if (article.pivot.measurement != article.measurement) {
        //                 sub_total_cost = parseFloat(article.pivot.cost) * article.pivot.amount / 1000
        //             } else {
        //                 sub_total_cost = parseFloat(article.pivot.cost) * article.pivot.amount
        //             }
        //         } else {
        //             sub_total_cost = parseFloat(article.pivot.cost) * article.pivot.amount
        //         }
        //         return this.price(sub_total_cost)
        //     }
        //     return 'No disponible'
        // },
        generatePdf() {
            var link = 'sales/pdf/'+this.sale.id+
                        '/1'+
                        '/1'+
                        '/1'+
                        '/1'+
                        '/1'+
                        '/0'
            window.open(link)
        },
    }
}
</script>
<style scoped lang="sass">
.col 
    padding: 0

.text-header 
    font-size: 1.2rem
.header-class 
    display: flex !important
    align-items: center !important
</style>
