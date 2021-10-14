<template>
	<b-row>
		<b-col>
			<ul
			v-if="loading" 
			class="horizontal-ul">
				<li
				v-for="i in 3"
				:key="i+'0'">
					<loading></loading>
				</li>
			</ul>
			<div 
			v-else
			class="cont-cards">
				<active-cupon
				v-for="cupon in active_cupons"
				:key="cupon.id"
				:cupon="cupon"></active-cupon>
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