<template>
<b-modal id="clients" title="Seleccione un cliente para esta venta" body-class="al-borde-md" hide-footer>
    <div>
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
                        <span class="p-l-10">
                            <span v-if="client.debt"
                                class="text-danger">
                                Debe {{ price(client.debt) }}
                            </span>
                            <span class="text-success" v-else>
                                <i class="icon-check"></i>
                                Sin deudas
                            </span>
                        </span>
                    </strong>
                    <b-form-checkbox
                    v-model="without_debt">
                        <strong>Paga los {{ price(total) }}</strong>
                    </b-form-checkbox>
                </b-form-group>
                <b-form-group
                v-show="!without_debt"
                :label="`¿Cuango paga de los ${ this.price(total) }?`"
                label-for="parte_paga">
                    <b-form-input
                    type="number"
                    min="0"
                    :max="total"
                    v-model="debt"
                    @keyup.enter="vender"></b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-button 
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
            </div>
        </b-card>
        <b-card header="Registrar un nuevo cliente" no-body>

            <b-form-group>
                <b-form-input
                @keyup.enter="saveClient"
                placeholder="Nombre del nuevo cliente"
                v-model="new_client.name"></b-form-input>
            </b-form-group>
            <b-form-group>
                <b-button 
                block
                variant="primary"
                @click="saveClient">
                    <span v-show="saving_client"
                            class="spinner-border spinner-border-sm"></span>
                    <i v-show="!saving_client"
                        class="icon-check"></i>
                    Guardar cliente
                </b-button>
            </b-form-group>
        </b-card>
    </div>
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
            new_client: {
                name: '',
            },

            without_debt: true,
            debt: null,

            saving_client: false,
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
        search(input) {
            if (input.length < 1) { return [] }
            return this.clients.filter(client => {
                return client.name.toLowerCase().startsWith(input.toLowerCase())
            })
        },
        getResultValue(client) {
            return client.name
        },
        setClient(client) {
            this.$store.commit('vender/setClient', client)
            // this.$emit('setClient', client)
        },
        saveClient() {
            this.saving_client = true
            this.$api.post('clients', {
                client: this.new_client
            })
            .then(() => {
                this.saving_client = false
                this.new_client.name = ''
                this.$toast.success('Cliente guardado correctamente')
                this.$store.dispatch('clients/getClients')
            })
            .catch(err => {
                this.saving_client = true
                this.$toast.error('Error al guardar el cliente')
                console.log(err)
            })
        },
        vender() {
            this.$store.commit('vender/setDebt', this.debt)
            this.$store.dispatch('vender/vender', this.debt)
            this.$store.commit('vender/setClient', null)
            this.$bvModal.hide('clients')
            if (this.isProvider()) {
                this.$bvModal.show('successful-sale')
            }
            this.without_debt = true
        },
    }
}
</script>
<style>
.client-name {
    font-size: 1rem;
}
</style>  