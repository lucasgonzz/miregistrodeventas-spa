<template>
<b-modal id="clients" title="Seleccione un cliente para esta venta">
    <b-container fluid>
        <b-row>
            <b-col>
                <b-card header="Seleccionar un cliente">
                    <div>
                        <autocomplete 
                        :search="search" 
                        auto-select
                        :get-result-value="getResultValue"
                        placeholder="Buscar un artículo"
                        @submit="setClient"></autocomplete>
                    </div>
                </b-card>
            </b-col>
        </b-row>
        <b-row v-if="client">
            <b-col
            cols="12">
                <b-card header="Cliente seleccionado">
                    <div>
                        <b-form-group>
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
                    </div>
                    <template v-slot:footer>
                        <b-button 
                        variant="primary"
                        :class="!client_selected ? 'disabled' : ''"
                        @click.prevent="vender">
                            <i v-show="!vendiendo" 
                                class="icon-check"></i>
                            <span v-show="vendiendo"
                                    class="spinner-border spinner-border-sm"></span>
                            Vender
                        </b-button>
                    </template>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card header="Registrar un cliente">
                    <div>
                        <b-form-group>
                            <b-form-input
                            @keyup.enter="saveClient"
                            placeholder="Nombre del nuevo cliente"
                            v-model="new_client.name"></b-form-input>
                        </b-form-group>
                        <b-form-group>
                            <b-button 
                            variant="primary"
                            @click="saveClient">
                                <span v-show="saving_client"
                                        class="spinner-border spinner-border-sm"></span>
                                <i v-show="!saving_client"
                                    class="icon-check"></i>
                                Guardar cliente
                            </b-button>
                        </b-form-group>
                    </div>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</b-modal>
</template>
<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'

export default {
    props: ['total', 'vendiendo'],
    components: {
        Autocomplete
    },
    data() {
        return {
            new_client: {
                name: '',
            },

            client: null,
            without_debt: true,
            debt: -1,

            saving_client: false,
        }
    },
    watch: {
        without_debt() {
            if (this.without_debt) {
                this.debt = -1
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
            this.client = client
        },
        getClients() {
            this.$api.get('clients')
            .then(res => {
                this.clients = res.data
            })
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
            })
            .catch(err => {
                this.saving_client = true
                this.$toast.error('Error al guardar el cliente')
                console.log(err)
            })
        },
        vender() {
            var error = false
            if (this.debt > 0) {
                if (this.debt > this.total) {
                    this.$toast.error(this.client.name+' no puede pagar mas de lo que sale la venta')
                    error = true
                    document.getElementById('parte_paga').focus()
                }
            }
            if (!error) {
                this.$emit('vender_a_cliente', this.client.id, this.debt)
                this.client.name = ''
                this.client_selected = false
                this.debt = 0
                this.possible_clients = []
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