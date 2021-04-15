<template>
<b-modal id="employee-permissions" :title="`Permisos de ${employee.name}`" hide-footer>
	<permissions-list
	:employee="employee"></permissions-list>
	<b-button  
	block
	variant="primary"
	@click="updatePermissions">
		<btn-loader
		text="Actualizar permisos"
		:loader="loading"></btn-loader>
	</b-button>
</b-modal>
</template>
<script>
import PermissionsList from '../components/PermissionsList.vue'
import BtnLoader from '@/components/common/BtnLoader.vue'
export default {
	name: 'EmployeePermissions',
	components: {
		BtnLoader,
		PermissionsList,
	},
	computed: {
		employee() {
			return this.$store.state.employees.employee_to_show_permissions
		},
		permissions() {
			return this.$store.state.permissions.permissions
		},
	},
	data() {
		return {
			loading: false,
		}
	},
	methods: {
		updatePermissions() {
			this.loading = true
			this.$api.put('/employees', this.employee)
			.then(res => {
				console.log(res.data.employee)
				this.loading = false
				this.$toast.success('Empleado actualizado')
				this.$bvModal.hide('employee-permissions')
			})
			.catch(err => {
				this.loading = false
				this.$toast.error('Error al actualizar empleado')
				console.log(err)
			})
		},
	},
}
</script>
<style scoped>
	
</style>