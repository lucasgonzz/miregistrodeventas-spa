<template>
<b-modal id="clients" title="Clientes" hide-footer scrollable>
    <b-container fluid class="m-0">
        <b-row class="m-b-15">
            <b-col>
                <autocomplete 
                :search="search" 
                auto-select
                :get-result-value="getResultValue"
                placeholder="Buscar un cliente..."
                @submit="setClient"></autocomplete>
            </b-col>
        </b-row>
        <cargando :is_loading="loading_clients" size="md"></cargando>
        <b-row v-show="!loading_clients">
            <b-col>
                <b-card header="Lista de clientes">
                    <template v-slot:header>
                        Lista de clientes
                        <b-button
                        v-show="client_searched"
                        variant="primary"
                        @click="backClients">
                            <i class="icon-undo"></i>
                        </b-button>
                    </template>
                    <b-list-group>
                        <b-list-group-item
                        v-for="(client, index) in clients"
                        :key="'a'+client.id">
                            <b-form-group
                            label="Nombre"
                            :label-for="`client-name-${client.id}-${index}`">
                                <b-form-input
                                :id="`client-name-${client.id}-${index}`"
                                v-model="client.name"></b-form-input>
                            </b-form-group>
                            <b-button 
                            variant="primary"
                            size="sm"
                            class="float-right"
                            @click="salesFromClient(client)">
                                Ventas
                            </b-button>
                            <b-button
                            variant="success"
                            size="sm"
                            class="float-right m-r-5"
                            @click="updateClient(client)">
                                <i class="icon-undo" v-show="updating_client != client.id"></i>
                                <span class="spinner-border spinner-border-sm" v-show="updating_client == client.id"></span>
                                Actualizar nombre
                            </b-button>
                        </b-list-group-item>                        
                    </b-list-group>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</b-modal>
</template>
<script>
import Cargando from '../../common/Cargando'
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'

export default {
    components: {
        Cargando,
        Autocomplete
    },
    data() {
        return {
            loading_clients: false,
            clients: [],
            client_name_search: '',
            searching_possible_clients: false,
            updating_client: 0,
            without_clients: false,
            client_searched: false
        }
    },
    computed: {
        clients_() {
            return this.$store.state.clients.clients
        }
    },
    watch: {
        clients_() {
            this.clients = this.clients_
        }
    },
    created() {
        this.clients = this.clients_
    },
    methods: {
        backClients() {
            this.client_searched = false
            this.$store.dispatch('clients/getClients')
        },
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
            this.client_searched = true
            this.clients = []
            this.clients.push(client)
        },
        updateClient(client) {
            this.updating_client = client.id
            this.$api.put('clients/'+client.id, {
                client: client
            })
            .then(() => {
                this.updating_client = 0
                this.$toast.success('Nombre del cliente actualizado correctamente')
            })
            .catch(err => {
                console.log(err)
            })
        },
        salesFromClient(client) {
            this.$emit('salesFromClient', client)
            this.$bvModal.hide('clients')
        },
        setPossibleClients() {
            if (this.client_name_search.length > 1) {
                this.searching_possible_clients = true
                this.$api.get('clients/search/'+this.client_name_search)
                .then(res => {
                    this.searching_possible_clients = false
                    if (res.data.length) {
                        this.without_clients = false
                        this.$emit('setClients', res.data)
                    } else {
                        this.without_clients = true
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            } else {
                this.$emit('getClients')
            }
        },
        selectPossibleClient(client) {
            this.is_loading = true
            this.possible_clients = []
            this.$api.get('sales/client/'+client.id)
            .then(res => {
                this.client_name_search = ''
                this.client = client
                this.is_loading = false
                this.sales_from_client = true
                this.sales = res.data
            })
            .catch(err => {
                console.log(err)
            })
        },
    }
}
</script>
<style scoped>
</style>
