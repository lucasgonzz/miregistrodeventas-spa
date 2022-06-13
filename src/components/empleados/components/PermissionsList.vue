<template>
	<div class="m-b-15"> 
		<b-form-checkbox
		v-for="permission in permissions"
		:key="permission.id"
		:id="`${employee.id}-permission-${permission.id}`"
		v-model="employee.permissions_id"
		:value="permission.id">
			{{ permission.name }}
		</b-form-checkbox>
		<div
		v-if="user.extencions.length">
			<div
			class="m-t-15"
			v-for="extencion in user.extencions"
			:key="extencion.id"
			v-if="extencion.permissions.length">
				<p
				class="m-b-0">
					Permisos para {{ extencion.name }}
				</p>
				<b-form-checkbox
				v-for="permission in extencion.permissions"
				:key="permission.id"
				:id="`${employee.id}-permission-${permission.id}`"
				v-model="employee.permissions_id"
				:value="permission.id">
					{{ permission.name }}
				</b-form-checkbox>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'PermissionsList',
	props: ['employee'],
	computed: {
		permissions() {
			return this.user.plan.permissions
		},
	},
	methods: {
	},
}
</script>
