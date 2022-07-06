<template>
<b-modal
id="provider"
:title="title"
hide-footer>
	<p
	v-if="model.num">
		Proveedor N° {{ model.num }}
	</p>
	<b-form-group
	label="Nombre">
		<b-form-input
		type="text"
		v-model="model.name"
		@keyup.enter="saveProvider"
		autocomplete="off"
		placeholder="Ingrese el nombre del proveedor"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Teléfono">
		<b-form-input
		type="text"
		v-model="model.phone"
		@keyup.enter="saveProvider"
		autocomplete="off"
		placeholder="Ingrese el teléfono del proveedor"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Direccion">
		<b-form-input
		type="text"
		v-model="model.address"
		@keyup.enter="saveProvider"
		autocomplete="off"
		placeholder="Ingrese el nombre del proveedor"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Correo">
		<b-form-input
		type="text"
		v-model="model.email"
		@keyup.enter="saveProvider"
		autocomplete="off"
		placeholder="Ingrese el email del proveedor"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Razon social">
		<b-form-input
		type="text"
		v-model="model.razon_social"
		@keyup.enter="saveProvider"
		autocomplete="off"
		placeholder="Ingrese la razon social del proveedor"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Cuit">
		<b-form-input
		type="text"
		v-model="model.cuit"
		@keyup.enter="saveProvider"
		autocomplete="off"
		placeholder="Ingrese el cuit del proveedor"></b-form-input>
	</b-form-group>
    <b-form-group
    label="Condicion frente al IVA">
        <b-form-select
        :options="iva_condition_options"
        v-model="model.iva_condition_id"></b-form-select>
    </b-form-group>
    <b-form-group
    label="Localidad">
        <b-form-select
        :options="locations_options"
        v-model="model.location_id"></b-form-select>
    </b-form-group>
	<b-form-group
	label="Observaciones">
		<b-form-textarea
		type="text"
		v-model="model.observations"
		autocomplete="off"
		placeholder="Ingrese observaciones del proveedor"></b-form-textarea>
	</b-form-group>
	<b-form-group>
		<b-button 
		variant="primary"
		block
		@click="saveProvider">
			<btn-loader
			:loader="loading"
			text="Guardar Proveedor"
			></btn-loader>
		</b-button>
	</b-form-group>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'

import iva_conditions from '@/mixins/iva_conditions'
import locations from '@/mixins/locations'
export default {
	mixins: [iva_conditions, locations],
	components: {
		BtnLoader,
	},
	data() {
		return {
			loading: false,
		}
	},
	computed: {
		model() {
			return this.$store.state.providers.model
		},
		title() {
			if (this.model.id) {
				return 'Actualizar proveedor'
			}
			return 'Nuevo proveedor'
		},
	},
	methods: {
		saveProvider() {
			if (this.check() && !this.loading) {
				this.loading = true
				if (this.model.id) {
					this.$api.put('providers/'+this.model.id, this.model)
					.then(res => {
						let provider = res.data.provider
						this.loading = false
						this.$store.commit('providers/update', provider)
						setTimeout(() => {
							this.$emit('setArticleProvider', provider)
						}, 1000)
						this.$bvModal.hide('provider')
						this.$toast.success('Proveedor actualizado')
					})
					.catch( err => {
						this.$toast.error('Error al guardad proveedor')
						this.loading = false
						console.log(err)
					})

				} else {
					this.$api.post('providers', this.model)
					.then(res => {
						let provider = res.data.provider
						this.loading = false
						this.$store.commit('providers/addProvider', provider)
						setTimeout(() => {
							this.$emit('setArticleProvider', provider)
						}, 1000)
						this.$bvModal.hide('provider')
						this.$toast.success('Proveedor guardado')
					})
					.catch( err => {
						this.$toast.error('Error al guardad proveedor')
						this.loading = false
						console.log(err)
					})
				}
			}
		},
		check() {
			if (this.model.name == '') {
				this.$toast.error('Ingrese un nombre para el proveedor')
				return false
			} 
			return true 
		}
	}
}
</script>