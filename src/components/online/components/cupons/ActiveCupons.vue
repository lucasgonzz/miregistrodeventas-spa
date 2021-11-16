<template>
	<b-row>
		<b-col>
			<loading
			v-if="loading"></loading>
			<div
			v-else>
				<div
				v-if="active_cupons.length" 
				class="cont-cards">
					<active-cupon
					v-for="cupon in active_cupons"
					:key="cupon.id"
					:cupon="cupon"></active-cupon>
				</div>
				<p
				class="text-with-icon"
				v-else>
					<i class="icon-not-2"></i>
					No hay cupones activos
				</p>
			</div>
		</b-col>
	</b-row>
</template>
<script>
import cupons from '@/mixins/cupons'
import Loading from '@/components/online/components/orders/Loading'
import ActiveCupon from '@/components/online/components/cupons/ActiveCupon'
export default {
	mixins: [cupons],
	components: {
		Loading,
		ActiveCupon,
	}
}
</script>