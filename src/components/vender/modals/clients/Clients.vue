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
            <client-info
            v-if="client"
            :client="client"></client-info>
            <b-form-group
            v-show="client">
                <b-button 
                block
                variant="primary"
                @click.prevent="toDiscounts">
                    Siguiente
                </b-button>
                <!-- <b-button 
                v-else
                block
                variant="primary"
                @click.prevent="vender">
                    <i v-show="!vendiendo" 
                        class="icon-check"></i>
                    <span v-show="vendiendo"
                            class="spinner-border spinner-border-sm"></span>
                    Vender
                </b-button> -->
            </b-form-group>
            <b-form-group>
                <b-button 
                block
                variant="primary"
                v-b-modal="'create-client'">
                    <i class="icon-plus"></i>
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
import ClientInfo from '@/components/common/ClientInfo'
export default {
    components: {
        Autocomplete,
        ClientInfo,
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
            // this.$store.commit('vender/setDebt', this.debt)
            this.$store.commit('vender/clients/incrementView')
        },
        search(input) {
            if (input.length < 1) { return [] }
            return this.clients.filter(client => {
                return client.name.toLowerCase().includes(input.toLowerCase())
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
        },
        vender() {
            if (!this.is_provider) {
                this.$store.commit('vender/setDebt', this.debt)
                this.$store.dispatch('vender/vender', this.dolar_blue)
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