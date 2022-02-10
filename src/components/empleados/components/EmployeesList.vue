<template>
	<b-card 
	class="shadow-5 border-radius-1"
	header="Mis empleados">
		<div>
			<b-list-group 
			v-show="employees.length">
				<b-list-group-item
				v-for="employee in employees"
				:key="employee.id">
					<p>
						<strong>
							<i class="icon-user"></i>
							{{ employee.name }}
						</strong>
					</p>
					<p>
						<strong>
							<i class="icon-clipboard"></i>
							{{ employee.dni }}
						</strong>
					</p>
					<p>
						Alta: {{ date(employee.created_at) }} {{ since(employee.created_at) }}
					</p>
					<div class="j-start m-b-10">
						<b-button 
						@click="showPermissions(employee)"
						variant="primary"
						class="m-r-5"
						size="sm">
							<i class="icon-eye"></i>
							Permisos
						</b-button>
						<b-button 
						@click="deleteEmployee(employee)"
						variant="danger"
						size="sm">
							<btn-loader
							text="Eliminar"
							:loader="deleting"></btn-loader>
						</b-button>
					</div>
				</b-list-group-item>
			</b-list-group>
			<p 
			v-show="!employees.length"
			class="text-with-icon">
				<i class="icon-user-cancel"></i>
				No hay empleados registrados
			</p>
		</div>
	</b-card>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	name: 'EmployeesList',
	components: {
		BtnLoader,
	},
	computed: {
		employees() {
			return this.$store.state.employees.employees
		}
	},
	data() {
		return {
			deleting: false,
		}
	},
	methods: {
		showPermissions(employee) {
			this.$store.commit('employees/setEmployeeToShowPermissions', employee)
			this.$bvModal.show('employee-permissions')
		},
		deleteEmployee(employee) {
			this.deleting = true
			this.$api.delete('/employees/'+employee.id)
			.then(res => {
				this.deleting = false
				this.$store.commit('employees/delete', employee)
				this.$toast.success('Empleado eliminado')
			})
			.catch(err => {
				this.deleting = false
				console.log(err)
			})
		},
	},
}
</script>
