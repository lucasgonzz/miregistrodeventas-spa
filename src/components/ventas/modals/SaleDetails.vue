<template>
<b-modal id="sale-details" title="Detalles de la venta" size="lg" hide-footer>
    <b-container fluid>
        <b-row v-if="sale.debt">
            <b-col>
                <b-button-group>
                    <b-button 
                    variant="secondary">
                        Total de la venta: <strong>{{ getPrice() }}</strong>
                    </b-button>
                    <b-button 
                    variant="secondary">
                        Lo que pago: <strong>{{ price(sale.debt) }}</strong>
                    </b-button>
                    <b-button 
                    variant="danger">
                        <strong>
                            Lo que debe: {{ price(getPrice(false) - sale.debt) }}
                        </strong>
                    </b-button>
                </b-button-group>
                <div class="form-inline m-b-10">
                    <button v-show="!pagar_deuda"
                            class="btn btn-primary"
                            @click="change_pagar_deuda">
                        Cobrar deuda
                    </button>
                    <button v-show="pagar_deuda"
                            @click="change_pagar_deuda"
                            class="btn btn-secondary">
                        Cancelar
                    </button>
                    
                    <label class="m-l-10" v-show="pagar_deuda" for="a_pagar">   
                        ¿Cuanto va a pagar?
                    </label>
                    <input v-show="pagar_deuda" 
                            v-model="debt"
                            @keyup.enter="pagarDeuda"
                            type="number" id="a_pagar" 
                            class="form-control m-l-10">
                    <button v-show="pagar_deuda" 
                            @click="pagarDeuda"
                            class="btn btn-success m-l-10">
                        <i class="icon-check" v-show="!cobrando_deuda"></i>
                        <span v-show="cobrando_deuda"
                                class="spinner-border spinner-border-sm"></span>
                        Cobrar
                    </button>
                </div>
            </b-col>
        </b-row>
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
import numeral from 'numeral'
export default {
    props: ['sale', 'user'],
    data() {
        return {
            actual_prices: false,
            pagar_deuda: false,
            debt: 0,
            cobrando_deuda: false,
        }
    },
    methods: {
        change_pagar_deuda() {
            this.debt = this.getPrice(false) - this.sale.debt
            if (this.pagar_deuda) {
                this.pagar_deuda = false
            } else {
                this.pagar_deuda = true
            }
        },
        pagarDeuda() {
            this.cobrando_deuda = true
            this.$api.get('sales/pagar-deuda/'+this.sale.id+'/'+this.debt)
            .then(() => {
                this.cobrando_deuda = false
                this.debt = 0
                this.pagar_deuda = false
                this.$toast.success('Deuda cobrada correctamente')
                this.$emit('salesFromClient', this.sale.client)
                this.$bvModal.hide('sale-details')
            })
            .catch(err => {
                console.log(err)
            })
        },
        getPrice(formated = true) {
            if (this.sale.articles) {
                var price = 0
                this.sale.articles.forEach(article => {
                    if (article.uncontable == 0) {
                        price += parseFloat(article.price) * article.pivot.amount
                    } else {
                        if (article.pivot.measurement == article.measurement) {
                            price += parseFloat(article.price) * article.pivot.amount
                        } else {
                            price += parseFloat(article.price) * article.pivot.amount / 1000
                        }               
                    }
                })
                if (this.sale.percentage_card) {
                    var p = Number('1.'+parseInt(this.sale.percentage_card))
                    price = price * p
                }
                if (formated) {
                    return numeral(price).format('$0,0.00')
                } else {
                    return price
                }
            }
        },
        price_with_card(article) {
            return this.price(parseFloat(article.price) * parseFloat('1.' + this.sale.percentage_card))
        },
        total_with_card(article) {
            return this.price(parseFloat(article.price) * parseFloat('1.' + this.sale.percentage_card) * article.pivot.amount)
        },
        getSubTotal(article) {
            var sub_total_price
            if (article.uncontable == 1) {
                if (article.pivot.measurement != article.measurement) {
                    // console.log('diferente: '+article.name)
                    sub_total_price = parseFloat(article.pivot.price) * article.pivot.amount / 1000
                } else {
                    sub_total_price = parseFloat(article.pivot.price) * article.pivot.amount
                }
            } else {
                sub_total_price = parseFloat(article.pivot.price) * article.pivot.amount
            }
            // var sub_total = parseFloat(article.pivot.price) * article.pivot.amount
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
            // var link = 'sales/pdf/'+this.sale.id+
            //             '/1/'+
            //             '/'+ this.show_costs ? '1' : '0' +
            //             '/'+ this.show_costs ? '1' : '0' +
            //             '/1/'+
            //             '/'+ this.show_costs ? '1' : '0' +
            //             '/0'
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
<style scoped>
.col {
    padding: 0
}
.text-header {
    font-size: 1.2rem;
}
</style>
