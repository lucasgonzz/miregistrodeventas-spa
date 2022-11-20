<template>
	<b-card
	class="shadow b-r-1"
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
		<b-form-group
		label="Precio del dolar para calcular costos">
			<b-form-input
			class="m-t-10"
			type="number"
			placeholder="Ingrese el precio del dolar"
			v-model="user.dollar"></b-form-input>
		</b-form-group>
		<div
		class="cont-image">
			<img 
			class="shadow-1 b-r-1"
			v-if="user.hosting_image_url"
			:src="image(user)">
			<b-button
			@click="uploadImage('user', user, 'auth/setUser')"
			variant="primary">
				<i class="icon-camera"></i>
				<span
				v-if="user.hosting_image_url">
					Cambiar imagen
				</span>
				<span v-else>
					Agregar imagen
				</span>
			</b-button>
		</div>
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
<style lang="sass">
.cont-image 
	margin-bottom: 15px
	display: flex
	align-items: center
	img 
		width: 300px
		margin-right: 15px
</style>