<template>
<b-modal id="address-details" hide-footer title="Detalles de la direccion">
	<b-form-group
	label="Piso/Departamento">
		<b-form-input
		v-model="address.depto" 
		placeholder="Ej: 8 A"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Observaciones">
		<b-form-textarea
		v-model="address.description"
		placeholder="Ej: El timbre no funciona"></b-form-textarea>
	</b-form-group>
	<b-button
	@click="saveAddress"
	variant="primary"
	block>
		<btn-loader
		text="Guardar direccion"
		:loader="loading"></btn-loader>
	</b-button>
</b-modal>
</template>
<script>
import BtnLoader from "@/components/common/BtnLoader"
export default {
	props: ['previus_route'],
	components: {
		BtnLoader,
	},
	data() {
		return {
			loading: false,
		}
	},
	computed: {
		address() {
			return this.$store.state.address.address
		},
	},
	methods: {
		saveAddress() {
			this.loading = true 
			this.$api.post('addresses', this.address)
			.then(res => {
				this.loading = false 
				this.$store.commit('auth/addAddress', res.data.address)
				this.$store.commit('address/setCity', '')
				this.$router.push({name: 'Configuration'})
			})
			.catch(err => {
				this.loading = false 
				console.log(err)
			})
		},
	}
}
</script>