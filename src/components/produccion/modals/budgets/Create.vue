<template>
<b-modal
id="create-budget"
size="lg"
title="Nuevo presupuesto"
hide-footer>
	<budget-data
	:budget="budget_model"
	:show_btn="false"></budget-data>
	<save-btn
	:budget="budget_model"></save-btn>
</b-modal>
</template>
<script>
import budgets from '@/mixins/budgets'

import BudgetData from '@/components/produccion/modals/budgets/data/Index'
import SaveBtn from '@/components/produccion/modals/budgets/data/SaveBtn'
export default {
	mixins: [budgets],
	components: {
		BudgetData, 
		SaveBtn,
	}
}
</script>