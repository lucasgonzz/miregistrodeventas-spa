<template>
<div
class="p-l-20 p-r-20">
    <table-component
    :loading="loading"
    :models="models"
    :properties="properties"
    :model_name="model_name"
    model_name_spanish="cuentas corrientes"
    :set_model_on_click="false"
    :show_btn_edit="false"
    @showDetails="showDetails">
        <template v-slot:default="slotProps">
            <b-button
            class="m-r-15"
            v-if="slotProps.model.payment_method && slotProps.model.payment_method.name == 'Cheque'"
            size="sm"
            variant="primary"
            @click="showChecks(slotProps.model)"> 
                <div class="d-flex"> 
                    <i class="icon-eye m-r-5"></i>
                    Checke
                </div>
            </b-button>
            <b-button
            size="sm"
            v-if="canDelete(slotProps.model)"
            @click="deleteCurrentAcount(slotProps.model)"
            variant="danger">
                <i class="icon-trash"></i>
            </b-button>
        </template>  
    </table-component>  
</div>
</template>
<script>
import TableComponent from '@/components/common/display/TableComponent'

import current_acounts from '@/mixins/current_acounts' 
import budgets from '@/mixins/budgets' 
import display from '@/mixins/display' 
export default {
    mixins: [current_acounts, budgets, display],
    components: {
        TableComponent,
    },
    computed: {
        model_name() {
            return 'current_acount'
        },
        model_name_spanish() {
            return 'cuentas corrientes'
        },
        loading() {
            return this.$store.state[this.model_name].loading
        },
        to_show() {
            return this.$store.state[this.model_name].to_show
        },
        models() {
            return this.$store.state[this.model_name].models
        },
        properties() {
            return require(`@/models/${this.model_name}`).default.properties 
        },
        fields() {
            return [
                { key: 'fecha', class: 'text-center' },
                { key: 'detalle', class: 'text-center detalle' },
                { key: 'numero', class: 'text-center' },
                { key: 'debe', class: 'text-center' },
                { key: 'haber', class: 'text-center' },
                { key: 'saldo', class: 'text-center' },
                { key: 'metodo', class: 'text-center' },
                { key: 'description', label: 'Observaciones', class: 'text-center detalle' },
                { key: 'options', label: '', class: 'text-center detalle' },
            ]
        }, 
        items() {
            let items = []
            this.current_acounts.forEach(current_acount => {
                items.push({
                    id:             current_acount.id,
                    fecha:          this.date(current_acount.created_at, true), 
                    debe:           this.price(current_acount.debe),
                    haber:          this.price(current_acount.haber),
                    saldo:          this.price(current_acount.saldo),
                    description:    current_acount.description,
                    status:         current_acount.status,
                })
            })
            return items
        }
    },
    methods: {
        showChecks(current_acount) {
            this.$store.commit('current_acount/setToShowChecks', current_acount)
            this.$bvModal.show('checks-details')
        },
        canDelete(current_acount) {
            return current_acount.status == 'pago_from_client' || current_acount.status == 'nota_credito'
            return (current_acount.status == 'pago_from_client' || current_acount.status == 'nota_credito' || current_acount.detalle == 'Saldo inicial') && current_acount.id == this.current_acounts[this.current_acounts.length - 1].id
        },
        deleteCurrentAcount(current_acount) {
            this.$store.commit('current_acount/setDelete', current_acount)
            this.$bvModal.show('delete-current-acount')
        },
        showButtonDebe(current_acount) {
            return current_acount.status != 'pago_from_client' && current_acount.status != 'nota_credito'
        },
        updateDebe(current_acount) {
            this.$store.commit('clients/current_acounts/setUpdateDebe', current_acount)
            this.$bvModal.show('update-debe')
        },
        showDetails(current_acount) {
            if (current_acount.sale) {
                this.$store.commit('sale/setDetails', current_acount.sale)
                setTimeout(() => {
                    this.$bvModal.show('sale-details')
                }, 100)
            } else if (current_acount.budget) {
                this.setModel(current_acount.budget, 'budget')
            } else if (current_acount.provider_order) {
                this.setModel(current_acount.provider_order, 'provider_order')
            }
        },
        getDetalleColorText(current_acount) {
            if (current_acount.status == 'pagandose') {
                return 'text-success'
            }
            if (current_acount.status == 'pagado') {
                return 'text-info'
            }
            if (current_acount.status.includes('nota_credito') || current_acount.status == 'pago') {
                return 'text-danger'
            }
        }
    }
}
</script>