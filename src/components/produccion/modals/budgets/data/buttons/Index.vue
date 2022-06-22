<template>
	<div>
		<save-update></save-update>
		<confirm></confirm>
		<order-production></order-production>
	</div>
</template>
<script>
import SaveUpdate from '@/components/produccion/modals/budgets/data/buttons/SaveUpdate'
import Confirm from '@/components/produccion/modals/budgets/data/buttons/Confirm'
import OrderProduction from '@/components/produccion/modals/budgets/data/buttons/OrderProduction'
export default {
	components: {
		SaveUpdate,
		Confirm,
		OrderProduction,
	}
}
</script>