export default {
	computed: {
		auth_user() {
			return this.$store.state.auth.user
		},
		authenticated() {
			return this.$store.state.auth.authenticated
		},
	},
	methods: {
		can(permission_name, user = this.auth_user) {
			if (user) {
				let has_permission = false
				let role = user.roles[0]
				if (role.name == 'Super Admin') {
					has_permission = true
				}
				if (!has_permission) {
					user.permissions.forEach(per => {
						if (per.name == permission_name) {
							has_permission = true
						}
					})
				}
				return has_permission
			}
		},
		hasRole(role_name, user = this.auth_user) {
			if (user) {
				let has_role = false
				user.roles.forEach(r => {
					if (r.name == role_name) {
						has_role = true
					}
				})
				return has_role
			}
		},
		hasPermissionForRoute(route, user = this.auth_user) {
			if (user) {
				let permission_name = ''
				if (route == '/vender') {
					permission_name = 'Vender'
				} else if (route == '/ingresar') {
					permission_name = 'Ingresar articulos'
				} else if (route == '/listado') {
					permission_name = 'Ver articulos'
				} else if (route == '/ventas') {
					permission_name = 'Ver ventas'
				}
			    let has_permission = false
			    user.roles.forEach(rol => {
			        if (rol.name == 'Super Admin') {
			            has_permission = true
			        }
			    })
			    if (!has_permission) {
			        user.permissions.forEach(permission => {
			            if (permission.name == permission_name) {
			                has_permission = true
			            }
			        })
			    }
			    return has_permission
			}
		},
        hasOnline(user = this.auth_user) {
        	if (user) {
	            if (user.online) {
	                return true
	            }
	            return false
        	}
        },
		isProvider(user = this.auth_user) {
			if (user) {
				var is_provider = false
				if (user.roles) {
					user.roles.forEach(rol => {
						if (rol.name == 'provider') {
							is_provider = true
						}
					})
					return is_provider
				}
			}
		},
		hasPermissionTo(permission_name, user, dont_check_admin = false) {
			if (user) {
				var has_permission = false
				if (user.roles) {
					if (!dont_check_admin) {
						user.roles.forEach(rol => {
							if (rol.name == 'Super Admin') {
								has_permission = true
							}
						})
					}
					if (!has_permission) {
						user.permissions.forEach(permission => {
							if (permission.name == permission_name) {
								has_permission = true
							}
						})
						return has_permission
					} else {
						return has_permission
					}
				}
			}
		},
		isAdmin(user = this.auth_user) {
			if (user) {
				var is_admin = false
				if (user.roles) {
					user.roles.forEach(rol => {
						if (rol.name == 'Super Admin') {
							is_admin = true
						}
					})
					return is_admin
				}
			}
		},
	},
}