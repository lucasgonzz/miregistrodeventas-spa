<template>
<div id="login">
    <admin-login></admin-login>
    <b-row class="j-center">
		<b-col 
		cols="12"
		md="10"
		xl="8">
			<b-card>
				<template v-slot:header>
                    <h1 class="h3 m-0 d-inline-block">
                        <strong>
                            <i class="icon-user"></i>
                            Ingresar
                        </strong>
                    </h1>
                    <button class="btn btn-primary float-right"
                            @click="showAdminLogin">
                        <i class="icon-lock"></i>
                        Administrador
                    </button>
				</template>
				<div>
					<b-container fluid>
						<b-row>
							<b-col
							cols="12"
							md="5">
								<b-card header="Ingresar como dueño" no-body>
									<div class="p-t-15">
										<b-container fluid>
											<b-form-row>
												<b-col
												cols="12">
													<b-form-group>
														<b-form-input
														id="commerce-name"
														@keyup.enter="loginCommerce" 
														placeholder="Nombre del comercio"
														v-model="commerce.name"></b-form-input>
													</b-form-group>
												</b-col>
												<b-col
												cols="12">
													<b-form-group>
														<b-form-input
														id="commerce-password"
														type="password"
														@keyup.enter="loginCommerce" 
														placeholder="Contraseña"
														v-model="commerce.password"></b-form-input>
													</b-form-group>
												</b-col>
												<b-col
												cols="12"
												class="j-end">
													<b-button 
													:class="commerce.name != '' && commerce.password != '' ? '' : 'disabled'"
													variant="primary"
													@click="loginCommerce">
														<i v-show="!loading_commerce_login"
														class="icon-check"></i>
														<span v-show="loading_commerce_login" 
														class="spinner-border spinner-border-sm p-r-5"></span>
														Ingresar
													</b-button>
												</b-col>
											</b-form-row>
										</b-container>
									</div>
								</b-card>
							</b-col>
							<b-col
							cols="12"
							md="7">
								<b-card header="Ingresar como empleado" no-body>
									<div class="p-t-15">
										<b-container fluid>
											<b-form-row>
												<b-col
												cols="12"
												md="6">
													<b-form-group>
														<b-form-input
														type="text"
														id="employee-commerce"
														placeholder="Nombre del comercio"
														v-model="employee.commerce"></b-form-input>
													</b-form-group>
												</b-col>
												<b-col
												cols="12"
												md="6">
													<b-form-group>
														<b-form-input
														type="text"
														id="employee-name"
														placeholder="Nombre de usuario"
														v-model="employee.name"
														@keyup.enter="loginEmployee">
														</b-form-input>
													</b-form-group>
												</b-col>
												<b-col
												cols="12">
													<b-form-group>
														<b-form-input
														type="password"
														id="employee-password"
														placeholder="contraseña"
														v-model="employee.password"
														@keyup.enter="loginEmployee">
														</b-form-input>
													</b-form-group>
												</b-col>
												<b-col
												cols="12"
												class="j-end">
													<b-button 
													variant="primary"
													:class="employee.commerce != '' && employee.name != '' && employee.password != '' ? '' : 'disabled'"
													@click="loginEmployee">
														<i v-show="!loading_employee_login"
														class="icon-check"></i>
														<span v-show="loading_employee_login" 
														class="spinner-border spinner-border-sm p-r-5"></span>
														Ingresar
													</b-button>
												</b-col>
											</b-form-row>
										</b-container>
									</div>
								</b-card>
							</b-col>
						</b-row>
					</b-container>
				</div>
			</b-card>
		</b-col>
    </b-row>
</div>
</template>
<script>

// import toastr from 'toastr'

import AdminLogin from '../components/login/modals/AdminLogin'
export default {
	name: 'Login',
    components: {
        AdminLogin,
    },
	data() {
		return {
			commerce: {
				name: '',
				password: '',
			},
			employee: {
				commerce: '',
				name: '',
				password: '',
			},
			loading_commerce_login: false,
			loading_employee_login: false,
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
			return this.$axios.get('/sanctum/csrf-cookie')
		},
        showAdminLogin() {
            this.$jQuery('#admin-login').modal('show')
            this.$jQuery('#admin-name').focus()
        },
		loginCommerce() {
			if (this.commerce.name != '' && this.commerce.password != '') {
				this.loading_commerce_login = true
				this.csrf()
				.then(() => {
					this.$axios.post('login-owner', {
						commerce: this.commerce.name,
						password: this.commerce.password
					})
					.then(res => {
						if (res.data.login) {
							this.loading_commerce_login = false
							this.$store.commit('auth/setAuthenticated', true)
							this.$store.commit('auth/setUser', res.data.user)
							this.$router.replace('/')
						} else {
							this.$toast.error('Sus credenciales no coinciden, verifique e intente denuevo, por favor ;)')
							document.getElementById('commerce-name').focus()
							this.loading_commerce_login = false
						}
					})
				})
			} else {
				this.$toast.error('Complete con sus datos por favor.')
			}
		}, 
		loginEmployee() {
			if (this.employee.commerce != '' && this.employee.name != '' && this.employee.password != '') {
				this.csrf()
				.then(() => {
					this.loading_employee_login = true
					this.$axios.post('login-employee', {
						commerce: this.employee.commerce,
						name: this.employee.name,
						password: this.employee.password
					})
					.then(res => {
						console.log(res.data)
						if (res.data.login) {
							this.loading_employee_login = false
							this.$store.commit('auth/setAuthenticated', true)
							this.$store.commit('auth/setUser', res.data.user)
							this.$router.replace('/')
						} else {
							this.$toast.error('Sus credenciales no coinciden, verifique e intente denuevo, por favor ;)')
							this.employee.commerce = ''
							this.employee.name = ''
							this.employee.password = ''
							this.$jQuery('#employee-commerce').focus()
							this.loading_employee_login = false
						}
					})
				})
			} else {
				this.$toast.error('Complete con sus datos por favor.') 
			}
		}, 
	},
}
</script>
<style scoped lang="sass">
.card 
    width: 100%
    margin-bottom: 1em
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
</style>