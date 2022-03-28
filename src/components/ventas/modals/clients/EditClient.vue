<template>
<b-modal id="edit-client" :title="title" hide-footer>
	<b-form-group
	label="Nombre del cliente">
		<b-form-input
		placeholder="Ingresar nombre"
		v-model="client.name"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Apellido del cliente">
		<b-form-input
		placeholder="Ingresar apellido"
		v-model="client.surname"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Direccion del cliente">
		<b-form-input
		placeholder="Ingresar direccion"
		v-model="client.address"></b-form-input>
	</b-form-group>
    <b-form-group
    label="Condicion frente al IVA">
        <b-form-select
        :options="options"
        v-model="client.iva_id"></b-form-select>
    </b-form-group>
	<b-form-group
	label="CUIT del cliente">
		<b-form-input
		placeholder="Ingresar CUIT sin guiones"
		v-model="client.cuit"></b-form-input>
	</b-form-group>
    <b-form-group
    label="Vendedor">
        <b-form-select
        :options="seller_options"
        v-model="client.seller_id"></b-form-select>
    </b-form-group>
    <b-form-group>
    	<b-button
    	block
    	variant="primary"
    	@click="updateClient">
    		<btn-loader
    		text="Actualizar"
    		:loader="updating"></btn-loader>
    	</b-button>
    </b-form-group>
</b-modal>
</template>
<script>
import mixin from '@/mixins/clients'
import BtnLoader from '@/components/common/BtnLoader'
export default {
	name: 'EditClient',
	components: {
		BtnLoader,
	},
	data() {
		return {
			updating: false,
		}
	},
	mixins: [mixin],
	computed: {
		title() {
			return 'Editar cliente '+this.client.name
		},
		client() {
			return this.$store.state.clients.client_to_edit
		}
	},
	methods: {
		updateClient() {
			this.updating = true
			this.$api.put('/clients', {
				client: this.client
			})
			.then(res => {
				this.updating = false
				this.$store.commit('clients/update', res.data.client)
				this.$toast.success('Cliente actualizado')
				this.$bvModal.hide('edit-client')
			})
			.catch(err => {
				console.log(err)
				this.updating = false
			})
		}
	}
}
</script>