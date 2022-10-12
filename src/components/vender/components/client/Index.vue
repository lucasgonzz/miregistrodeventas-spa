<template>
	<b-row
	v-if="view.includes('cliente')">
		<b-col
		cols="12"
		md="8">
			<select-client></select-client>

			<discounts></discounts>	

			<current-acount></current-acount>
		</b-col>
	</b-row>
</template>
<script>
import SelectClient from '@/components/vender/components/client/SelectClient'
import Discounts from '@/components/vender/components/client/Discounts'
import CurrentAcount from '@/components/vender/components/client/CurrentAcount'
export default {
	components: {
		SelectClient,
		Discounts,
		CurrentAcount,
	},
}
</script>