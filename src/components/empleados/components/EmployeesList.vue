<template>
	<b-card 
	class="shadow-2 border-radius-1"
	header="Mis empleados">
		<div>
			<b-list-group 
			v-show="employees.length">
				<b-list-group-item
				class="shadow-2"
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
				<i class="icon-not"></i>
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
			this.$store.commit('employees/setDelete', employee)
			this.$bvModal.show('delete-employee')
		},
	},
}
</script>
