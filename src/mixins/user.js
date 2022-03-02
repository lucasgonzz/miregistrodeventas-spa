export default {
	computed: {
		user() {
			return this.$store.state.auth.user
		},
		authenticated() {
			return this.$store.state.auth.authenticated
		},
        has_online() {
            return this.can('online.orders') || this.can('online.questions') || this.can('online.buyers') || this.can('online.messages') || this.can('online.cupons')
        },
		is_provider() {
			return this.user.type == 'provider'
		},
	},
	methods: {
		can(permission_slug) {
			let has_permission = false
		    if (this.user.status == 'super') {
		        has_permission = true
		    }
			if (!has_permission) {
				has_permission = this.hasPermissionTo(permission_slug)
			}
			return has_permission
		},
		hasRole(role_name) {
			let has_role = false
			this.user.roles.forEach(r => {
				if (r.name == role_name) {
					has_role = true
				}
			})
			return has_role
		},
		hasPermissionForRoute(route) {
			console.log('viendo permisos para la ruta: '+route)
			let permission_slug = ''
			if (route == '/vender') {
				permission_slug = 'sales.store'
			} else if (route == '/ingresar') {
				permission_slug = 'articles.store'
			} else if (route == '/listado') {
				permission_slug = 'articles.index'
			} else if (route == '/ventas') {
				permission_slug = 'sales.index'
			} else if (route == '/empleados') {
				permission_slug = 'employees'
			} else if (route.includes('tienda-online')) {
				if (route.includes('pedidos')) {
					permission_slug = 'online.orders'
				} else if (route.includes('preguntas')) {
					permission_slug = 'online.questions'
				} else if (route.includes('clientes')) {
					permission_slug = 'online.buyers'
				} else if (route.includes('mensajes')) {
					permission_slug = 'online.messages'
				} else if (route.includes('cupones')) {
					permission_slug = 'online.cupons'
				}
			} else if (route.includes('super')) {
				permission_slug = 'Super'
			}
		    let has_permission = false
		    if (permission_slug == 'Super' && this.user.status == 'super') {
		        has_permission = true
		    }
		    if (!has_permission) {
		        has_permission = this.hasPermissionTo(permission_slug)
		    }
		    has_permission ? console.log('tiene permiso') : console.log('no tiene permiso')
		    return has_permission
		},
		hasPermissionTo(permission_slug) {
			let has_permission = false
			if (!this.user.owner_id) {
				this.user.plan.permissions.forEach(permission => {
		            if (permission.slug == permission_slug) {
		                has_permission = true
		            }
		        })
			} else {
				this.user.permissions.forEach(permission => {
		            if (permission.slug == permission_slug) {
		                has_permission = true
		            }
		        })
			}
	        return has_permission
		},
		isAdmin() {
			return !this.user.owner_id 
		},
	},
}