<template>
<b-modal id="create-client" title="Registrar un nuevo cliente" hide-footer>
	<b-card no-body>
        <b-form-group>
            <b-form-input
            @keyup.enter="saveClient"
            placeholder="Nombre del nuevo cliente"
            v-model="new_client.name"></b-form-input>
        </b-form-group>
        <b-form-group>
            <b-form-input
            @keyup.enter="saveClient"
            placeholder="Apellido del nuevo cliente"
            v-model="new_client.surname"></b-form-input>
        </b-form-group>
        <b-form-group>
            <b-form-input
            @keyup.enter="saveClient"
            placeholder="Direccion del nuevo cliente"
            v-model="new_client.address"></b-form-input>
        </b-form-group>
        <b-form-group
        v-if="isProvider()"
        label="Vendedor">
            <b-form-select
            :options="seller_options"
            v-model="new_client.seller_id"></b-form-select>
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
</b-modal>
</template>
<script>
import mixin from '@/mixins/clients'
export default {
	name: 'CreateClient',
    mixins: [mixin],
	data() {
		return {
            new_client: {
                name: '',
                surname: '',
                address: '',
                seller_id: 0,
            },
            saving_client: false,
		}
	},
	methods: {
        saveClient() {
            this.saving_client = true
            this.$api.post('clients', {
                client: this.new_client
            })
            .then(() => {
                this.$store.dispatch('clients/getClients')
                .then(() => {
                    this.saving_client = false
                    this.$toast.success('Cliente guardado correctamente')
                    this.$bvModal.hide('create-client')
                    this.clear()
                })
            })
            .catch(err => {
                this.saving_client = true
                this.$toast.error('Error al guardar el cliente')
                console.log(err)
            })
        },
        clear() {
            this.new_client.name = ''
            this.new_client.surname = ''
            this.new_client.address = ''
            this.new_client.seller_id = 0
        }
	}
}
</script>