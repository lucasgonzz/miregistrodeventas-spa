<template>
<div class="modal fade" id="admin-login">
	<div class="modal-dialog modal-dialog-scrollable">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">
					<strong>
						<i class="icon-lock"></i>
						Login Admin
					</strong>
				</h5>
				<button class="close" data-dismiss="modal">
					<i class="icon-cancel"></i>
				</button>
			</div>
			<div class="modal-body">
				<div class="form-group">
					<input type="text" 
							id="admin-name"
							v-model="admin.name"
							class="form-control" 
							placeholder="Nombre de administrador">
				</div>
				<div class="form-group">
					<input type="password" 
							v-model="admin.password"
							class="form-control" 
							@keyup.enter="loginAdmin"
							placeholder="Contraseña de administrador">
				</div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-secondary" data-dismiss="modal">
					Cerrar
				</button>
				<button class="btn btn-primary"
						@click="loginAdmin">
					<span v-show="loading_login_admin" 
						class="spinner-border spinner-border-sm"></span>
					<i v-show="!loading_login_admin" 
						class="icon-check"></i>
					Login
				</button>
			</div>
		</div>
	</div>
</div>
</template>
<script>
export default {
	props: [''],
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
			axios.post('login-admin', {
				name: this.admin.name,
				password: this.admin.password,
			})
			.then(res => {
				if (res.data.login) {
					if (res.data.super) {
						window.location.replace('super')
					} else {
						window.location.replace('admin')
					}
				} else {
					this.loading_login_admin = false
					this.admin.name = ''
					this.admin.password = ''
					$('#admin-name').focus()
				}
			})
			.catch(err => {
				console.log(err)
			})
		},
	},
}
</script>
<style scoped>
	
</style>