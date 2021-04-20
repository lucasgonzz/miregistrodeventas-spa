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
					<img src="@/assets/logo2.png" alt="">
					<b-form-group>
						<b-form-input
						id="name"
						v-model="user.company_name"
						@keydown.enter="login"
						placeholder="Nombre de comercio"></b-form-input>
					</b-form-group>
					<b-form-group >
						<b-form-input
						id="employee-name"
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
					<b-form-group>
						<b-form-checkbox
						v-model="user.remember"
						class="remember">
							Recordarme
						</b-form-checkbox>
					</b-form-group>
					<b-form-group>
						<b-button 
						@click="login"
						variant="primary"
						block>
							<btn-loader text="Ingresar" :loader="loading"></btn-loader>
						</b-button>
					</b-form-group>
					<b-form-group>
						<b-button
						size="sm"
						v-b-modal="'register'"
						variant="link">
							¿No tenes cuenta? Registrate
						</b-button>
					</b-form-group>
				</div>
			</b-card>
		</b-col>
	</b-row>
</div>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import AdminLogin from '../components/login/modals/AdminLogin'
import Register from '../components/login/modals/Register'
export default {
	name: 'Login',
    components: {
    	BtnLoader,
        AdminLogin,
        Register,
    },
	data() {
		return {
			user: {
				company_name: '',
				// company_name: 'mi negocio',
				name: '',
				password: '',
				remember: false,
			},
			loading: false,
		}
	},
	computed: {
		authenticated() {
			return this.$store.state.auth.authenticated
		},
	},
	methods: {
		csrf() {
			console.log('se mando cookie')
			return this.$axios.get('/sanctum/csrf-cookie')
		},
		login() {
			this.loading = true
			this.$axios.get('/sanctum/csrf-cookie')
			.then(() => {
				this.$axios.post('/login', this.user)
				.then(res => {
					console.log(res)
					this.loading = false
					if (res.data.login) {
						console.log('bien')
						this.$store.commit('auth/setAuthenticated', true)
						this.$store.commit('auth/setUser', res.data.user)
						this.$router.replace('/')
					} else {
						this.loading = false
						console.log('no bien')
						this.$toast.error('Sus datos no corresponden a un usuario registrado, intentelo denuevo')
						this.$store.commit('auth/setAuthenticated', false)
						this.$store.commit('auth/setUser', null)
					}
				})
				.catch(err => {
					this.loading = false
					this.$toast.error('Error al ingresar, intentelo mas tarde')
					console.log(err)
				})
			})
		}, 
	},
}
</script>
<style scoped lang="sass">
#login 
	height: 100vh
	.card 
		border: none
		border-radius: .4em
		box-shadow: none
		background: #FFF
		@media screen and (min-width: 768px) and (max-width: 1200px)
			-webkit-box-shadow: 0px 0px 11px 0px rgba(0,0,0,0.75)
			-moz-box-shadow: 0px 0px 11px 0px rgba(0,0,0,0.75)
			box-shadow: 0px 0px 11px 0px rgba(0,0,0,0.75)
			border-radius: .4em !important
	.row
		height: 100vh
		@media screen and (min-width: 768px) and (max-width: 1200px)
			background: #4a2c82
		// @media screen and (min-width: 1200px)
		display: flex
		justify-content: center
		align-items: center
		margin-bottom: 0
	@media screen and (max-width: 768px)
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