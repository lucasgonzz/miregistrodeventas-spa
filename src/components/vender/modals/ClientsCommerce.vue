<template>

<!-- Modal -->
<div class="modal fade" id="clients-commerce" tabindex="-1" role="dialog" aria-labelledby="ventas-resumens" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Seleccione un cliente para esta venta (opcional)</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">

                <div class="card m-b-10">
                    <div class="card-header">
                        <strong>
                            Seleccione el cliente
                        </strong>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <div class="input-group">
                                    <input type="search" 
                                            class="form-control"
                                            placeholder="Busca un cliente por su nombre" 
                                            @keyup="setPossibleClients"
                                            v-model="client_name_search">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text">
                                            <span v-show="searchin_possible_clients"
                                                    class="spinner-border spinner-border-sm"></span>
                                            <i v-show="!searchin_possible_clients"
                                                class="icon-search"></i>
                                        </div>
                                    </div>
                                </div>
                                <ul class="list-group">
                                    <li class="list-group-item c-p"
                                        v-for="client in possible_clients"
                                        @click="selectPossibleClient(client)">
                                        <i class="icon-search p-r-5"></i>
                                        <strong>
                                            {{ client.name }}
                                        </strong>
                                        <span class="float-right">
                                            <span class="text-danger" 
                                                    v-show="client.debt > 0">
                                                -{{ price(client.debt) }}
                                            </span>
                                            <span v-show="client.debt == 0">
                                                Sin deudas
                                            </span>
                                        </span>       
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="row m-t-10" v-show="client_selected">
                            <div class="col-12">
                                <div class="form-group">
                                    <strong class="client-name">
                                        Cliente seleccionado: {{ client.name }}
                                    </strong>
                                    <div class="custom-control custom-checkbox my-1 mr-sm-2 c-p">
                                        <input class="custom-control-input c-p" 
                                                v-model="without_debt" 
                                                type="checkbox" 
                                                id="without_debt">
                                        <label class="custom-control-label c-p" 
                                                for="without_debt">
                                                <strong>Paga los $ {{ total }}</strong>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12" v-show="!without_debt">
                                <div class="form-group">
                                    <label for="parte_paga">¿Cuango paga de los {{ price(total) }}?</label>
                                    <input type="number"
                                            id=parte_paga
                                            min="0"
                                            :max="total"
                                            v-model="debt"
                                            class="form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-primary"
                                @click="vender">
                            <span v-show="vendiendo"
                                    class="spinner-border spinner-border-sm"></span>
                            Vender
                        </button>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <strong>
                            Registrar un cliente
                        </strong>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <input type="text" 
                                    @keyup.enter="saveClient"
                                    class="form-control"
                                    placeholder="Nombre del nuevo cliente"
                                    v-model="new_client.name">
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary"
                                    @click="saveClient">
                                <span v-show="saving_client"
                                        class="spinner-border spinner-border-sm m-r-5" role="status" aria-hidden="true"></span>
                                Guardar cliente
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                <!-- <button @click="run" class="btn btn-primary">Listo, ya lo registre</button> -->
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    props: ['total'],
    data() {
        return {
            new_client: {
                name: '',
            },

            client: {},
            client_selected: false,
            searchin_possible_clients: false,
            without_debt: true,
            debt: 0,

            possible_clients: [],
            client_name_search: '',
            saving_client: false,
            vendiendo: false,
        }
    },
    methods: {
        price(p) {
            console.log('salio: '+numeral(p).format('$0,0.00'))
            return numeral(p).format('$0,0.00')
        },
        setPossibleClients() {
            if (this.client_name_search.length > 1) {
                this.searchin_possible_clients = true
                axios.get('clients/search/'+this.client_name_search)
                .then(res => {
                    this.searchin_possible_clients = false
                    if (res.data.length) {
                        this.possible_clients = res.data
                    } else {
                        this.possible_clients = []
                        toastr.error('No se encontraron clientes')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            } else {
                this.possible_clients = []
            }
        },
        selectPossibleClient(client) {
            this.client_name_search = ''
            this.possible_clients = []
            this.client = client
            this.client_selected = true
        },
        getClients() {
            axios.get('clients')
            .then(res => {
                this.clients = res.data
            })
        },
        saveClient() {
            this.saving_client = true
            axios.post('clients', {
                client: this.new_client
            })
            .then(res => {
                this.saving_client = false
                this.new_client.name = ''
                toastr.success('Cliente guardado correctamente')
            })
            .catch(err => {
                this.saving_client = true
                toastr.error('Error al guardar el cliente')
                console.log(err)
            })
        },
        vender() {
            var error = false
            if (this.debt > 0) {
                if (this.debt > this.total) {
                    toastr.error(this.client.name+' no puede pagar mas de lo que sale la venta')
                    error = true
                    $('#parte_paga').focus()
                }
            }
            if (!error) {
                this.$emit('vender_a_cliente', this.client.id, this.debt)
                this.client.name = ''
                this.client_selected = false
                this.debt = 0
                this.possible_clients = []
                this.without_debt = true
                $('#clients-commerce').modal('hide')
            }
        },
        // clientRegister() {
        //     axios.get('clients/is-register/'+this.new_client.name)
        //     .then(res => {
        //         if (res.data.repetido) {
        //             return true
        //         } else {
        //             return false
        //         }
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
        // },
    }
}
</script>
<style>
.client-name {
    font-size: 1rem;
}
</style>  