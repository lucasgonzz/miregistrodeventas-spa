<template>
	<div
	v-if="sub_view == 'fechas'"
	class="m-b-15">
		<p class="title">
			Etapas opcionales
		</p>
		<div
		v-if="can_edit">
		    <b-form-checkbox
		    v-for="status_optional in statuses_optionals"
		    :value="status_optional"
		    v-model="optional_statuses">
		        {{ status_optional.name }}
		    </b-form-checkbox>
		</div>
		<div
		v-else>
			<!-- <p
			v-for="">
				<i class="icon-right"></i>
				<strong>Solo entrega</strong>
			</p> -->
		</div>
	</div>
</template>
<script>
import budgets from '@/mixins/budgets'
import order_productions from '@/mixins/order_productions'
export default {
	mixins: [budgets, order_productions],
}
</script>