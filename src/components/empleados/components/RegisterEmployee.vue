<template>
	<b-card 
	class="shadow-5 border-radius-1"
	header="Registrar un nuevo empleado">
		<p>
			Registra un nuevo empleado y asignale permisos para controlar que puede y que no hacer dentro del sistema.
		</p>
		<b-form-group
		label="Nombre del empleado"
		label-for="employee-name">
			<b-form-input
			id="employee-name"
			autocomplete="off"
			@keydown.enter="changeToPassword"
			v-model="employee.name"
			placeholder="Ingrese el nombre del empleado"></b-form-input>
		</b-form-group>
		<b-form-group
		label="Contraseña"
		label-for="employee-password">
			<b-form-input
			id="employee-password"
			v-model="employee.password"
			autocomplete="off"
			placeholder="Ingrese la contraseña para el empleado"></b-form-input>
		</b-form-group>
		<p class="m-b-0 m-t-10">
			Seleccione los permisos para su empleado
		</p>
		<permissions-list
		:employee="employee"></permissions-list>
		<b-form-group>
			<b-button
			:disabled="btn_disabled"
			block
			variant="primary"
			@click="saveEmployee">
				<btn-loader
				text="Registrar empleado"
				:loader="loading"></btn-loader>
			</b-button>
		</b-form-group>
	</b-card>
</template>
<script>
import PermissionsList from '@/components/empleados/components/PermissionsList.vue'
import BtnLoader from '@/components/common/BtnLoader.vue'
export default {
	name: 'RegisterEmployee',
	components: {
		PermissionsList,
		BtnLoader,
	},
	computed: {
		employee() {
			return this.$store.state.employees.employee_to_create
		},
		btn_disabled() {
			if (this.employee.name == '') {
				return true
			}
			if (this.employee.password == '') {
				return true
			}
			return false
		}
	},
	data() {
		return {
			loading: false,
		}
	},
	methods: {
		saveEmployee() {
			this.loading = true
			this.$api.post('/employees', this.employee)
			.then(res => {
				this.loading = false
				this.$toast.success('Empleado guardado')
				this.$store.commit('employees/add', res.data.employee)
				this.clear()
			})
			.catch(err => {
				this.loading = false
				console.log(err)
				this.$toast.error('Error al guardar empleado')
			})
		},
		clear() {
			this.$store.commit('employees/setEmployeeToCreate', {
				name: '', password: '', permissions: [],
			})
		}
	},
}
</script>
<style scoped>
	
</style>
