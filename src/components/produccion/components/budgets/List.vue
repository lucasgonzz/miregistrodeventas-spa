<template>
	<div
	class="w-100">
		<p class="title">
			Presupuestos
		</p>
		<div
		v-if="!loading">
			<div 
			v-if="budgets.length"
			class="cont-models">
				<budget
				v-for="budget in budgets"
				:key="budget.id"
				:budget="budget"></budget>
			</div>
			<p 
			v-else
			class="text-with-icon">
				<i class="icon-eye-slash"></i>
				No hay presupuestos
			</p>
		</div>
		<div 
		v-else
		class="cont-models">
			<skeleton
			v-for="i in 10"
			:key="i"></skeleton>
		</div>
	</div>
</template>
<script>
import budgets from '@/mixins/budgets'
import Budget from '@/components/produccion/components/budgets/Budget'
import Skeleton from '@/components/produccion/components/budgets/Skeleton'
export default {
	mixins: [budgets],
	components: {
		Budget,
		Skeleton,
	}
}
</script>