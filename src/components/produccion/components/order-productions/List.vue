<template>
	<div
	class="w-100">
		<p class="title">
			Ordenes de produccion
		</p>
		<div
		v-if="!loading">
			<div
			v-if="order_productions.length"
			class="cont-models">
				<order-production
				v-for="order_production in order_productions"
				:key="order_production.id"
				:order_production="order_production"></order-production>
			</div>
			<p 
			v-else
			class="text-with-icon">
				<i class="icon-eye-slash"></i>
				No hay ordenes de producción
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
import order_productions from '@/mixins/order_productions'
import OrderProduction from '@/components/produccion/components/order-productions/OrderProduction'
import Skeleton from '@/components/produccion/components/budgets/Skeleton'
export default {
	mixins: [order_productions],
	components: {
		OrderProduction,
		Skeleton,
	}
}
</script>