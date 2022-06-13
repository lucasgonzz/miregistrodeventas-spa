<template>
<b-modal
id="create-provider"
title="Nuevo proveedor"
hide-footer>
	<b-form-group
	label="Nombre del proveedor"
	label-for="provider-name">
		<b-form-input
		type="text"
		id="provider-name"
		v-model="provider.name"
		@keyup.enter="saveProvider"
		autocomplete="off"
		placeholder="Ingrese el nombre del proveedor"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Direccion del proveedor"
	label-for="provider-address">
		<b-form-input
		type="text"
		id="provider-address"
		v-model="provider.address"
		@keyup.enter="saveProvider"
		autocomplete="off"
		placeholder="Ingrese el nombre del proveedor"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Correo del proveedor"
	label-for="provider-email">
		<b-form-input
		type="text"
		id="provider-email"
		v-model="provider.email"
		@keyup.enter="saveProvider"
		autocomplete="off"
		placeholder="Ingrese el email del proveedor"></b-form-input>
	</b-form-group>
	<b-form-group>
		<b-button 
		variant="primary"
		block
		@click="saveProvider">
			<btn-loader
			:loader="saving_provider"
			text="Guardar Proveedor"
			></btn-loader>
		</b-button>
	</b-form-group>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	components: {
		BtnLoader,
	},
	data() {
		return {
			provider: {
				name: '',
				address: '',
				email: ''
			},
			saving_provider: false,
			deleting_provider: 0,
		}
	},
	methods: {
		saveProvider() {
			if (this.check()) {
				this.saving_provider = true
				this.$api.post('providers', this.provider)
				.then(res => {
					let provider = res.data.provider
					this.saving_provider = false
					this.$store.commit('providers/addProvider', provider)
					setTimeout(() => {
						this.$emit('setArticleProvider', provider)
					}, 1000)
					this.$bvModal.hide('create-provider')
					this.$toast.success('Proveedor guardo')
					this.clear()
				})
				.catch( err => {
					this.$toast.error('Error al guardad proveedor')
					this.saving_provider = false
					console.log(err)
				})
			}
		},
		clear() {
			this.provider = {
				name: '',
				address: '',
				email: ''
			}
		},
		check() {
			let ok = true
			if (this.provider.name == '') {
				ok = false
				this.$toast.error('Ingrese un nombre para el proveedor')
			} 
			// if (this.provider.address == '') {
			// 	ok = false
			// 	this.$toast.error('Ingrese una direccion para el proveedor')
			// } 
			return ok
		}
	}
}
</script>