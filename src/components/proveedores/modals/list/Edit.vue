<template>
<b-modal id="edit-provider" title="Editar Condicion" hide-footer>
	<b-form-group
	label="Nombre">
		<b-form-input
		v-model="provider.name"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Direccion">
		<b-form-input
		v-model="provider.address"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Email">
		<b-form-input
		v-model="provider.email"></b-form-input>
	</b-form-group>
	<b-form-group>
		<b-button
		block
		@click="update"
		variant="primary">
			<btn-loader
			text="Actualizar"
			:loader="loading"></btn-loader>
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
			loading: false
		}
	},
	computed: {
		provider() {
			return this.$store.state.providers.edit
		}
	},
	methods: {
		update() {
			this.loading = true
			this.$api.put('/providers', this.provider)
			.then(res => {
				this.loading = false
				this.$store.commit('providers/update', res.data.provider)
				this.$toast.success('Proveedor actualizada')
				this.$bvModal.hide('edit-provider')
			})
			.catch(err => {
				this.loading = false
				this.$toast.error('Error al actualizar proveedor')
				console.log(err)
			})
		}
	}
}
</script>