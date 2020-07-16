export default {
	methods: {
		isNotPermissionForSeeSales(permission) {
			if (permission.slug == 'sale.index.only_day' || permission.slug == 'sale.index.all') {
				return false
			}
			return true
		},
		getPermissionToShowSales(permissions) {
			var permission_show_sales= {}
			permissions.forEach(permission => {
				if (permission.slug == 'sale.index') {
					permission_show_sales = permission
				}
			})
			return permission_show_sales
		},
		getPermissionToShowAllSales(permissions) {
			var permission_show_all_sales = {}
			permissions.forEach(permission => {
				if (permission.slug == 'sale.index.all') {
					permission_show_all_sales = permission
				}
			})
			return permission_show_all_sales
		},
		getPermissionToShowOnlyDaySales(permissions) {
			var permission_show_only_date_sales = {}
			permissions.forEach(permission => {
				if (permission.slug == 'sale.index.only_day') {
					permission_show_only_date_sales = permission
				}
			})
			return permission_show_only_date_sales
		},
		validate(employee, permissions) {
			var ok = false
			// Se fija si el epmleado tiene permiso para ver las ventas
			// y si hay horarios de ventas
			if (employee.permissions.includes(this.getPermissionToShowSales(permissions).id) && this.canUse('sale_time', this.user) && this.permissions_sale_time.length) {
				// Se fija si el empleado tiene permiso para ver lsa ventas de cualquir horario
				if (employee.permissions.includes(this.getPermissionToShowAllSales(permissions).id)) {
					ok = true
				} else {
					// Si no tiene permiso de ver las ventas de cualquier horario
					// se fija que tenga al menos un permiso de sale_time
					this.permissions_sale_time.forEach(permission => {
						if (employee.permissions.includes(permission.id)) {
							ok = true
						}
					})
				}
			} else {
				ok = true
			}
			if (!ok) {
				this.$toast.error('Debe seleccionar al menos un horario para que '+employee.name+' pueda ver las ventas')
			}
			return ok
		},
	},
}