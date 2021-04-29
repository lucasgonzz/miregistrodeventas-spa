<template>
<b-modal id="update-deliver-amount" title="Actualizar precio de envio" hide-footer>
	<b-form-group
	label="Nombre"
	label-for="name">
		<b-form-input
		id="name"
		type="number"
		v-model="auth_user.deliver_amount"
		@keyup.enter="updateUser"></b-form-input>
	</b-form-group>
	<b-form-group>
		<b-button
		block
		variant="primary"
		@click="updateUser">
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
		BtnLoader
	},
	data() {
		return {
			loading: false
		}
	},
	methods: {
		updateUser() {
			this.loading = true
			this.$api.put('/user', this.auth_user)
			.then(res => {
				this.$toast.success('Precio de envio actualizado')
				this.$bvModal.hide('update-deliver-amount')
				this.loading = false
			})
			.catch(err => {
				this.$toast.error('Error al actualizar precio de envio')
				console.log(err)
				this.loading = false
			})
		}
	}
}
</script>