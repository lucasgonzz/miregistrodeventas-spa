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
        auth_loading() {
            return this.$store.state.auth.loading
        },
        selected_address() {
        	return this.$store.state.auth.selected_address
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
			let slug = ''
			if (route == '/vender') {
				slug = 'sales.store'
			} else if (route.includes('produccion')) {
				if (route.includes('presupuestos')) {
					slug = 'budgets.index'
				} else if (route.includes('ordenes-de-produccion')) {
					slug = 'order_productions.index'
				}
			} else if (route == '/ingresar') {
				slug = 'articles.store'
			} else if (route == '/listado') {
				slug = 'articles.index'
			} else if (route.includes('ventas')) {
				slug = 'sales.index'
			} else if (route == '/empleados') {
				slug = 'employees'
			} else if (route.includes('proveedores')) {
				slug = 'providers'
			} else if (route.includes('configuracion')) {
				slug = 'configuration'
			} else if (route == '/mapa') {
				slug = 'maps'
			} else if (route.includes('suscripcion')) {
				slug = 'susbcription'
			} else if (route.includes('tienda-online')) {
				if (route.includes('pedidos')) {
					slug = 'online.orders'
				} else if (route.includes('preguntas')) {
					slug = 'online.questions'
				} else if (route.includes('clientes')) {
					slug = 'online.buyers'
				} else if (route.includes('mensajes')) {
					slug = 'online.messages'
				} else if (route.includes('cupones')) {
					slug = 'online.cupons'
				} else if (route.includes('llamadas')) {
					slug = 'online.calls'
				}
			} else if (route.includes('super')) {
				slug = 'super'
			}

		    let has_permission = false
		    if (slug == 'super' && this.user.status == 'super') {
		        has_permission = true
		    }

		    if ((slug == 'configuration' || slug == 'maps' || slug == 'susbcription') && !this.user.owner_id) {
		        has_permission = true
		    }
		    if (!has_permission) {
		        has_permission = this.hasPermissionTo(slug)
		    }
		    if (!has_permission) {
		        has_permission = this.hasExtencion(slug)
		    }

		    if (this.user.trial_expired) {
		        has_permission = false
		    	if (slug == 'susbcription' || route == '/prueba-terminada') {
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