<template>
<div id="super">
	<!-- <edit-commerce></edit-commerce>
	<plan-permissions></plan-permissions>
	<plan-subscriptions></plan-subscriptions>
	<nav-component></nav-component>
	<users-table></users-table>
	<plans-table></plans-table> -->
</div>
</template> 
<script>
import EditCommerce from '@/components/super/modals/EditCommerce'
import PlanPermissions from '@/components/super/modals/PlanPermissions'
import PlanSubscriptions from '@/components/super/modals/PlanSubscriptions'
import NavComponent from '@/components/super/components/Nav'
import UsersTable from '@/components/super/components/UsersTable'
import PlansTable from '@/components/super/components/PlansTable'
export default {
	components: {
		EditCommerce,
		PlanPermissions,
		PlanSubscriptions,
		NavComponent,
		UsersTable,
		PlansTable,
	},
}
</script>