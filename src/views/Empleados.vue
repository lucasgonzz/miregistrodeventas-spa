<template>
	<div id="empleados">
		<employee-permissions 
		:employee_to_show_permissions="employee_to_show_permissions"
		:permissions="permissions"
		:permissions_sale_time="permissions_sale_time"
		:user="user"></employee-permissions>
		<b-row>
			<b-col>
				<b-card header="Empleados">
					<b-container fluid>
						<b-row>
							<b-col
							cols="12"
							md="6">
								<register-employee 
								:employee="employee"
								:user="user"
								:permissions="permissions"
								:permissions_sale_time="permissions_sale_time"
								:saving_employee="saving_employee"
								:intro_start="intro_start"
								@saveEmployee="saveEmployee"></register-employee>
							</b-col>
							<b-col
							cols="12"
							md="6">
								<employees-list 
								:employees="employees"
								:loading_employees="loading_employees"
								:deleting_employee="deleting_employee"
								@showPermissions="showPermissions"
								@deleteEmployee="deleteEmployee"></employees-list>
							</b-col>
						</b-row>
					</b-container>
				</b-card>
			</b-col>
		</b-row>
	</div>
</template>
<script>
// Modals
import EmployeePermissions from '../components/empleados/modals/EmployeePermissions.vue'

// Components
import RegisterEmployee from '../components/empleados/components/RegisterEmployee.vue'
import EmployeesList from '../components/empleados/components/EmployeesList.vue'

// Mixins
import Validate from '../components/empleados/mixins/Validate.js'
export default {
	name: 'Empleados',
	mixins: [Validate],
	components: {
		// Modals
		EmployeePermissions,

		// Components
		RegisterEmployee,
		EmployeesList,
	},
	data() {
		return {
			employees: [],
			loading_employees: false,

			employee: {
				name: '',
				password: '',
				permissions: [],
			},
			saving_employee: false,
			employee_to_show_permissions: {},
			permissions: [],	
			permissions_sale_time: [],	
			deleting_employee: 0,

			intro_start: false,
		}
	}, 
	computed: {
		user() {
			return this.$store.state.auth.user
		}
	},
	methods: {
		capitalize(str) {
			return str.charAt(0).toUpperCase() + str.slice(1)
		},
		deleteEmployee(employee) {
			this.deleting_employee = employee.id
			this.$api.delete(`employees/${employee.id}`)
			.then(() => {
				this.deleting_employee = 0
				this.$toast.success(`Empleado ${employee.name} eliminado correctamente`)
				this.getEmployees()
			})
			.catch(err => {
				this.deleting_employee = 0
				console.log(err)
			})
		},
		showPermissions(employee) {
			this.employee_to_show_permissions = employee
			this.$bvModal.show('employee-permissions')
		},
		saveEmployee() {
			if (this.validate(this.employee, this.permissions)) {
				this.saving_employee = true
				let permissions = this.employee.permissions.join('-')
				let url = 'employees/'+this.employee.name+'/'+this.employee.password+'/'+permissions
				console.log('url: '+url)
				this.$api.get(url)
				.then(res => {
					this.saving_employee = false
					if (!res.data.repeated) {
						this.$toast.success(`Empleado ${this.employee.name} creado correctamente`)
						this.employee.name = ''
						this.employee.password = ''
						this.employee.permissions = []
						this.getEmployees()
						this.intro_start = false
					} else {
						this.$toast.error(`Ya hay un empleado con nombre ${this.employee.name} en el sistema`)
						this.employee.name = ''
						document.getElementById('name').focus()
					}
				})
				.catch(err => {
					this.saving_employee = false
					this.$toast.error('Error al guardar empleado'+this.employee.name+', recargue la página e intentelo de nuevo, por favor')
					console.log(err)
				})
			}
		},
		getEmployees() {
			this.loading_employees = true
			this.$api.get('employees')
			.then(res => {
				this.loading_employees = false
				this.employees = res.data
			})
			.catch(err => {
				console.log(err)
			})
		},

		// Permisos
		getPermissions() {
			this.$api.get('permissions')
			.then( res => {
				this.permissions = res.data
				this.filterPermissions()
			})
			.catch(err => {
				console.log(err)
			})
		},

		// Si no se puede usar el modulo de clientes se saca ese permiso de la lista de permisos
		filterPermissions() {
			var can_use_clients = this.canUse('client', this.user)
			if (!can_use_clients) {
				console.log('No puede usar clientes')
				this.permissions.forEach(permission => {
					if (permission.slug == 'client') {
						var index = this.permissions.indexOf(permission)
						this.permissions.splice(index, 1)
					}
				})
			} else {
				console.log('Puede usar clientes')
			}
		},	

		getPermissionsSaleTime() {
			this.$api.get('permissions/sale-time')
			.then( res => {
				this.permissions_sale_time = res.data
			})
			.catch(err => {
				console.log(err)
			})
		},
		showEmployees() {
			this.$bvModal.show('employees-list')
		},
	},
	created() {
		this.getPermissions()
		this.getEmployees()
		this.getPermissionsSaleTime()
	},
}
</script>
<style scoped lang="sass">
.col-12
	@media screen and (max-width: 768px)
		margin-bottom: 1em
		&:last-child
			margin-bottom: 0
</style>