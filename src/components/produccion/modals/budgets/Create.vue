<template>
<b-modal
size="xl"
:title="title"
id="create-budget"
hide-footer>
	<budget-data></budget-data>
</b-modal>
</template>
<script>
import budgets from '@/mixins/budgets'

import BudgetData from '@/components/produccion/modals/budgets/data/Index'
export default {
	mixins: [budgets],
	components: {
		BudgetData,
	},
	computed: {
		title() {
			if (this.edit) {
				return 'Presupuesto N° '+this.numBudget(this.budget_model)
			}
			return 'Nuevo presupuesto'
		},
	},
}
</script>