<template>
	<div
	v-if="sub_view == 'productos'">
		<form-component
		v-if="can_edit"></form-component>
		<list></list>
	</div>
</template>
<script>
import budgets from '@/mixins/budgets'

import FormComponent from '@/components/produccion/modals/budgets/data/products/Form'
import List from '@/components/produccion/modals/budgets/data/products/List'
export default {
	mixins: [budgets],
	components: {
		FormComponent,
		List,
	},
}
</script>