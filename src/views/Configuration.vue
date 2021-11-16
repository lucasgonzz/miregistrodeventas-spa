<template>
	<div id="configuration">
		<schedules></schedules>	
		<create-schedule></create-schedule>	
		<edit-schedule></edit-schedule>	
		<b-row>
			<b-col
			cols="12"
			lg="8">
				<account></account>
			</b-col>
			<b-col
			cols="12"
			lg="8">
				<password></password>
			</b-col>
			<b-col
			cols="12"
			lg="8">
				<online></online>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import Schedules from '@/components/configuration/modals/schedules/Index'
import CreateSchedule from '@/components/configuration/modals/schedules/Create'
import EditSchedule from '@/components/configuration/modals/schedules/Edit'
import Account from '@/components/configuration/components/Account'
import Password from '@/components/configuration/components/Password'
import Online from '@/components/configuration/components/online/Index'
export default {
	components: {
		Schedules,
		CreateSchedule,
		EditSchedule,
		Account,
		Password,
		Online,
	},
}
</script>