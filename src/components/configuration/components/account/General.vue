<template>
	<b-card
	class="shadow-5 b-r-1"
	title="Cuenta">
		<b-form-group
		label="Nombre"
		label-for="name">
			<b-form-input
			id="name"
			v-model="user.name"
			@keyup.enter="updateUser"></b-form-input>
		</b-form-group>
		<b-form-group
		label="Nombre del comercio"
		label-for="company-name">
			<b-form-input
			id="company-name"
			v-model="user.company_name"
			@keyup.enter="updateUser"></b-form-input>
		</b-form-group>
		<b-form-group
		label="Telefono">
			<b-form-input
			v-model="user.phone"
			@keyup.enter="updateUser"></b-form-input>
		</b-form-group>
		<b-form-group
		label="Correo electronico">
			<b-form-input
			v-model="user.email"
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
	</b-card>
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
			this.$api.put('/user', this.user)
			.then(res => {
				console.log(res)
				if (res.data.repeated) {
					this.$toast.error('Ya hay un comercio registrado con ese nombre')
					// this.user.company_name = ''
				} else {
					this.$toast.success('Datos actualizados con exito')
					this.$bvModal.hide('update-user')
				}
				this.loading = false
			})
			.catch(err => {
				console.log(err)
				this.loading = false
			})
		}
	}
}
</script>