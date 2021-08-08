<template>
	<b-row
	v-show="view == 'clientes'">
		<b-col>
			<buscador></buscador>
			<buyers-table></buyers-table>
		</b-col>
	</b-row>
	<!-- <update-button></update-button> -->
</template>
<script>
// import UpdateButton from '@/components/online/modals/examine/buyers/UpdateButton'
import Buscador from '@/components/online/components/buyers/Buscador'
import BuyersTable from '@/components/online/components/buyers/BuyersTable'
import online from '@/mixins/online'
export default {
	mixins: [online],
	components: {
		// UpdateButton,
		Buscador,
		BuyersTable,
	},
}
</script>