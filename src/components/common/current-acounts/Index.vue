<template>
<div>
    <confirm
    model_name="current_acount"
    :text="delete_text"
    :actions="actions"
    id="delete-current-acount"
    toast="Cuenta corriente eliminada"></confirm>
    <pago></pago>    
    <nota-credito></nota-credito>    
    <nota-debito></nota-debito>    
    <import></import>    
    <saldo-inicial></saldo-inicial>    
    <checks-details></checks-details>    
    <payment-methods-details></payment-methods-details>    

    <model 
    size="xl"
    show_btn_pdf
    model_name="budget">
        <template>
            <budget-modal-buttons></budget-modal-buttons>
        </template>
    </model>

    <model 
    size="xl"
    show_btn_pdf
    model_name="order_production">
        <template>
            <order-production-modal-buttons></order-production-modal-buttons>
        </template>
    </model>

    <print-budget></print-budget>

    <b-modal 
    id="current-acounts" 
    :title="title" 
    hide-footer 
    size="xl" 
    body-class="p-0">
        <current-acounts-nav></current-acounts-nav>
        <color-info></color-info>
        <list></list>
        <btn-pago-nota-credito></btn-pago-nota-credito>
    </b-modal>
</div>
</template>
<script>
import current_acounts from '@/mixins/current_acounts'
// Modals
import Confirm from '@/components/common/Confirm.vue' 
import Pago from '@/components/common/current-acounts/pago/Index'
import NotaCredito from '@/components/common/current-acounts/NotaCredito.vue'
import NotaDebito from '@/components/common/current-acounts/NotaDebito.vue'
import Import from '@/components/common/current-acounts/Import.vue'
import SaldoInicial from '@/components/common/current-acounts/SaldoInicial.vue'
import ChecksDetails from '@/components/common/current-acounts/ChecksDetails.vue'
import PaymentMethodsDetails from '@/components/common/current-acounts/payment-methods-details/Index'
import CreateBudget from '@/components/produccion/modals/budgets/Create'
import PrintBudget from '@/components/produccion/modals/budgets/Print'
import Model from '@/components/common/model/Index'

// Components
import BudgetModalButtons from '@/components/presupuestos/components/ModalButtons'
import OrderProductionModalButtons from '@/components/produccion/components/order-productions/ModalButtons'
import CurrentAcountsNav from '@/components/common/current-acounts/Nav'
import ColorInfo from '@/components/common/current-acounts/ColorInfo'
import List from '@/components/common/current-acounts/List'
import BtnPagoNotaCredito from '@/components/common/current-acounts/BtnPagoNotaCredito'
export default {
    name: 'CurrentAcountIndex',
    mixins: [current_acounts],
    components: {
        // Modals
        Confirm,
        Pago, 
        NotaCredito,
        NotaDebito,
        Import,
        SaldoInicial,
        ChecksDetails,
        PaymentMethodsDetails,
        CreateBudget,
        PrintBudget,
        Model,
        
        // Components
        BudgetModalButtons,
        OrderProductionModalButtons,
        CurrentAcountsNav,
        ColorInfo,
        List,
        BtnPagoNotaCredito,
    },
    computed: {
        title() {
            if (this.from_model) {
                return `Cuenta corriente de ${this.from_model.name}`
            }
            return ''
        },
        delete() {
            return this.$store.state.current_acount.delete
        },
        delete_text() {
            if (this.delete) {
                return 'este cuenta con saldo de $'+this.delete.saldo
            }
            return ''
        },
        actions() {
            return [
                'current_acount/delete',
                'current_acount/getModels',
            ]
        }
    },
}
</script>
<style lang="sass">
.detalle
    max-width: 100px
</style>
