<template>
	<div>
		<b-form-group
		v-for="workdays in workdays"
		:key="workday.id"
		v-model="user.workdays_id"
		:value="workday.id">
			{{ workday.name }}
		</b-form-group>
	</div>
</template>
<script>
export default {
	computed: {
		workdays() {
			return this.$store.state.workdays.workdays
		},	
	},
	methods: {
	}
}
</script>