<template>
<div id="login">
    <admin-login></admin-login>
    <div class="row justify-content-center m-t-30">
        <div class="col col-lg-8 col-mobile">
            <div class="card">
                <div class="card-header">
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
                </div>
                <div class="card-body">
                    <div class="row">
						<div class="col-12 col-md-5">
							<div class="card m-b-10">
								<div class="card-header">
									<p class="strong-card-title">
										<i class="icon-user"></i>
										Ingresar como dueño
									</p>
								</div>
								<div class="card-body">
									<div class="form-group">
										<input type="text" 
										id="commerce-name"
										@keyup.enter="loginCommerce" 
										v-model="commerce.name"
										placeholder="Nombre del comercio" class="form-control">
									</div>
									<div class="form-group">
										<input type="password" 
										id="commerce-password" 
										v-model="commerce.password"
										placeholder="Contraseña"
										@keyup.enter="loginCommerce" 
										class="form-control">
									</div>
									<button type="submit" 
									:class="commerce.name != '' && commerce.password != '' ? '' : 'disabled'"
									class="btn btn-primary"
									@click="loginCommerce">
										<i v-show="!loading_commerce_login"
										class="icon-check"></i>
										<span v-show="loading_commerce_login" 
										class="spinner-border spinner-border-sm p-r-5"></span>
										Ingresar
									</button>
								</div>
							</div>
						</div>
						<div class="col-12 col-md-7">
							<div class="card">
								<div class="card-header">
									<p class="strong-card-title">
										<i class="icon-user"></i>
										Ingresar como empleado
									</p>
								</div>
								<div class="card-body">
									<form class="form-inline m-b-15 justify-between">
										<input type="text" 
										id="employee-commerce" 
										placeholder="Nombre del comercio" 
										v-model="employee.commerce"
										class="form-control input-inline">
										<input type="text" name="employee_name" 
										id="employe-name" 
										placeholder="Nombre de usuario" 
										@keyup.enter="loginEmployee"
										v-model="employee.name"
										class="form-control input-inline">
									</form>
									<div class="form-group">
										<input type="password" 
										id="employee-password" 
										placeholder="Contraseña" 
										v-model="employee.password"
										@keyup.enter="loginEmployee"
										class="form-control">
									</div>
									<button class="btn btn-primary"
									:class="employee.commerce != '' && employee.name != '' && employee.password != '' ? '' : 'disabled'"
									@click="loginEmployee">
										<i v-show="!loading_employee_login"
										class="icon-check"></i>
										<span v-show="loading_employee_login" 
										class="spinner-border spinner-border-sm p-r-5"></span>
										Ingresar
									</button>
								</div>
							</div>
						</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>

import toastr from 'toastr'

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
		if (this.authenticated) {
			this.$router.replace({name: 'Ingresar'})
		}
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
							this.$router.replace({name: 'Ingresar'})
						} else {
							toastr.error('Sus credenciales no coinciden, verifique e intente denuevo, por favor ;)')
							document.getElementById('commerce-name').focus()
							this.loading_commerce_login = false
						}
					})
				})
			} else {
				toastr.error('Complete con sus datos por favor.')
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
							this.$router.replace({name: 'Ingresar'})
						} else {
							toastr.error('Sus credenciales no coinciden, verifique e intente denuevo, por favor ;)')
							this.employee.commerce = ''
							this.employee.name = ''
							this.employee.password = ''
							this.$jQuery('#employee-commerce').focus()
							this.loading_employee_login = false
						}
					})
				})
			} else {
				toastr.error('Complete con sus datos por favor.') 
			}
		}, 
	},
}
</script>
<style scoped lang="sass">
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