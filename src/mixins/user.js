export default {
	methods: {
		active(url) {
			if (url == '') {
				return 'active'
			}
			return 'active'
		},
		isProvider() {
			var is_provider = false
			this.$store.state.user.roles.forEach(rol => {
				if (rol.slug == 'provider') {
					is_provider = true
				}
			})
			return is_provider
		},
		hasPermissionTo(permission_slug, dont_check_owner = false) {
			var has_permission = false
			if (!dont_check_owner) {
				this.$store.state.user.roles.forEach(rol => {
					if (rol.slug == 'owner') {
						has_permission = true
					}
				})
			}
			if (!has_permission) {
				this.$store.state.user.permissions.forEach(permission => {
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
		},
		isAdmin() {
			console.log(this.$store.state.user)
			if (this.$store.state.user) {
				console.log(this.$store.state.user)
				var is_admin = false
				this.$store.state.user.roles.forEach(rol => {
					if (rol.slug == 'owner') {
						is_admin = true
					}
				})
				return is_admin
			}
		},
		canUse(permission_slug) {
			var has_permission = false
			this.$store.state.user.permissions.forEach(permission => {
				if (permission.user_id === 0) {
					if (permission.slug == permission_slug) {
						has_permission = true
					}
				} 
			})
			return has_permission
		},
	},
}