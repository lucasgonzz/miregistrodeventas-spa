<template>
<b-modal id="update-password" title="Cambiar contraseña">
	<b-container>
		<b-row>
			<b-col>
				<b-form-group
				label="Contraseña actual"
				label-for="current-password">
					<b-form-input
					id="current-password"
					v-model="form.current_password"
					@keyup.enter="updatePassword"
					placeholder="Ingrese la contraseña actual"></b-form-input>
				</b-form-group>
				<b-form-group
				label="Nueva contraseña"
				label-for="new-password">
					<b-form-input
					id="new-password"
					v-model="form.new_password"
					@keyup.enter="updatePassword"
					placeholder="Ingrese la nueva contraseña"></b-form-input>
				</b-form-group>
			</b-col>
		</b-row>
	</b-container>
	<template v-slot:modal-footer>
		<b-button
		variant="primary"
		@click="updatePassword">
			<i class="icon-check" v-show="!updating_password"></i>
			<span class="spinner-border spinner-border-sm" v-show="updating_password"></span>
			Actualizar
		</b-button>
	</template>
</b-modal>
</template>
<script>
export default {
	data() {
		return {
			form: {
				current_password: '',
				new_password: '',
			},
			updating_password: false,
		}
	},
	methods: {
		updatePassword() {
			this.updating_password = true
			this.$api.put('user/password', this.form)
			.then(res => {
				this.updating_password = false
				if (res.data == 'ok') {
					this.$toast.success('Contraseña actualizada correctamente')
					this.form.current_password = ''
					this.form.new_password = ''
					this.$bvModal.hide('update-password')
				} else {
					this.$toast.error('La contraseña actual no es correcta')
				}
			})
			.catch(err => {
				this.updating_password = false
				console.log(err)
			})
		}
	}
}
</script>