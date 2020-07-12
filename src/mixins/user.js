export default {
	data() {
		return {
			api_url: 'http://localhost:8000'
		}
	},
	methods: {
		redirect(user) {
			if (user.owner_id) {
				if (this.hasPermissionTo('sale.create', user)) {
					return '/vender'
				} else if (this.hasPermissionTo('article.create', user)) {
					return '/ingresar'
				} else if (this.hasPermissionTo('article.index', user)) {
					return 'listado'
				} 
				return '/ventas'
			} 
			return '/vender'
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