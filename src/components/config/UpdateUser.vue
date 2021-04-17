<template>
<b-modal id="update-user" title="Actualizar datos" hide-footer>
	<b-form-group
	label="Nombre"
	label-for="name">
		<b-form-input
		id="name"
		v-model="auth_user.name"
		@keyup.enter="updateUser"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Nombre del comercio"
	label-for="company-name">
		<b-form-input
		id="company-name"
		v-model="auth_user.company_name"
		@keyup.enter="updateUser"></b-form-input>
	</b-form-group>
	<b-form-group>
		<b-button
		block
		variant="primary"
		@click="updateUser">
			<btn-loader
			text="Actualizar" 
			:loader="updating_company_name"></btn-loader>
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
			updating_company_name: false
		}
	},
	methods: {
		updateUser() {
			this.updating_company_name = true
			this.$api.put('/user', this.auth_user)
			.then(res => {
				console.log(res)
				if (res.data.repeated) {
					this.$toast.error('Ya hay un comercio registrado con ese nombre')
					// this.auth_user.company_name = ''
				} else {
					this.$toast.success('Datos actualizados con exito')
					this.$bvModal.hide('update-user')
				}
				this.updating_company_name = false
			})
			.catch(err => {
				console.log(err)
				this.updating_company_name = false
			})
		}
	}
}
</script>