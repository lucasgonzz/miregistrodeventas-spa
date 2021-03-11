<template>
<div class="p-15"
v-if="sale.debt">
    <b-button-group  
    class="m-b-10">
        <b-button 
        variant="dark">
            Total de la venta: <strong>{{ getTotalSale(sale) }}</strong>
        </b-button>
        <b-button 
        variant="success">
            Lo que pago: <strong>{{ price(sale.debt) }}</strong>
        </b-button>
        <b-button 
        variant="danger">
            <strong>
                Lo que debe: {{ price(getTotalSale(sale, false) - sale.debt) }}
            </strong>
        </b-button>
    </b-button-group>
    <b-form-group>
        <b-button v-show="!pagar_deuda"
                variant="primary"
                @click="changePagarDeuda">
            Cobrar deuda
        </b-button>
        <b-button v-show="pagar_deuda"
                @click="changePagarDeuda"
                variant="secondary">
            Cancelar
        </b-button>
        <b-form-group
        class="m-t-10"
        v-show="pagar_deuda"
        label="¿Cuanto va a pagar?">
            <b-form-input 
            v-model="debt"
            @keyup.enter="pagarDeuda"
            type="number" id="a_pagar" 
            class="m-b-10"></b-form-input>
            <b-button  
            @click="pagarDeuda"
            variant="success">
                <btn-loader text="Cobrar" :loader="cobrando_deuda"></btn-loader>
            </b-button>
        </b-form-group>
    </b-form-group>
</div>
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
            .then(res => {
                console.log(res.data.sale)
                this.cobrando_deuda = false
                this.debt = 0
                this.pagar_deuda = false
                this.$toast.success('Deuda cobrada')
                this.$bvModal.hide('sale-details')
                this.$store.commit('sales/updateSale', res.data.sale)
                this.$store.commit('sales/setSalesToShow')
            })
            .catch(err => {
                console.log(err)
            })
        },
	}
}
</script>