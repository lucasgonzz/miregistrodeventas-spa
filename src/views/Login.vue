<template>
<div id="login">
    <admin-login></admin-login>
    <register></register>
	<b-row>
		<b-col 
		class="d-none d-xl-block"
		xl="8">
			<img src="@/assets/precentacion.jpg" alt="Imagen">
		</b-col>
		<b-col 
		cols="12"
		sm="8"
		md="6"
		class="col-form"
		xl="3">
			<b-card>
				<div>
					<img src="@/assets/logo.png" alt="">
					<b-form-group>
						<b-form-input
						id="company-name"
						v-model="user.company_name"
						@keydown.enter="login"
						placeholder="Nombre de comercio"></b-form-input>
					</b-form-group>
					<b-form-group 
					v-show="login_employee">
						<b-form-input
						id="name"
						v-model="user.name"
						@keydown.enter="login"
						placeholder="Nombre de empleado"></b-form-input>
					</b-form-group>
					<b-form-group>
						<b-form-input
						id="password"
						type="password"
						v-model="user.password"
						@keydown.enter="login"
						placeholder="Contraseña"></b-form-input>
					</b-form-group>
					<b-form-checkbox
					v-model="user.remember"
					class="remember">
						Recordarme
					</b-form-checkbox>
					<b-button 
					@click="login"
					variant="primary"
					block>
						<span 
						v-show="loading"
						class="spinner-border spinner-border-sm"></span>
						<span 
						v-show="!loading">
							Ingresar
						</span>
					</b-button>
					<b-button 
					block
					class="m-b-10"
					size="sm"
					@click="login_employee ? login_employee = false : login_employee = true"
					variant="link">
						<span v-show="login_employee">
							Ingresar como dueño
						</span>
						<span v-show="!login_employee">
							Ingresar como empleado
						</span>
					</b-button>
					<b-button
					size="sm"
					v-b-modal="'register'"
					variant="link">
						¿No tenes cuenta? Registrate
					</b-button>
				</div>
			</b-card>
		</b-col>
	</b-row>
</div>
</template>
<script>

// import toastr from 'toastr'

import AdminLogin from '../components/login/modals/AdminLogin'
import Register from '../components/login/modals/Register'
import fondo from '@/assets/fondo.png'
export default {
	name: 'Login',
    components: {
        AdminLogin,
        Register,
    },
	data() {
		return {
			image: {backgroundImage: `url(${fondo})`},
			user: {
				company_name: '',
				name: '',
				password: '',
				remember: false,
			},
			loading: false,
			login_employee: false,
		}
	},
	computed: {
		authenticated() {
			return this.$store.state.auth.authenticated
		}
	},
	created() {
		// if (this.authenticated) {
		// 	this.$router.replace({name: 'Ingresar'})
		// }
	},
	methods: {
		csrf() {
			console.log('se mando cookie')
			return this.$axios.get('/sanctum/csrf-cookie')
		},
		login() {
			// this.csrf()
			// .then(() => {
			this.loading = true
			if (this.user.name == '') {
				this.$axios.post('/login-owner', this.user)
				.then(res => {
					console.log(res.data)
					if (res.data.login) {
						this.loading = false
						this.$store.commit('auth/setAuthenticated', true)
						this.$store.commit('auth/setUser', res.data.user)
						this.$router.replace('/')
					} else {
						this.$toast.error('Sus credenciales no coinciden, verifique e intente denuevo, por favor.')
						document.getElementById('company-name').focus()
						this.loading = false
					}
				})
				.catch(err => {
					this.loading = false
					this.$toast.error(`${err}`)
					console.log(err)
				})
			} else {
				this.$axios.post('login-employee', this.user)
				.then(res => {
					if (res.data.login) {
						this.loading_employee_login = false
						this.$store.commit('auth/setAuthenticated', true)
						this.$store.commit('auth/setUser', res.data.user)
						this.$router.replace('/')
					} else {
						this.$toast.error('Sus credenciales no coinciden, verifique e intente denuevo, por favor.')
						document.getElementById('company-name').focus()
						this.loading = false
					}
				})
				.catch(err => {
					console.log(err)
				})
			}
			// })
		}, 
	},
}
</script>
<style scoped lang="sass">
#login 
	height: 100vh
	.card 
		border: none
		border-radius: 0
		box-shadow: none
		background: #FFF
		@media screen and (max-width: 1200px)
			box-shadow: none
	.row
		height: 100vh
		@media screen and (min-width: 778px) and (max-width: 1200px)
			background: #333
		// @media screen and (min-width: 1200px)
		border-top: 4px solid #007bff
		display: flex
		justify-content: center
		align-items: center
		margin-bottom: 0
	@media screen and (max-width: 778px)
		margin-top: -20px
.col-form 
	img 
		width: 100px
		margin-bottom: 1em
	// height: 500px
.col-margin
	@media screen and (max-width: 778px)
		margin-bottom: 20px

.card 
	width: 100%
	.card-header
		font-weight: bold

.input-inline 
	width: 48%

.strong-card-title
	display: block
	width: 100%
	font-weight: bold
	font-size: 1rem
	text-align: center
	margin: 0
.logo 
	width: 100px
.remember
	margin-bottom: .5em
</style>