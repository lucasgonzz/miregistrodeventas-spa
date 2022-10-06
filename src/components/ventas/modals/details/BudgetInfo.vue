<template>
	<div 
	v-if="sale_details.budget"
	class="p-15">
		Esta venta pertenece al presupuesto n°{{ sale_details.budget.num }}
		<b-button
		class="m-l-15"
		variant="primary"
		@click="budgetDetails">
			Ver presupuesto
		</b-button>
	</div>
</template>
<script>
import sales from '@/mixins/sales'
import display from '@/mixins/display'
export default {
	mixins: [sales, display],
	methods: {
		budgetDetails() {
			this.setModel(this.sale_details.budget, 'budget')
		}
	}
}
</script>