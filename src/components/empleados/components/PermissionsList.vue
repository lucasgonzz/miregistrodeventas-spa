<template>
	<div>
		<b-form-checkbox
		v-for="permission in permissions"
		:key="permission.id"
		v-show="isNotPermissionForSeeSales(permission)"
		:id="`${employee.id}-permission-${permission.id}`"
		v-model="employee.permissions"
		@change="removeSaleTimes"
		:value="permission.id"
		:description="permission.description">
			{{ permission.name }}
		</b-form-checkbox>
		

		<!-- Permiso para ver solo las ventas del dia -->
		<!-- Se muestra si el empleado tiene permiso para ver las ventas -->
		<b-form-checkbox
		v-show="employee.permissions.includes(getPermissionToShowSales(permissions).id)"
		v-model="employee.permissions"
		:id="`C${employee.id}-${getPermissionToShowOnlyDaySales(permissions).id}`"
		:value="getPermissionToShowOnlyDaySales(permissions).id"
		:description="getPermissionToShowOnlyDaySales(permissions).description">
			{{ getPermissionToShowOnlyDaySales(permissions).name }}
		</b-form-checkbox>
		
		<!-- Permisos de los horarios de venta -->
		<!-- Se muestran si en los permisos se incluye el permiso para ver las ventas -->
		<!-- Y se muestra si puede usar horarios de ventas y tiene horarios de venta creados -->
		<div v-if="canUse('sale_time', user) && employee.permissions.includes(getPermissionToShowSales(permissions).id) && permissions_sale_time.length">
			<p class="m-t-15 m-b-10">
				Seleccione los horarios de venta que podra ver
			</p>
			<div class="form-group">
				<b-form-checkbox
				v-model="employee.permissions"
				:id="`B${employee.id}-${this.getPermissionToShowAllSales(permissions).id}`"
				:value="getPermissionToShowAllSales(permissions).id"
				:description="getPermissionToShowAllSales(permissions).description">
					{{ getPermissionToShowAllSales(permissions).name }}
				</b-form-checkbox>
				<b-form-checkbox
				v-for="permission in permissions_sale_time"
				v-model="employee.permissions"
				:key="permission.id"
				:value="permission.id"
				:id="`A${employee.id}-${permission.id}`"
				:description="permission.description">
					{{ permission.name }}
				</b-form-checkbox>
			</div>
		</div>
	</div>
</template>
<script>
// Mixins
import Validate from '../mixins/Validate.js'
export default {
	name: 'PermissionsList',
	mixins: [Validate],
	props: ['employee', 'permissions', 'permissions_sale_time', 'user'],
	methods: {

		// Revisa si en los permisos esta el de ver las ventas
		// si no esta ese permiso elimina los permissions_sale_time
		removeSaleTimes() {
			if (!this.employee.permissions.includes(this.getPermissionToShowSales(this.permissions).id)) {
				for (var i = this.permissions_sale_time.length-1; i >= 0; i--) {
					let permiso_propio_id = this.permissions_sale_time[i].id
					if (this.employee.permissions.includes(permiso_propio_id)) {
						// Si el empleado tiene el permiso para ver ventas en un horario lo elimina
						var index = this.employee.permissions.indexOf(permiso_propio_id)
						this.employee.permissions.splice(index, 1)
					} 
				}
				// Controla si tiene el permiso para ver las ventas solo del dia
				if (this.employee.permissions.includes(this.getPermissionToShowOnlyDaySales(this.permissions).id)) {
					// Si lo tiene tambien lo elimina
					index = this.employee.permissions.indexOf(this.getPermissionToShowOnlyDaySales(this.permissions).id)
					this.employee.permissions.splice(index, 1)
				}
				// Controla si tiene el permiso para ver las ventas de cualquier horario
				if (this.employee.permissions.includes(this.getPermissionToShowAllSales(this.permissions).id)) {
					// Si lo tiene tambien lo elimina
					index = this.employee.permissions.indexOf(this.getPermissionToShowAllSales(this.permissions).id)
					this.employee.permissions.splice(index, 1)
				}
			}
		},
	},
}
</script>
<style scoped>
	
</style>
