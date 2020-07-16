<template>
<b-modal id="employee-permissions" :title="`Permisos de ${this.employee_to_show_permissions.name}`" scrollable>
	<b-container>
		<b-row>
			<b-col>
				<permissions-list 
				v-if="employee_to_show_permissions.permissions" 
				:user="user"
				:employee="employee_to_show_permissions"
				:permissions="permissions"
				:permissions_sale_time="permissions_sale_time"></permissions-list>
			</b-col>
		</b-row>
	</b-container>
	<template v-slot:modal-footer>
		<b-button 
		variant="primary"
		@click="updatePermissions">
			<i v-show="!updating_employee_permissions"
				class="icon-check"></i>
			<span v-show="updating_employee_permissions"
				class="spinner-border spinner-border-sm"></span>
			Actualizar permisos
		</b-button>
	</template>
</b-modal>
</template>
<script>
import PermissionsList from '../components/PermissionsList.vue'

// Mixins
import Validate from '../mixins/Validate.js'
export default {
	name: 'EmployeePermissions',
	mixins: [Validate],
	props: ['employee_to_show_permissions', 'permissions', 'permissions_sale_time', 'user'],
	components: {
		PermissionsList,
	},
	data() {
		return {
			employee_permissions_id: [],
			employee_permissions_sale_time_id: [],
			updating_employee_permissions: false,
		}
	},
	watch: {
		employee_to_show_permissions() {
			this.setEmployeePermissionsId()
		},
	},
	methods: {
		updatePermissions() {
			let ok = this.validate(this.employee_to_show_permissions, this.permissions)
			if (ok) {
				this.updating_employee_permissions = true
				this.$api.put('employees/permissions/'+this.employee_to_show_permissions.id, {
					permissions: this.employee_to_show_permissions.permissions
				})
				.then(res => {
					console.log(res.data)
					this.updating_employee_permissions = false
					this.$toast.success('Permisos actualizados correctamente')
					this.$bvModal.hide('employee-permissions')
				})
				.catch(err => {
					this.$toast.error('Error al actualizar permisos')
					console.log(err)
				})
			}
		},
		setEmployeePermissionsId() {
			this.employee_permissions_id = []
			this.employee_to_show_permissions.permissions.forEach(permission => {
				if (permission.user_id === null || permission.user_id == this.user.id) {
					this.employee_permissions_id.push(permission.id)
				}
			})
			this.employee_to_show_permissions.permissions = this.employee_permissions_id
		},
		setEmployeePermissionsSaleTimeId() {
			this.employee_permissions_sale_time_id = []
			this.employee_to_show_permissions.permissions.forEach(permission => {
					console.log(permission.user_id)
				if (permission.user_id == this.user.id) {
					this.employee_permissions_sale_time_id.push(permission.id)
				}
			})
		},
		// getPermissionToShowAllSales() {
		// 	var permission_show_all_sales = {}
		// 	this.permissions.forEach(permission => {
		// 		if (permission.slug == 'sale.index.all') {
		// 			permission_show_all_sales = permission
		// 		}
		// 	})
		// 	return permission_show_all_sales
		// },
		// getPermissionToShowOnlyDaySales() {
		// 	var permission_show_only_date_sales = {}
		// 	this.permissions.forEach(permission => {
		// 		if (permission.slug == 'sale.index.only_day') {
		// 			permission_show_only_date_sales = permission
		// 		}
		// 	})
		// 	return permission_show_only_date_sales
		// },
	},
}
</script>
<style scoped>
	
</style>