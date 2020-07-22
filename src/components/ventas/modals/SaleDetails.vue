<template>
<b-modal id="sale-details" title="Detalles de la venta" size="lg" hide-footer>
    <!-- <template v-slot:modal-header>
        <h5 class="modal-title">
            Detalles de la venta
        </h5>
        <strong v-if="sale.client">
            <i class="icon-user"></i>
            {{ sale.client.name }}
        </strong>
        <strong v-if="sale.special_price">
            <i class="icon-user"></i>
            {{ sale.special_price.name }}
        </strong>
    </template> -->
    <b-container fluid>
        <cobrar-deuda 
        :sale="sale"
        @salesFromClient="salesFromClient"></cobrar-deuda>
        <b-row>
            <b-col>
                <div class="table-responsive">                      
                    <table class="table table-striped text-center">
                        <thead class="thead-dark">
                            <th scope="col">Nombre</th>    
                            <th scope="col">Cantidad</th>      
                            <th scope="col" v-show="hasPermissionTo('article.index.cost', user)">Costo</th>      
                            <th scope="col" class="td-lg">Precio</th>      
                            <th scope="col" v-show="hasPermissionTo('article.index.cost', user)">Sub Total Costos</th>      
                            <th scope="col">Sub Total</th>      
                        </thead>
                        <tbody>
                            <tr 
                            v-for="article in sale.articles"
                            :key="article.id">
                                <td>{{ article.name }}</td>
                                <td>
                                    <span v-if="article.uncontable == 1">                                    
                                        {{ article.pivot.amount }} {{ article.pivot.measurement }}(s)
                                    </span>
                                    <span v-else>
                                        {{ article.pivot.amount }}
                                    </span>
                                </td>
                                <td v-show="hasPermissionTo('article.index.cost', user)">
                                    <span v-if="article.pivot.cost">
                                        {{ price(article.pivot.cost) }}
                                    </span>
                                    <span v-else>
                                        No disponible
                                    </span>
                                </td>
                                <td class="td-lg">
                                    <span v-if="article.uncontable == 1">
                                        {{ price(article.pivot.price) }} el {{ article.measurement }}
                                    </span>
                                    <span v-else>
                                        {{ price(article.pivot.price) }}
                                    </span>
                                    <p v-show="sale.percentage_card != null">
                                        <i class="icon-credit-card text-primary"></i>
                                        {{ price_with_card(article) }}
                                    </p>
                                </td>
                                <td v-show="hasPermissionTo('article.index.cost', user)">
                                    {{ getSubTotalCost(article) }}
                                </td>
                                <td>
                                    {{ getSubTotal(article) }}
                                    <p v-show="sale.percentage_card != null">
                                        <i class="icon-credit-card text-primary"></i>
                                        {{ total_with_card(article) }}
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </b-col>
        </b-row>
    </b-container>
</b-modal>
</template>
<script>
import CobrarDeuda from '../components/CobrarDeuda'
export default {
    props: ['sale', 'user'],
    components: {
        CobrarDeuda
    },
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
        getSubTotal(article) {
            var sub_total_price
            if (article.uncontable == 1) {
                if (article.pivot.measurement != article.measurement) {
                    sub_total_price = parseFloat(article.pivot.price) * article.pivot.amount / 1000
                } else {
                    sub_total_price = parseFloat(article.pivot.price) * article.pivot.amount
                }
            } else {
                sub_total_price = parseFloat(article.pivot.price) * article.pivot.amount
            }
            return this.price(sub_total_price)
        },
        getSubTotalCost(article) {
            let sub_total_cost
            if (article.pivot.cost) {
                if (article.uncontable == 1) {
                    if (article.pivot.measurement != article.measurement) {
                        sub_total_cost = parseFloat(article.pivot.cost) * article.pivot.amount / 1000
                    } else {
                        sub_total_cost = parseFloat(article.pivot.cost) * article.pivot.amount
                    }
                } else {
                    sub_total_cost = parseFloat(article.pivot.cost) * article.pivot.amount
                }
                return this.price(sub_total_cost)
            }
            return 'No disponible'
        },
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

</style>
