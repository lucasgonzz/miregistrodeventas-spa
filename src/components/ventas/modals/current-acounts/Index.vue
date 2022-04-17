<template>
<div>
    <confirm
    :text="text_delete"
    :actions="actions"
    id="delete-current-acount"
    toast="Cuenta corriente eliminada"></confirm>
    <pago></pago>    
    <nota-credito></nota-credito>    
    <import></import>    
    <saldo-inicial></saldo-inicial>    
    <b-modal id="current-acounts" :title="title" hide-footer size="lg" body-class="p-0">
        <current-acounts-nav></current-acounts-nav>
        <color-info></color-info>
        <list></list>
    </b-modal>
</div>
</template>
<script>
import current_acounts from '@/mixins/current_acounts'
// Modals
import Confirm from '@/components/common/Confirm.vue'
import Pago from '@/components/ventas/modals/current-acounts/Pago.vue'
import NotaCredito from '@/components/ventas/modals/current-acounts/NotaCredito.vue'
import Import from '@/components/ventas/modals/current-acounts/Import.vue'
import SaldoInicial from '@/components/ventas/modals/current-acounts/SaldoInicial.vue'
// Components
import CurrentAcountsNav from '@/components/ventas/modals/current-acounts/Nav'
import ColorInfo from '@/components/ventas/modals/current-acounts/ColorInfo'
import List from '@/components/ventas/modals/current-acounts/List'
export default {
    mixins: [current_acounts],
    components: {
        // Modals
        Confirm,
        Pago, 
        NotaCredito,
        Import,
        SaldoInicial,
        // Components
        CurrentAcountsNav,
        ColorInfo,
        List,
    },
    computed: {
        title() {
            if (this.client) {
                return `Cuenta corriente de ${this.client.name}`
            }
            return ''
        },
        text_delete() {
            return '¿Seguro que quiere eliminar la cuenta corriente?'
        },
        actions() {
            return [
                'clients/current_acounts/delete',
                'clients/current_acounts/getCurrentAcounts',
                'clients/current_acounts/updateClient',
            ]
        }
    },
}
</script>
<style lang="sass">
.detalle
    max-width: 100px
</style>
