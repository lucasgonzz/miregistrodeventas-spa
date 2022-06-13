<template>
	<div>
		<div
		v-if="!loading_orders">
			<div 
			v-if="orders.length"
			class="cont-models">
				<provider-order
				v-for="order in orders"
				:key="order.id"
				:order="order"></provider-order>
			</div>
			<p 
			v-else
			class="text-with-icon">
				<i class="icon-eye-slash"></i>
				No hay pedidos	
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
import provider_orders from '@/mixins/provider_orders'

import ProviderOrder from '@/components/proveedores/components/orders/Order'
import Skeleton from '@/components/produccion/components/budgets/Skeleton'
export default {
	mixins: [provider_orders],
	components: {
		ProviderOrder,
		Skeleton,
	},
}
</script>