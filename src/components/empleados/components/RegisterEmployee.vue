<template>
	<b-card header="Registrar un nuevo empleado">
		<div>
			<p>
				Registra un nuevo empleado y asignale permisos para controlar que puede y que no hacer dentro del sistema.
			</p>
			<b-form-group
			label="Nombre del empleado"
			label-for="employee-name">
				<b-form-input
				v-intro-step="1"
				v-intro="'Nombre del empleado'"
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
				v-intro-step="2"
				v-intro="'Contraseña para que el empleado ingrese en el sistema'"
				id="employee-password"
				v-model="employee.password"
				autocomplete="off"
				placeholder="Ingrese la contraseña para el empleado"></b-form-input>
			</b-form-group>
			<p class="m-b-0 m-t-10">
				Seleccione los permisos para su empleado
			</p>
			<permissions-list 
			v-intro-step="3"
			v-intro="'Permisos que el empleado va a tener dentro del sistema'"
			:user="user"
			:employee="employee"
			:permissions="permissions"
			:permissions_sale_time="permissions_sale_time"></permissions-list>
		</div>
		<template v-slot:footer>
			<b-button
			v-intro-step="4"
			v-intro="'Agregar empleado'"
			variant="primary"
			@click="saveEmployee">
				<i class="icon-check" v-show="!saving_employee"></i>
				<span class="spinner-border spinner-border-sm" v-show="saving_employee"></span>
				Registrar empleado
			</b-button>
		</template>
	</b-card>
</template>
<script>
import PermissionsList from './PermissionsList.vue'

// Mixins
import Validate from '../mixins/Validate.js'
export default {
	name: 'RegisterEmployee',
	mixins: [Validate],
	props: ['employee', 'saving_employee', 'permissions', 'permissions_sale_time', 'user', 'intro_start'],
	components: {
		PermissionsList,
	},
	data() {
		return {

		}
	},
	methods: {
		changeToPassword() {
			document.getElementById('employee-password').focus()
		},
		saveEmployee() {
			this.$emit('saveEmployee')
		},
		getPermissionToShowAllSales() {
			var permission_show_all_sales = {}
			this.permissions.forEach(permission => {
				if (permission.slug == 'sale.index.all') {
					permission_show_all_sales = permission
				}
			})
			return permission_show_all_sales
		},
		getPermissionToShowOnlyDaySales() {
			var permission_show_only_date_sales = {}
			this.permissions.forEach(permission => {
				if (permission.slug == 'sale.index.only_day') {
					permission_show_only_date_sales = permission
				}
			})
			return permission_show_only_date_sales
		},
	},
}
</script>
<style scoped>
	
</style>
