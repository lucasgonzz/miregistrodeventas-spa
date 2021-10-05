<template>
	<div id="empleados">
		<employee-permissions></employee-permissions>
		<b-row>
			<b-col
			cols="12"
			md="6">
				<register-employee></register-employee>
			</b-col>
			<b-col
			cols="12"
			md="6">
				<employees-list></employees-list>
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
export default {
	name: 'Empleados',
	components: {
		// Modals
		EmployeePermissions,

		// Components
		RegisterEmployee,
		EmployeesList,
	},
	data() {
		return {
		}
	}, 
	computed: {
	},
	methods: {
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