<template>
	<div id="configuration">
		<schedules></schedules>	
		<create-schedule></create-schedule>	
		<edit-schedule></edit-schedule>	
		<nav-component></nav-component>
		<account></account>
		<online></online>
		<subscription></subscription>
		<facturacion></facturacion>
	</div>
</template>
<script>
import NavComponent from '@/components/configuration/components/Nav'
import Schedules from '@/components/configuration/modals/schedules/Index'
import CreateSchedule from '@/components/configuration/modals/schedules/Create'
import EditSchedule from '@/components/configuration/modals/schedules/Edit'
import Account from '@/components/configuration/components/account/Index'
import Online from '@/components/configuration/components/online/Index'
import Subscription from '@/components/configuration/components/Subscription'
import Facturacion from '@/components/configuration/components/facturacion/Index'
export default {
	components: {
		NavComponent,
		Schedules,
		CreateSchedule,
		EditSchedule,
		Account,
		Online,
		Subscription,
		Facturacion,
	},
}
</script>