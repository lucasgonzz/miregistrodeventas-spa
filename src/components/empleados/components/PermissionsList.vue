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
