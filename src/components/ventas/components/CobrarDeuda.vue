<template>
<b-row v-if="sale.debt">
    <b-col
    class="j-start m-b-10"
    cols="12">
        <b-button-group>
            <b-button 
            variant="secondary">
                Total de la venta: <strong>{{ getTotalSale(sale) }}</strong>
            </b-button>
            <b-button 
            variant="secondary">
                Lo que pago: <strong>{{ price(sale.debt) }}</strong>
            </b-button>
            <b-button 
            variant="danger">
                <strong>
                    Lo que debe: {{ price(getTotalSale(sale, false) - sale.debt) }}
                </strong>
            </b-button>
        </b-button-group>
    </b-col>
    <b-col
    class="j-start"
    cols="12">
        <div class="form-inline m-b-10">
            <button v-show="!pagar_deuda"
                    class="btn btn-primary"
                    @click="changePagarDeuda">
                Cobrar deuda
            </button>
            <button v-show="pagar_deuda"
                    @click="changePagarDeuda"
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
                <btn-loader :loading="cobrando_deuda"></btn-loader>
                Cobrar
            </button>
        </div>
    </b-col>
</b-row>
</template>
<script>
// Mixins
import Sales from '@/mixins/sales'
import BtnLoader from '@/components/common/BtnLoader'
export default {
	props: ['sale'],
	mixins: [Sales],
	components: {
		BtnLoader
	},
	data() {
		return {
            pagar_deuda: false,
            cobrando_deuda: false,
            debt: 0,
		}
	},
	methods: {
        changePagarDeuda() {
            this.debt = this.getTotalSale(this.sale, false) - this.sale.debt
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
                this.$store.dispatch('clients/getClients')
            })
            .catch(err => {
                console.log(err)
            })
        },
	}
}
</script>