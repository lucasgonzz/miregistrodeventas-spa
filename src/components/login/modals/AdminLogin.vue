<template>
<b-modal id="admin-login" title="Login admin">
	<b-container fluid>
		<b-row class="m-b-0">
			<b-col>
				<b-form-group>
					<b-form-input
					id="admin-name"
					v-model="admin.name"
					placeholder="Nombre"
					@keydown.enter="loginAdmin"></b-form-input>
				</b-form-group>
				<b-form-group>
					<b-form-input
					id="admin-password"
					type="password"
					v-model="admin.password"
					placeholder="Contraseña"
					@keydown.enter="loginAdmin"></b-form-input>
				</b-form-group>
			</b-col>
		</b-row>
	</b-container>
	<template v-slot:modal-footer>
		<b-button
		variant="primary"
		@click="loginAdmin">
			<btn-loader :loading="loading_login_admin"></btn-loader>
			Ingresar
		</b-button>
	</template>
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
			admin: {
				name: '',
				password: '',
			},
			loading_login_admin: false,
		}
	},
	methods: {
		loginAdmin() {
			this.loading_login_admin = true
			this.$axios.post('/login-admin', {
				name: this.admin.name,
				password: this.admin.password,
			})
			.then(res => {
				if (res.data.login) {
					this.$store.commit('auth/setAuthenticated', true)
					this.$store.commit('auth/setUser', res.data.user)
					this.$router.replace('/')
				} else {
					this.loading_login_admin = false
					this.$toast.error('Las credenciales no coinciden, intente de nuevo, por favor')
					this.admin.name = ''
					this.admin.password = ''
					this.getElementById('admin-name').focus()
				}
			})
			.catch(err => {
				console.log(err)
			})
		},
	},
}
</script>