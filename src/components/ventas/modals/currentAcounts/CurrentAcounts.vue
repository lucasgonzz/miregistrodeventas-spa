<template>
<b-modal id="current-acounts" :title="title" hide-footer size="lg" body-class="p-0">
    <b-card no-body>
        <div
        v-if="!loading && client">
            <div 
            v-if="client.current_acounts.length">
                <b-table
                :fields="fields"
                :items="items">
                    <template #cell(detalle)="data">
                        <strong
                        :class="getDetalleColorText(client.current_acounts[data.index])">
                            {{ client.current_acounts[data.index].detalle }}
                        </strong>
                    </template>
                    <!-- <template #cell(saldo)="data">
                        <span>
                            {{ price(client.current_acounts[data.index].saldo) }}
                        </span>
                        <p
                        v-if="client.current_acounts[data.index].description"
                        class="text-right m-b-0">
                            {{ client.current_acounts[data.index].description }}
                        </p>
                    </template> -->
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
            <div 
            v-else
            class="no-content">
                <i class="icon-not-2"></i>
                <p>No hay cuentas corrientes</p>
            </div>
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
export default {
    components: {
    },
    data() {
        return {
        }
    },
    computed: {
        client() {
            return this.$store.state.clients.client_current_acounts
        },
        loading() {
            return this.$store.state.clients.loading_current_acounts
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
                { key: 'description', label: '', class: 'text-center detalle' },
            ]
        }, 
        items() {
            let items = []
            if (this.client) {
                this.client.current_acounts.forEach(current_acount => {
                    items.push({
                        fecha: this.date(current_acount.created_at),
                        debe: this.price(current_acount.debe),
                        haber: this.price(current_acount.haber),
                        saldo: this.price(current_acount.saldo),
                        description: current_acount.description,
                    })
                })
            }
            return items
        }
    },
    methods: {
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
