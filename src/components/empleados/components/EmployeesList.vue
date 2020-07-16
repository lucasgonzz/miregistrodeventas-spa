<template>
	<b-card header="Mis empleados">
		<div v-show="!loading_employees">
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
							<i class="icon-trash-3" v-show="deleting_employee != employee.id"></i>
							<span v-show="deleting_employee == employee.id"
									class="spinner-border spinner-border-sm m-r-5" role="status" aria-hidden="true"></span>
							Eliminar
						</b-button>
					</div>
				</b-list-group-item>
			</b-list-group>
			<p 
			v-show="employees.length == 0"
			class="text-center">
				No hay empleados registrados aún
			</p>
		</div>
		<cargando :is_loading="loading_employees"></cargando>
	</b-card>
</template>
<script>
import Cargando from '../../common/Cargando'
export default {
	name: 'EmployeesList',
	props: ['employees', 'loading_employees', 'deleting_employee'],
	components:{
		Cargando
	},
	data() {
		return {

		}
	},
	methods: {
		showPermissions(employee) {
			this.$emit('showPermissions', employee)
		},
		deleteEmployee(employee) {
			this.$emit('deleteEmployee', employee)
		},
	},
}
</script>
