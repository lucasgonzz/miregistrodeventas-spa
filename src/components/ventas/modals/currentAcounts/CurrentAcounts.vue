<template>
<b-modal id="current-acounts" :title="title" hide-footer size="lg" body-class="p-0">
    <b-card no-body>
        <current-acounts-nav></current-acounts-nav>
        <div
        v-if="!loading && client">
            <div 
            v-if="current_acounts.length">
                <b-table
                :fields="fields"
                :items="items"
                selectable 
                select-mode="multi"
                @row-selected="onRowSelected">
                    <template #cell(detalle)="data">
                        <strong
                        :class="getDetalleColorText(current_acounts[data.index])">
                            {{ current_acounts[data.index].detalle }}
                        </strong>
                    </template>
                    <template #cell(debe)="data">
                        <b-button
                        v-if="showButtonDebe(current_acounts[data.index])"
                        @click="updateDebe(current_acounts[data.index])"
                        variant="info">
                            {{ price(current_acounts[data.index].debe) }}
                        </b-button>
                        <span
                        v-else>
                            {{ price(current_acounts[data.index].debe) }}      
                        </span>
                    </template>
                    <template #cell(description)="data">
                        {{ current_acounts[data.index].description }}
                    </template>
                    <template #cell(options)="data">
                        <b-button
                        size="sm"
                        @click="deleteCurrentAcount(current_acounts[data.index])"
                        variant="danger">
                            <i class="icon-trash"></i>
                        </b-button>
                    </template>
                </b-table>
                <b-form-group
                class="m-b-10 j-end p-r-10">
                    <b-button
                    v-b-modal="'current-acounts-nota-credito'"
                    variant="danger">
                        Nota de credito
                    </b-button>
                    <b-button
                    class="m-l-10"
                    v-b-modal="'current-acounts-pago'"
                    variant="primary">
                        Registrar pago
                    </b-button>
                </b-form-group>
            </div>
            <p 
            v-else
            class="text-with-icon">
                <i class="icon-not"></i>
                No hay cuentas corrientes
            </p>
        </div>
        <b-skeleton-table
        v-else
        :hide-header="false"
        :rows="10"
        :columns="5"
        :table-props="{ bordered: true, striped: true }"
        ></b-skeleton-table>
    </b-card>
</b-modal>
</template>
<script>
import CurrentAcountsNav from '@/components/ventas/modals/currentAcounts/Nav'
export default {
    components: {
        CurrentAcountsNav
    },
    data() {
        return {
        }
    },
    computed: {
        client() {
            return this.$store.state.clients.current_acounts.client
        },
        current_acounts() {
            return this.$store.state.clients.current_acounts.current_acounts
        },
        loading() {
            return this.$store.state.clients.current_acounts.loading
        },
        title() {
            if (this.client) {
                return `Cuenta corriente de ${this.client.name}`
            }
            return ''
        },
        fields() {
            return [
                { key: 'fecha', class: 'text-center' },
                { key: 'detalle', class: 'text-center detalle' },
                { key: 'debe', class: 'text-center' },
                { key: 'haber', class: 'text-center' },
                { key: 'saldo', class: 'text-center' },
                { key: 'description', label: 'Observaciones', class: 'text-center detalle' },
                { key: 'options', label: 'Eliminar', class: 'text-center detalle' },
            ]
        }, 
        items() {
            let items = []
            this.current_acounts.forEach(current_acount => {
                items.push({
                    id:             current_acount.id,
                    fecha:          this.date(current_acount.created_at),
                    debe:           this.price(current_acount.debe),
                    haber:          this.price(current_acount.haber),
                    saldo:          this.price(current_acount.saldo),
                    description:    current_acount.description,
                })
            })
            return items
        }
    },
    methods: {
        onRowSelected(items) {
            this.$store.commit('clients/current_acounts/setSelected', items)
            console.log(items)
        },
        deleteCurrentAcount(current_acount) {
            this.$store.commit('clients/current_acounts/setDelete', current_acount)
            this.$bvModal.show('delete-current-acount')
        },
        showButtonDebe(current_acount) {
            return current_acount.status != 'pago_from_client' && current_acount.status != 'nota_credito'
        },
        updateDebe(current_acount) {
            this.$store.commit('clients/current_acounts/setUpdateDebe', current_acount)
            this.$bvModal.show('update-debe')
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
<style lang="sass">
.detalle
    max-width: 100px
</style>
