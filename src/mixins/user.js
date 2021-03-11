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
		can(permission_slug, user = this.auth_user) {
			if (user) {
				let has_permission = false
				let role = user.roles[0]
				if (role.slug == 'admin') {
					has_permission = true
				}
				if (!has_permission) {
					user.permissions.forEach(per => {
						if (per.slug == permission_slug) {
							has_permission = true
						}
					})
				}
				return has_permission
			}
		},
		hasRole(role_slug, user = this.auth_user) {
			if (user) {
				let has_role = false
				user.roles.forEach(r => {
					if (r.slug == role_slug) {
						has_role = true
					}
				})
				return has_role
			}
		},
		hasPermissionForRoute(route, user = this.auth_user) {
			if (user) {
				let permission_slug = ''
				if (route == '/vender') {
					permission_slug = 'sale.create'
				} else if (route == '/ingresar') {
					permission_slug = 'article.create'
				} else if (route == '/listado') {
					permission_slug = 'article.index'
				} else if (route == '/ventas') {
					permission_slug = 'sale.index'
				}
			    let has_permission = false
			    user.roles.forEach(rol => {
			        if (rol.slug == 'admin') {
			            has_permission = true
			        }
			    })
			    if (!has_permission) {
			        user.permissions.forEach(permission => {
			            if (permission.slug == permission_slug) {
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
						if (rol.slug == 'provider') {
							is_provider = true
						}
					})
					return is_provider
				}
			}
		},
		hasPermissionTo(permission_slug, user, dont_check_owner = false) {
			if (user) {
				var has_permission = false
				if (user.roles) {
					if (!dont_check_owner) {
						user.roles.forEach(rol => {
							if (rol.slug == 'owner') {
								has_permission = true
							}
						})
					}
					if (!has_permission) {
						user.permissions.forEach(permission => {
							if (permission.user_id === null) {
								if (permission.slug == permission_slug) {
									has_permission = true
								}
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
						if (rol.slug == 'owner') {
							is_admin = true
						}
					})
					return is_admin
				}
			}
		},
		canUse(permission_slug, user) {
			if (user) {
				var has_permission = false
				if (user.permissions) {
					user.permissions.forEach(permission => {
						if (permission.user_id === 0) {
							if (permission.slug == permission_slug) {
								has_permission = true
							}
						} 
					})
					return has_permission
				}
			}
		},
	},
}