<template>
<div id="login">
    <admin-login></admin-login>
    <register></register>
	<b-row>
		<b-col 
		class="d-none"
		xl="8">
			<img 
			@click="toHome"
			class="c-p"
			src="@/assets/precentacion.jpg" alt="Imagen">
		</b-col>
		<b-col 
		cols="12"
		sm="8"
		md="6"
		lg="5"
		xl="4"
		class="col-form">
			<b-card>
				<div>
					<img 
					@click="toHome"
					class="c-p"
					src="@/assets/logo.png" alt="">
					<b-form-group
					v-if="!login_employee">
						<b-form-input
						id="name"
						v-model="form.company_name"
						@keydown.enter="login"
						placeholder="Nombre de comercio"></b-form-input>
					</b-form-group>
					<b-form-group
					v-if="login_employee">
						<b-form-input
						id="employee-dni"
						v-model="form.dni"
						@keydown.enter="callLogin"
						placeholder="DNI de empleado"></b-form-input>
					</b-form-group>
					<b-form-group>
						<b-form-input
						id="password"
						type="password"
						v-model="form.password"
						@keydown.enter="callLogin"
						placeholder="Contraseña"></b-form-input>
					</b-form-group>
					<b-form-group>
						<b-form-checkbox
						v-model="form.remember"
						class="remember">
							Recordarme
						</b-form-checkbox>
					</b-form-group>
					<b-form-group>
						<b-button 
						@click="callLogin"
						variant="primary"
						block>
							<btn-loader 
							text="Ingresar" 
							:loader="loading"></btn-loader>
						</b-button>
					</b-form-group>
					<b-form-group>
						<b-button 
						@click="changeLogin"
						variant="outline-primary"
						block>
							{{ text_change }}
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
import auth from '@/mixins/auth'
export default {
	name: 'Login',
	mixins: [auth],
    components: {
    	BtnLoader,
        AdminLogin,
        Register,
    },
	data() {
		return {
			form: {
				company_name: '',
				// company_name: 'mi negocio',
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
		},
		text_change() {
			if (this.login_employee) {
				return 'Ingresar como dueño'
			}
			return 'Ingresar como empleado'
		},
	},
	methods: {
		toHome() {
			this.$router.push({name: 'Home'})
		},
		changeLogin() {
			if (this.login_employee) {
				this.login_employee = false
			} else {
				this.login_employee = true
			}
		},
		callLogin() {
			this.loading = true
			this.$axios.get('/sanctum/csrf-cookie')
			.then(() => {
				this.login(this.form)
				.then(() => {
					if (!this.authenticated) {
						this.loginSuper(this.form)
						.then(() => {
							this.loading = false
						})
					} else {
						this.loading = false
					}
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
		@media screen and (min-width: 768px)
			box-shadow: 0 2px 4px rgb(0 0 0 / 15%) !important
			// -webkit-box-shadow: 0px 0px 11px 0px rgba(0,0,0,0.75)
			// -moz-box-shadow: 0px 0px 11px 0px rgba(0,0,0,0.75)
			// box-shadow: 0px 0px 11px 0px rgba(0,0,0,0.75)
			border-radius: .4em !important
	.row
		height: 100vh
		display: flex
		justify-content: center
		align-items: center
		margin-bottom: 0
	@media screen and (max-width: 768px)
		margin-top: -20px
.col-form 
	img 
		width: 130px
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