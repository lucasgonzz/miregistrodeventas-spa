<template>
<b-modal id="clients" title="Clientes" hide-footer scrollable>
    <b-card no-body>
        <div>
            <b-form-group>
                <autocomplete 
                :search="search" 
                auto-select
                :get-result-value="getResultValue"
                placeholder="Buscar un cliente..."
                @submit="setClient"></autocomplete>
            </b-form-group>
            <b-form-group>
                <b-list-group>
                    <b-list-group-item
                    v-for="(client, index) in clients_to_show"
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
                            <i class="icon-eye"></i>
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
            </b-form-group>
            <b-form-group
            v-show="clients_to_show.length < clients.length">
                <b-button
                variant="primary"
                block
                @click="addClients">
                    Cargar mas
                </b-button>                  
            </b-form-group>
        </div>
    </b-card>
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
            updating_client: 0,
        }
    },
    computed: {
        clients() {
            return this.$store.state.clients.clients
        },
        clients_to_show() {
            return this.$store.state.clients.clients_to_show
        },
    },
    methods: {
        addClients() {
            this.$store.commit('clients/addClientsToShow')
        },
        search(input) {
            if (input.length < 1) { 
                this.$store.commit('clients/setClientsToShow', [])
                this.$store.commit('clients/addClientsToShow')
                return [] 
            }
            let clients = this.clients.filter(cli => {
                return cli.name.toLowerCase().includes(input.toLowerCase())
            })
            this.$store.commit('clients/setClientsToShow', clients)
            return []
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
            console.log(client)
            this.$store.commit('sales/days_previus_sales/setDaySelected', null)
            this.$store.commit('sales/setSelectedClient', client)
            this.$store.commit('sales/setLoading', true)
            this.$api.get('/sales/client/'+client.id)
            .then(res => {
                console.log(res)
                this.$store.commit('sales/setLoading', false)
                this.$store.commit('sales/setSalesToShow', res.data.sales)
            })
            .catch(err => {
                this.$store.commit('sales/setLoading', false)
                this.$toast.error('Error al buscar las ventas de '+client.name+', recargue la página e intente denuevo, por favor')
                console.log(err)
            })
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
<style lang="sass">
</style>
