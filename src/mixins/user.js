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
		is_owner() {
			return !this.user.owner_id
		},
		is_provider() {
			return this.user.type == 'provider'
		},
	},
	methods: {
		hasExtencion(slug) {
			if (this.is_owner) {
				let index = this.user.extencions.findIndex(extencion => {
					return extencion.slug == slug
				})
				return index != -1
			} else {
				let index = this.user.permissions.findIndex(permission => {
					return permission.extencion && permission.extencion.slug == slug 
				})
				return index != -1
			}
		},
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
		hasPermissionTo(permission_slug) {
			let has_permission = false
			if (this.is_owner) {
				this.user.plan.permissions.forEach(permission => {
		            if (permission.slug == permission_slug) {
		                has_permission = true
		            }
		        })
		        if (!has_permission) {
			        this.user.extencions.forEach(extencion => {
			        	let index = extencion.permissions.findIndex(permission => {
			        		return permission.slug == permission_slug
			        	})
			        	if (index != -1) {
			        		has_permission = true
			        	}
			        })
		        }
			} else {
				this.user.permissions.forEach(permission => {
		            if (permission.slug == permission_slug) {
		                has_permission = true
		            }
		        })
			}
	        return has_permission
		},
		hasPermissionForRoute(route) {
			console.log('viendo permisos para la ruta: '+route)
			let permission_slug = ''
			if (route == '/vender') {
				permission_slug = 'sales.store'
			} else if (route.includes('produccion')) {
				if (route.includes('presupuestos')) {
					permission_slug = 'budgets.index'
				} else if (route.includes('ordenes-de-produccion')) {
					permission_slug = 'order_productions.index'
				}
			} else if (route == '/ingresar') {
				permission_slug = 'articles.store'
			} else if (route == '/listado') {
				permission_slug = 'articles.index'
			} else if (route == '/ventas' || route == '/ventas-completas') {
				permission_slug = 'sales.index'
			} else if (route == '/empleados') {
				permission_slug = 'employees'
			} else if (route.includes('proveedores')) {
				permission_slug = 'proveedores'
			} else if (route.includes('configuracion')) {
				permission_slug = 'configuration'
			} else if (route == '/mapa') {
				permission_slug = 'maps'
			} else if (route.includes('suscripcion')) {
				permission_slug = 'susbcription'
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
				} else if (route.includes('llamadas')) {
					permission_slug = 'online.calls'
				}
			} else if (route.includes('super')) {
				permission_slug = 'super'
			}

		    let has_permission = false
		    if (permission_slug == 'super' && this.user.status == 'super') {
		        has_permission = true
		    }

		    if ((permission_slug == 'configuration' || permission_slug == 'maps' || permission_slug == 'susbcription') && !this.user.owner_id) {
		        has_permission = true
		    }
		    if (!has_permission) {
		        has_permission = this.hasPermissionTo(permission_slug)
		    }
		    if (!has_permission) {
		        has_permission = this.hasExtencion(permission_slug)
		    }

		    if (this.user.trial_expired) {
		        has_permission = false
		    	if (permission_slug == 'susbcription' || route == '/prueba-terminada') {
		        	has_permission = true
		    	}
		    }

		    has_permission ? console.log('tiene permiso') : console.log('no tiene permiso')
		    return has_permission
		},
		hasSubscriptionAuthorized() {
			if (!this.user.expired_at) {
				if (this.user.subscription.status != 'authorized') {
					console.log('hasSubscriptionAuthorized: false')
					return false
				} 
			} 
			console.log('hasSubscriptionAuthorized: true')
			return true
		},
		isAdmin() {
			return !this.user.owner_id 
		},
	},
}