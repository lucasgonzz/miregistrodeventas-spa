<template>
	<div
	v-if="sub_view == 'productos'">
		<form-component
		v-if="edit"></form-component>
		<list
		:show_btn_delete="show_btn_delete"
		:budget_prop="budget"></list>
	</div>
</template>
<script>

import FormComponent from '@/components/produccion/modals/budgets/data/products/Form'
import List from '@/components/produccion/modals/budgets/data/products/List'
export default {
	props: ['budget', 'edit', 'show_btn_delete'],
	components: {
		FormComponent,
		List,
	},
}
</script>