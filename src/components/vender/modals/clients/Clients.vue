<template>
    <b-card header="Seleccionar un cliente existente" no-body>
        <div>
            <b-form-group>
                <autocomplete 
                :search="search" 
                auto-select
                :get-result-value="getResultValue"
                placeholder="Buscar un cliente..."
                @submit="setClient"></autocomplete>
            </b-form-group>
            <b-form-group 
            v-if="client">
                <strong class="client-name">
                    Cliente seleccionado: {{ client.name }}
                    <!-- <span class="p-l-10">
                        <span v-if="client.debt"
                            class="text-danger">
                            Debe {{ price(client.debt) }}
                        </span>
                        <span class="text-success" v-else>
                            <i class="icon-check"></i>
                            Sin deudas
                        </span>
                    </span> -->
                </strong>
                <!-- <b-form-checkbox
                v-model="without_debt">
                    <strong>Paga los {{ price(total) }}</strong>
                </b-form-checkbox> -->
            </b-form-group>
            <!-- <b-form-group
            v-show="!without_debt"
            :label="`¿Cuango paga de los ${ this.price(total) }?`"
            label-for="parte_paga">
                <b-form-input
                type="number"
                min="0"
                :max="total"
                v-model="debt"
                @keyup.enter="vender"></b-form-input>
            </b-form-group> -->
            <b-form-group>
                <b-button 
                v-if="isProvider()"
                block
                variant="primary"
                @click.prevent="toDiscounts">
                    Siguiente
                </b-button>
                <b-button 
                v-else
                block
                variant="primary"
                @click.prevent="vender">
                    <i v-show="!vendiendo" 
                        class="icon-check"></i>
                    <span v-show="vendiendo"
                            class="spinner-border spinner-border-sm"></span>
                    Vender
                </b-button>
            </b-form-group>
            <b-form-group>
                <b-button 
                block
                variant="primary"
                v-b-modal="'create-client'">
                    Nuevo Cliente
                </b-button>
            </b-form-group>
        </div>
    </b-card>
</b-modal>
</template>
<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'

export default {
    components: {
        Autocomplete
    },
    data() {
        return {
            without_debt: true,
            debt: null,
        }
    },
    computed: {
        clients() {
            return this.$store.state.clients.clients
        },
        client() {
            return this.$store.state.vender.client
        },
        total() {
            return this.$store.state.vender.total
        },
        vendiendo() {
            return this.$store.state.vender.vendiendo
        },
    },
    watch: {
        without_debt() {
            if (this.without_debt) {
                this.debt = null
            } else {
                this.debt = 0
            }
        }
    },
    methods: {
        toDiscounts() {
            this.$store.commit('vender/setDebt', this.debt)
            this.$store.commit('vender/clients/incrementView')
        },
        search(input) {
            if (input.length < 1) { return [] }
            return this.clients.filter(client => {
                return client.name.toLowerCase().startsWith(input.toLowerCase())
            })
        },
        getResultValue(client) {
            let res = client.name
            if (client.surname) {
                res += ' ' + client.surname
            }
            return res
        },
        setClient(client) {
            this.$store.commit('vender/setClient', client)
            // this.$emit('setClient', client)
        },
        vender() {
            if (!this.isProvider()) {
                this.$store.commit('vender/setDebt', this.debt)
                this.$store.dispatch('vender/vender')
                this.$store.commit('vender/setClient', null)
                this.$bvModal.hide('clients')
                this.without_debt = true
            }
        },
    }
}
</script>
<style>
.client-name {
    font-size: 1rem;
}
</style>  