export default {
	methods: {
		hasPermissionForRoute(route, user) {
			console.log(route)
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
		        if (rol.slug == 'owner') {
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
		},
        hasOnline(user) {
            if (user.online) {
                return true
            }
            return false
        },
		isProvider(user) {
			var is_provider = false
			if (user.roles) {
				user.roles.forEach(rol => {
					if (rol.slug == 'provider') {
						is_provider = true
					}
				})
				return is_provider
			}
		},
		hasPermissionTo(permission_slug, user, dont_check_owner = false) {
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
		},
		isAdmin(user) {
			var is_admin = false
			if (user.roles) {
				user.roles.forEach(rol => {
					if (rol.slug == 'owner') {
						is_admin = true
					}
				})
				return is_admin
			}
		},
		canUse(permission_slug, user) {
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
		},
	},
}